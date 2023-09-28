const router = require('express').Router;
const Blog = require('../models/blog');
const BlogComment = require('../models/blogComment');

const blogCommentRouter = router({ mergeParams: true });

// blogCommentRouter.get('/', async (request, response) => {
//   const { blog } = request.params;
//   const comments = await BlogComment.find({ blog });
//   response.json(comments);
// });

blogCommentRouter.post('/', async (request, response) => {
  const { content } = request.body;
  const blogId = request.params.blog;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  const blogComment = new BlogComment({
    content,
    blog: blog._id,
  });
  const savedBlogComment = await blogComment.save();

  blog.comments = blog.comments.concat(savedBlogComment._id);
  await blog.save();

  return response.status(201).json(savedBlogComment);
});

module.exports = blogCommentRouter;
