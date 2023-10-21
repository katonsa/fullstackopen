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
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand>
          <Nav.Link to="/" as={Link}>
            Blog App
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/" as={Link}>
              Blogs
            </Nav.Link>
            <Nav.Link to="/users" as={Link}>
              Users
            </Nav.Link>
          </Nav>
          {currentUser && (
            <>
              <Navbar.Text className="me-2">
                Signed in as: {currentUser.name}
              </Navbar.Text>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  currentUser: PropTypes.object,
};

export default Navigation;
