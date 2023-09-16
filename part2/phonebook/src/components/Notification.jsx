const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type !== null ? type : 'success'}>
      {message}
    </div>
  )
}

export default Notification
