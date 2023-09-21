import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { unsetNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('called')
    let timeoutId = null
    if (notification) {
      timeoutId = setTimeout(() => {
        dispatch(unsetNotification())
      }, 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [notification, dispatch])

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification