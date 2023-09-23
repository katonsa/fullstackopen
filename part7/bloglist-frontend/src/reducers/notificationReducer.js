import { createSlice } from '@reduxjs/toolkit';

const notifSlices = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearNotification: () => {
      return null;
    },
  },
});

let timerId;

export const showNotification = (message, type, timeInSeconds) => {
  const ms = timeInSeconds ? timeInSeconds * 1000 : 5000;
  return (dispatch) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    dispatch(setNotification({ message, type }));
    timerId = setTimeout(() => {
      dispatch(clearNotification());
    }, ms);
  };
};

export const { setNotification, clearNotification } = notifSlices.actions;
export default notifSlices.reducer;
