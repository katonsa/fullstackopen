import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const { message, type } = notification;
  return <Alert variant={type === 'error' ? 'danger' : type}>{message}</Alert>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
