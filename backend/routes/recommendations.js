const router = require('express').Router();
const Repository = require('../models/repository.model');
const User = require('../models/user.model');

// Recommend repositories: profiles with highest followers
router.get('/', async (req, res) => {
  try {
    // Find users sorted by followers count (desc)
    const topUsers = await User.find().sort({ 'followers': -1 }).limit(10);
    const topUserIds = topUsers.map(u => u._id);
    // Find repositories owned by these users
    const repositories = await Repository.find({ owner: { $in: topUserIds } })
      .populate('owner', 'username followers')
      .exec();
    // Sort repositories by owner's followers count (desc)
    const userFollowersMap = Object.fromEntries(topUsers.map(u => [u._id.toString(), u.followers.length]));
    repositories.sort((a, b) => (userFollowersMap[b.owner._id.toString()] || 0) - (userFollowersMap[a.owner._id.toString()] || 0));
    res.json(repositories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;