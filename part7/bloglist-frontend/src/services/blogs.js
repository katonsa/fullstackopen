import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const getBlogComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const createBlogComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  createBlogComment,
  getBlogComments,
};
