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
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );
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

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user = state.user;
    try {
      const createdBlog = await blogService.create(blog);
      const createdBlogUserinfo = {
        id: createdBlog.user,
        name: user.name,
        username: user.username,
      };
      dispatch(addBlog({ ...createdBlog, user: createdBlogUserinfo }));
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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      });
      dispatch(updateBlog({ ...updatedBlog, user: blog.user }));
      dispatch(
        showNotification(
          `you liked ${updatedBlog.title} by ${updatedBlog.author}`,
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

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(showNotification(`${blog.title} removed`, 'success'));
    } catch (error) {
      const message = error.response.data.error
        ? error.response.data.error
        : 'something went wrong';
      dispatch(showNotification(message, 'error'));
    }
  };
};

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
