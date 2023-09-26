import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { useEffect } from 'react';
import blogService from '../services/blogs';

const BlogView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blog = blogs.find((blog) => blog.id === params.id);
  const loggedInUser = useSelector((state) => state.login);

  const [content, setContent] = useState('');
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (blog && comments === null) {
      blogService.getBlogComments(blog.id).then((comments) => {
        setComments(comments);
      });
    }
  }, [blog, comments]);

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    dispatch(deleteBlog(blog));
    navigate('/');
  };

  const addComment = (event) => {
    event.preventDefault();
    blogService.createBlogComment(blog.id, { content });
    setComments((comments) => [
      ...comments,
      {
        id: comments.length + 1,
        content: content,
      },
    ]);
    setContent('');
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
          <form onSubmit={addComment}>
            <div>
              <input
                type="text"
                name="comment"
                id="comment"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <button>add comment</button>
          </form>
          <div>
            {comments && (
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>{comment.content}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
