import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, removeBlog, loggedInUser }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="blog-content">
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          likes {blog.likes}{' '}
          <button
            onClick={() => {
              likeBlog(blog);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {blog.user.username === loggedInUser.username && (
            <button onClick={() => removeBlog(blog)}>remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
};

export default Blog;
