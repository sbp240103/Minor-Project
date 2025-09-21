const router = require('express').Router();
const Repository = require('../models/repository.model');
const User = require('../models/user.model');

module.exports = (auth) => {
  router.get('/', auth, async (req, res) => {
    try {
      const currentUser = await User.findById(req.user);
      const followedUsers = currentUser.following;

      const likedRepositories = await Repository.find({ likes: { $in: followedUsers } })
        .populate('owner', 'username');

      res.json(likedRepositories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};