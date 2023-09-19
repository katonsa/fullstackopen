const LoginForm = ({handleLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>

        <button type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
