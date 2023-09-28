import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserView = () => {
  const params = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === params.id);

  if (!user) {
    return null;
  }

  console.log('UserView render');

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
