import { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAllUsers().then((res) => setUsers(res));
    }, []);

    users;

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blog.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
