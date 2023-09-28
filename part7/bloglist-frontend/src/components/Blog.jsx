import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
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
    <Card>
      <Card.Body>
        <h2>{blog.title}</h2>
        <div>
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>
          <div>
            {blog.likes} likes{' '}
            <Button variant="outline-dark" size="sm" onClick={handleLike}>
              ❤️
            </Button>
          </div>
          <div>added by {blog.user.name}</div>
          <div>
            {blog.user.username === loggedInUser.username && (
              <Button variant="danger" onClick={handleRemove}>
                Remove
              </Button>
            )}
          </div>
        </div>
        <div>
          <h4>Comments</h4>
          <div>
            <BlogCommentForm addComment={addComment} />
            <BlogComments comments={blog.comments} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogView;
