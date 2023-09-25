import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { showNotification } from './notificationReducer';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const initLoggedInUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      dispatch(setUser(user));
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch(showNotification('Successfully logged in', 'success'));
    } catch (error) {
      const message = error.response.data.error
        ? error.response.data.error
        : 'something went wrong';
      dispatch(showNotification(message, 'error'));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.clear();
    dispatch(showNotification('Successfully logged out', 'success'));
  };
};

export const { setUser, removeUser } = loginSlice.actions;

export default loginSlice.reducer;
