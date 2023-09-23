import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  return (
    <div
      className={`notification ${
        type === 'error' ? 'notification-error' : 'notification-success'
      }`}
    >
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
