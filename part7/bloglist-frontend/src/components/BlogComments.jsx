import { PropTypes } from 'prop-types';

const BlogComments = ({ comments }) => {
  if (comments === null) {
    return <div>There is no comments to display</div>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

BlogComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default BlogComments;
