const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (auth) => {
  // User registration
  router.route('/register').post(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User with this email already exists.' });
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });

      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // User login
  router.route('/login').post(async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get user by ID
  router.route('/:id').get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('followers').populate('following');
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get all repositories for a user
  router.route('/:id/repositories').get(async (req, res) => {
    try {
      const Repository = require('../models/repository.model');
      const repos = await Repository.find({ owner: req.params.id });
      res.json(repos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Follow a user
  router.route('/follow/:id').post(auth, async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user);

      if (!userToFollow || !currentUser) {
        return res.status(404).json({ msg: 'User not found.' });
      }

      if (currentUser.following.includes(userToFollow._id)) {
        return res.status(400).json({ msg: 'You are already following this user.' });
      }

      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);

      await currentUser.save();
      await userToFollow.save();

      res.json({ msg: 'User followed successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Unfollow a user
  router.route('/unfollow/:id').post(auth, async (req, res) => {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user);

      if (!userToUnfollow || !currentUser) {
        return res.status(404).json({ msg: 'User not found.' });
      }

      if (!currentUser.following.includes(userToUnfollow._id)) {
        return res.status(400).json({ msg: 'You are not following this user.' });
      }

      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== userToUnfollow._id.toString()
      );
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (userId) => userId.toString() !== currentUser._id.toString()
      );

      await currentUser.save();
      await userToUnfollow.save();

      res.json({ msg: 'User unfollowed successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};