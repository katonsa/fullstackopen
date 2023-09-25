import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { login, logout, setUser } from './reducers/userReducer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './pages/Blogs';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      dispatch(initBlogs());
    } else {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
        dispatch(setUser(user));
      }
    }
  }, [user, dispatch]);

  const handleLogin = async ({ username, password }) => {
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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
    <BrowserRouter>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<div>Users</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
