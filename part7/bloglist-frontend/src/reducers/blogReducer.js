import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
  },
});

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, creator) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);
      const createdBlogWithCreator = {
        ...createdBlog,
        user: {
          id: creator.id,
          name: creator.name,
          username: creator.username,
        },
      };
      dispatch(addBlog(createdBlogWithCreator));
      dispatch(
        showNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          'success',
        ),
      );
    } catch (error) {
      const message = error.response.data.error
        ? error.response.data.error
        : 'something went wrong';
      dispatch(showNotification(message, 'error'));
    }
  };
};

export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
