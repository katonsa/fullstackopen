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
    <Form onSubmit={addComment}>
      <Form.Group>
        <Form.Control
          type={content.type}
          name="comment"
          id="comment"
          placeholder="Leave a comment..."
          value={content.value}
          onChange={content.onChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentForm;
