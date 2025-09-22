
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const auth = require('./middleware/auth');
const usersRouter = require('./routes/users')(auth);

const repositoriesRouter = require('./routes/repositories')(auth);

const feedRouter = require('./routes/feed')(auth);

const searchRouter = require('./routes/search');

const recommendationsRouter = require('./routes/recommendations');

app.use('/users', usersRouter);
app.use('/repositories', repositoriesRouter);
app.use('/feed', feedRouter);
app.use('/search', searchRouter);
app.use('/recommendations', recommendationsRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy 🚀' });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
