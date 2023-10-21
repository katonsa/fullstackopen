import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

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
        <Form className="mb-2" onSubmit={addBlog}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              value={newBlog.title}
              onChange={handleFormInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="author">Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              id="author"
              value={newBlog.author}
              onChange={handleFormInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="url">URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              id="url"
              value={newBlog.url}
              onChange={handleFormInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
