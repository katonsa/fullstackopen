import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const setNotification = (message, time) => {
  const timeout = (time ? time : 5) * 1000
  return async dispatch => {
    dispatch(updateNotification(message))
    setTimeout(() => {
      dispatch(clearNotification(message))
    }, timeout)
  }
}

export const { updateNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer