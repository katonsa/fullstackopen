const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const BlogComment = require('../models/blogComment');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body, user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);

  if (user._id.toString() !== blog?.user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized access rights' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  user.blogs = user.blogs.filter((b) => b._id.toString() !== request.params.id);
  await user.save();

  // remove the comments
  await BlogComment.deleteMany({ blog: request.params.id });

  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
