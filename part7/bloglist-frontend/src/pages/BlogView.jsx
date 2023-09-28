import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer';
import BlogCommentForm from '../components/BlogCommentForm';
import BlogComments from '../components/BlogComments';

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

  const addComment = async (comment) => {
    dispatch(addBlogComment(blog, comment));
  };

  if (!blog) {
    return null;
  }

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
      <div>
        <h4>comments</h4>
        <div>
          <BlogCommentForm addComment={addComment} />
          <BlogComments comments={blog.comments} />
        </div>
      </div>
    </div>
  );
};

export default BlogView;
