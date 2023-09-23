import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<Blog />', () => {
  let mockCreateBlogHandler;

  const blog = {
    title: 'Exploring Generative AI',
    author: 'Birgitta Böckeler',
    url: 'https://martinfowler.com/articles/exploring-gen-ai.html',
    user: {
      username: 'admin',
      name: 'Admin',
      id: '650acea0a4c00a2d1c0820ae',
    },
  };

  beforeEach(() => {
    mockCreateBlogHandler = jest.fn();
    render(<BlogForm createBlog={mockCreateBlogHandler} />).container;
  });

  test('renders content, inputs and button', () => {
    const div = screen.getByText('create new');
    expect(div).toBeVisible();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
    const button = screen.getByRole('button', { value: 'create' });
    expect(button).toHaveTextContent('create');
  });

  test('createBlog is called with correct data when form is submitted', async () => {
    const title = screen.getByLabelText('title:');
    const author = screen.getByLabelText('author:');
    const url = screen.getByLabelText('url:');
    const button = screen.getByRole('button', { value: 'create' });
    await userEvent.type(title, blog.title);
    await userEvent.type(author, blog.author);
    await userEvent.type(url, blog.url);
    await userEvent.click(button);
    expect(mockCreateBlogHandler.mock.calls).toHaveLength(1);
    expect(mockCreateBlogHandler.mock.calls[0][0]).toEqual({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    });
  });
});
