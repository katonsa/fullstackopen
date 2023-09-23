import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
  preloadedState: {
    notification: {
      message: 'Initial message',
      type: 'success',
    },
  },
});

export default store;
