
const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  techStack: [{
    type: String
  }],
  files: [{
    type: String
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  summary: {
    type: String
  },
  summaryEmbedding: {
    type: [Number]
  }
}, {
  timestamps: true,
});

const Repository = mongoose.model('Repository', repositorySchema);

module.exports = Repository;
