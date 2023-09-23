import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleFormInputChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog(newBlog);
    clearBlogForm();
  };

  const clearBlogForm = () => {
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={newBlog.title}
              onChange={handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="author">author:</label>
            <input
              type="text"
              name="author"
              id="author"
              value={newBlog.author}
              onChange={handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="url">url:</label>
            <input
              type="text"
              name="url"
              id="url"
              value={newBlog.url}
              onChange={handleFormInputChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
