import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash.sortby';
import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Blog from './Blog';

const Blogs = ({ loggedInUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  const updateBlogLike = async (blog) => {
    return dispatch(likeBlog(blog));
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  const sortedBlogsByLikes = sortBy(blogs, [(b) => -b.likes]);

  return (
    <div>
      {createBlogForm()}
      <div className="blog-list">
        {sortedBlogsByLikes.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={updateBlogLike}
            removeBlog={removeBlog}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};

export default Blogs;
