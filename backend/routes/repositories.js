const router = require('express').Router();
const multer = require('multer');
const Repository = require('../models/repository.model');
const repositoryController = require('../controllers/repository.controller');
const fs = require('fs');

module.exports = (auth) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  router.post('/', auth, repositoryController.createRepository);

  router.get('/', async (req, res) => {
    try {
      const repositories = await Repository.find().populate('owner', 'username');
      res.json(repositories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const repository = await Repository.findById(req.params.id).populate('owner', 'username').populate('comments.user', 'username');
      res.json(repository);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get trending repositories: recommend repos of profiles with highest followers
  router.route('/trending').get(async (req, res) => {
    try {
      const User = require('../models/user.model');
      // Find users sorted by followers count (desc)
      const topUsers = await User.find().sort({ 'followers': -1 }).limit(10);
      const topUserIds = topUsers.map(u => u._id);
      // Find repositories owned by these users
      const repositories = await Repository.find({ owner: { $in: topUserIds } })
        .populate('owner', 'username')
        .exec();
      // Sort repositories by owner's followers count (desc)
      const userFollowersMap = Object.fromEntries(topUsers.map(u => [u._id.toString(), u.followers.length]));
      repositories.sort((a, b) => (userFollowersMap[b.owner._id.toString()] || 0) - (userFollowersMap[a.owner._id.toString()] || 0));
      res.json(repositories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Like a repository
  router.route('/like/:id').post(auth, async (req, res) => {
    try {
      const repository = await Repository.findById(req.params.id);
      if (!repository) {
        return res.status(404).json({ msg: 'Repository not found.' });
      }

      if (repository.likes.includes(req.user)) {
        return res.status(400).json({ msg: 'You have already liked this repository.' });
      }

      repository.likes.push(req.user);
      await repository.save();

      res.json({ msg: 'Repository liked successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Unlike a repository
  router.route('/unlike/:id').post(auth, async (req, res) => {
    try {
      const repository = await Repository.findById(req.params.id);
      if (!repository) {
        return res.status(404).json({ msg: 'Repository not found.' });
      }

      if (!repository.likes.includes(req.user)) {
        return res.status(400).json({ msg: 'You have not liked this repository.' });
      }

      repository.likes = repository.likes.filter(
        (userId) => userId.toString() !== req.user.toString()
      );

      await repository.save();

      res.json({ msg: 'Repository unliked successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Add a comment to a repository
  router.route('/comment/:id').post(auth, async (req, res) => {
    try {
      const repository = await Repository.findById(req.params.id);
      if (!repository) {
        return res.status(404).json({ msg: 'Repository not found.' });
      }

      const newComment = {
        user: req.user,
        text: req.body.text,
      };

      repository.comments.push(newComment);
      await repository.save();

      res.json(repository.comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete a comment from a repository
  router.route('/comment/:id/:comment_id').delete(auth, async (req, res) => {
    try {
      const repository = await Repository.findById(req.params.id);
      if (!repository) {
        return res.status(404).json({ msg: 'Repository not found.' });
      }

      const comment = repository.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id
      );

      if (!comment) {
        return res.status(404).json({ msg: 'Comment not found.' });
      }

      if (comment.user.toString() !== req.user) {
        return res.status(401).json({ msg: 'User not authorized.' });
      }

      repository.comments = repository.comments.filter(
        ({ _id }) => _id.toString() !== req.params.comment_id
      );

      await repository.save();

      res.json(repository.comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};