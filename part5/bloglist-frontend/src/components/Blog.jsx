import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <div>
          <a href={blog.url} target='_blank'>{blog.url}</a>
        </div>
        <div>likes {blog.likes} <button onClick={() => { likeBlog (blog)}}>like</button></div>
        <div>{blog.user.name}</div>
        <div>
          {blog.user.name === user.name && (
            <button onClick={() => removeBlog(blog)}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
