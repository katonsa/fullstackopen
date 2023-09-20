import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (!message) {
    return
  }

  return (
    <div className={`notification ${type === 'error' ? 'notification-error' : 'notification-success'}`}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
