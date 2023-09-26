import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/loginReducer';

const Navigation = ({ currentUser }) => {
  const dispatch = useDispatch();

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
      </ul>
      <div>
        {currentUser.name} logged in{' '}
        <button onClick={() => dispatch(logout())}>logout</button>{' '}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Navigation;
