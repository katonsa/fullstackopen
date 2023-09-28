import PropTypes from 'prop-types';
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
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type={username.type}
            name="username"
            id="username"
            autoComplete="username"
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type={password.type}
            name="password"
            id="password"
            value={password.value}
            onChange={password.onChange}
          />
        </div>

        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
