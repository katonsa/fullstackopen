import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({message: '', type: ''})

  const blogFormRef = useRef()

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      showNotification('login successful', 'success')
    } catch (exception) {
      if (exception.response.status !== 200) {
        showNotification(exception.response.data.error
          ? exception.response.data.error
          : exception.message,
        'error')
      } else {
        showNotification(exception.message, 'error')
      }
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({
        ...createdBlog,
        user: {
          id: user.id,
          name: user.name,
          username: user.username
        }
      }))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    } catch (exception) {
      showNotification(exception.response.data.error ?? exception.message, 'error')
    }
  }

  const updateBlogLike = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })

    const withUser = {
      ...updatedBlog,
      user: {
        id: blog.user.id,
        name: blog.user.name,
        username: blog.user.username
      }
    }

    setBlogs(blogs.map(b => b.id === updatedBlog.id ? withUser : b))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const createBlogForm = () => {
    return (
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Toggleable>
    )
  }

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>
      {createBlogForm()}
      {sortedBlogsByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={updateBlogLike} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

export default App
