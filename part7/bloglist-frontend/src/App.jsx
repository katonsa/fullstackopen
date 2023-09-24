import { useState, useEffect, useRef } from 'react';
import sortBy from 'lodash.sortby';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import { showNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs, createBlog } from './reducers/blogReducer';

const App = () => {
  const blogs = useSelector((state) => state.blogs);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    if (user !== null) {
      dispatch(initBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(showNotification('login successful', 'success'));
    } catch (exception) {
      if (exception.response.status !== 200) {
        dispatch(
          showNotification(
            exception.response.data.error
              ? exception.response.data.error
              : exception.message,
            'error',
          ),
        );
      } else {
        dispatch(showNotification(exception.message, 'error'));
      }
    }
  };

  const handleLogout = () => {
    blogService.setToken(null);
    setUser(null);
    window.localStorage.clear();
    dispatch(showNotification('logged out, see ya!', 'success'));
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog, user));
  };

  const updateBlogLike = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });

    const withUser = {
      ...updatedBlog,
      user: {
        id: blog.user.id,
        name: blog.user.name,
        username: blog.user.username,
      },
    };

    // setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? withUser : b)));
    dispatch(
      showNotification(
        `you liked ${updatedBlog.title} by ${updatedBlog.author}`,
        'success',
      ),
    );
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(showNotification(`${blog.title} removed`, 'success'));
    }
  };

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  const sortedBlogsByLikes = sortBy(blogs, [(b) => -b.likes]);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      {createBlogForm()}
      <div className="blog-list">
        {sortedBlogsByLikes.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={updateBlogLike}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
