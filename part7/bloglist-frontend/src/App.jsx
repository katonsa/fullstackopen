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
import BlogView from './components/Blog';
import Navigation from './components/NavigationBar';
import { Container } from 'react-bootstrap';

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
        <Navigation />
        <Container className="mt-4">
          <h2>Log in to blog app</h2>
          <Notification />
          <LoginForm handleLogin={handleLogin} />
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navigation currentUser={loggedInUser} />
      <Container className="mt-4">
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs loggedInUser={loggedInUser} />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route
            path="*"
            element={
              <div>
                <p>The page you are looking for is not found</p>
              </div>
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
