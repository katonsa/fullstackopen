import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UserView = () => {
  const params = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === params.id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user.blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>This user has not yet created a blog</div>
      )}
    </div>
  );
};

export default UserView;
