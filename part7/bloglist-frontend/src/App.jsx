import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { initBlogs } from './reducers/blogReducer';
import { initLoggedInUser, login } from './reducers/loginReducer';
import { initUsers } from './reducers/usersReducer';
import Blogs from './components/Blogs';
import Users from './components/Users';
import UserView from './components/User';
import BlogView from './pages/BlogView';
import NavigationBar from './components/NavigationBar';

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
      <header>
        <NavigationBar currentUser={loggedInUser} />
        <h1>blog app</h1>
      </header>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs loggedInUser={loggedInUser} />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserView />} />
      </Routes>
    </div>
  );
};

export default App;
