const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const mockUserId = new mongoose.Types.ObjectId();

const mockAuth = (req, res, next) => {
  req.user = mockUserId;
  next();
};

const usersRouter = require('./routes/users')(mockAuth);
const repositoriesRouter = require('./routes/repositories')(mockAuth);

app.use('/users', usersRouter);
app.use('/repositories', repositoriesRouter);

const feedRouter = require('./routes/feed')(mockAuth);
const recommendationsRouter = require('./routes/recommendations')(mockAuth);

app.use('/feed', feedRouter);
app.use('/recommendations', recommendationsRouter);

module.exports = { app, mockUserId };