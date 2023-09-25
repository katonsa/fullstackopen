import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { initLoggedInUser, login, logout } from './reducers/loginReducer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import UserView from './pages/UserView';

const App = () => {
  const loggedInUser = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser !== null) {
      dispatch(initBlogs());
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
    <BrowserRouter>
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
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
