import PropTypes from 'prop-types';
import useField from '../hooks';

const CommentForm = (props) => {
  const content = useField('text');

  const addComment = (event) => {
    event.preventDefault();
    props.addComment(content.value);
    content.reset();
  };

  return (
    <form onSubmit={addComment}>
      <div>
        <input
          type={content.type}
          name="comment"
          id="comment"
          value={content.value}
          onChange={content.onChange}
        />
      </div>
      <button>add comment</button>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentForm;
