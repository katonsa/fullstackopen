const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blog');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');
const blogCommentsRouter = require('./controllers/blogComment');
const {
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('./utils/middleware');

mongoose.set('strictQuery', false);
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

logger.info(
  'connecting to',
  config.MONGODB_URI.replace(/:(\w+)@/, ':<password>@'),
);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use(tokenExtractor);
app.use('/api/blogs/:blog/comments', userExtractor, blogCommentsRouter);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(errorHandler);
module.exports = app;
