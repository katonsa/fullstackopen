import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/test-utils';
import Notification from './Notification';

describe('Notification component', () => {
  test('renders nothing when notification is null', () => {
    const { container } = renderWithProviders(<Notification />, {
      preloadedState: { notification: null },
    });

    const div = container.querySelector('.notification');
    expect(div).not.toBeInTheDocument();
  });

  test('renders success notification', () => {
    const notification = {
      message: 'Yeay! Success!',
      type: 'success',
    };

    const { container } = renderWithProviders(<Notification />, {
      preloadedState: { notification },
    });

    const div = container.querySelector('.notification');
    expect(div).toHaveTextContent('Yeay! Success!');
    expect(div).toHaveClass('notification-success');
  });

  test('renders error notification', () => {
    const notification = {
      message: 'Ops, something went wrong!',
      type: 'error',
    };

    const { container } = renderWithProviders(<Notification />, {
      preloadedState: { notification },
    });

    const div = container.querySelector('.notification');
    expect(div).toHaveTextContent('Ops, something went wrong!');
    expect(div).toHaveClass('notification-error');
  });
});
