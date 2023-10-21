import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { createBlog } from '../reducers/blogReducer';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="Create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  const sortedBlogsByLikes = _.sortBy(blogs, [(b) => -b.likes]);

  return (
    <div>
      {createBlogForm()}
      <div className="blog-list">
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>Author</th>
              <th>Likes</th>
              <th>Creator</th>
            </tr>
          </thead>
          <tbody>
            {sortedBlogsByLikes.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
                <td>{blog.likes} likes</td>
                <td>
                  <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

Blogs.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};

export default Blogs;
