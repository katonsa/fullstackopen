import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { initBlogs } from './reducers/blogReducer';
import { initLoggedInUser, login, logout } from './reducers/loginReducer';
import { initUsers } from './reducers/usersReducer';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import UserView from './pages/UserView';
import BlogView from './pages/BlogView';

const App = () => {
  const loggedInUser = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser !== null) {
      dispatch(initBlogs());
      dispatch(initUsers());
    } else {
      dispatch(initLoggedInUser());
    }
  }, [loggedInUser, dispatch]);

  const handleLogin = async ({ username, password }) => {
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loggedInUser === null) {
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
          {loggedInUser.name} logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Blogs loggedInUser={loggedInUser} />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
