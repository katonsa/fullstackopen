// eslint-disable-next-line no-unused-vars
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockLikeHandler
  let mockRemoveHandler

  const blog = {
    title: 'Exploring Generative AI',
    author: 'Birgitta Böckeler',
    url: 'https://martinfowler.com/articles/exploring-gen-ai.html',
    likes: 5,
    user: {
      username: 'admin',
      name: 'Admin',
      id: '650acea0a4c00a2d1c0820ae'
    }
  }

  beforeEach(() => {
    mockLikeHandler = jest.fn()
    mockRemoveHandler = jest.fn()

    const component = render(<Blog
      blog={blog}
      user={blog.user}
      likeBlog={mockLikeHandler}
      removeBlog={mockRemoveHandler}
    />)

    container = component.container
  })

  test('renders content, title and author', () => {
    const div = screen.getByText(`${blog.title} ${blog.author}`)
    expect(div).toBeVisible()
  })

  test('url and likes is not visible by default', () => {
    const div = container.querySelector('.blog-content')
    expect(div).toHaveStyle('display: none')
    const url = screen.getByText(blog.url)
    expect(url).not.toBeVisible()
    const likes = screen.getByText(`likes ${blog.likes}`)
    expect(likes).not.toBeVisible()
  })

  test('url and likes is only visible after clicking the view button', async () => {
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(`likes ${blog.likes}`)
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const blogContent = container.querySelector('.blog-content')
    expect(blogContent).not.toHaveStyle('display: none')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('like button handler is called twice when the button clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(1)
    await user.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

  test('remove button handler is called when the button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const removeButton = screen.getByText('remove')
    await user.click(removeButton)
    expect(mockRemoveHandler.mock.calls).toHaveLength(1)
  })
})
