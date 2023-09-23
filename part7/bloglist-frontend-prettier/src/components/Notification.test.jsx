import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Notification from './Notification';

test('renders notification content', () => {
  const notification = {
    message: 'Component testing is done with react-testing-library',
    type: 'success',
  };

  const { container } = render(
    <Notification message={notification.message} type={notification.type} />,
  );

  const div = container.querySelector('.notification');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library',
  );
});
