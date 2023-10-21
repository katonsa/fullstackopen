import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import useField from '../hooks';

const LoginForm = (props) => {
  const username = useField('text');
  const password = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    props.handleLogin({ username: username.value, password: password.value });
    clearFields();
  };

  const clearFields = () => {
    username.reset();
    password.reset();
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type={username.type}
            name="username"
            id="username"
            placeholder="Enter your username"
            autoComplete="username"
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type={password.type}
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
