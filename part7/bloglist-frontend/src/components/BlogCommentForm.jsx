import PropTypes from 'prop-types';
import useField from '../hooks';
import { Button, Form } from 'react-bootstrap';

const CommentForm = (props) => {
  const content = useField('text');

  const addComment = (event) => {
    event.preventDefault();
    props.addComment(content.value);
    content.reset();
  };

  return (
    <Form className="mb-2" onSubmit={addComment}>
      <Form.Group className="mb-2">
        <Form.Control
          type={content.type}
          name="comment"
          id="comment"
          placeholder="Leave a comment..."
          value={content.value}
          onChange={content.onChange}
          as="textarea"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={content.value.trim() === ''}
        aria-disabled={'' === content.value.trim()}
      >
        Add comment
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentForm;
