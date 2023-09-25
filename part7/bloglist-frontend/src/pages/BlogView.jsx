import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

const BlogView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blog = blogs.find((blog) => blog.id === params.id);
  const loggedInUser = useSelector((state) => state.login);

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    dispatch(deleteBlog(blog));
    navigate('/');
  };

  if (!blog) {
    return null;
  }

  console.log('BlogView render');

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        <div>
          {blog.user.username === loggedInUser.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogView;
