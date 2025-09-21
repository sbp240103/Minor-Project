const router = require('express').Router();
const Repository = require('../models/repository.model');
const User = require('../models/user.model');

module.exports = (auth) => {
  router.get('/', auth, async (req, res) => {
    try {
      const currentUser = await User.findById(req.user);
      const followedUsers = currentUser.following;

      const repositories = await Repository.find({ owner: { $in: followedUsers } }).sort({ createdAt: -1 }).populate('owner', 'username');
      res.json(repositories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};