import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    appendNewBlogToUser: (state, action) => {
      const user = state.find((user) => user.id === action.payload.user);
      user.blogs = [...user.blogs, action.payload.id];
    },
    removeBlogFromUser: (state, action) => {
      const user = state.find((user) => user.id === action.payload.user.id);
      user.blogs = user.blogs.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers, appendNewBlogToUser, removeBlogFromUser } =
  userSlice.actions;

export default userSlice.reducer;
