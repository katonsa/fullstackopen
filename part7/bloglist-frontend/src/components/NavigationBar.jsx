import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logout } from '../reducers/loginReducer';

const Navigation = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/" as={Link}>
              blogs
            </Nav.Link>
            <Nav.Link to="/users" as={Link}>
              users
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {currentUser ? (
                <>
                  <em>{currentUser.name} logged in</em>
                  <Button variant="danger" onClick={logoutHandler}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Navigation;
