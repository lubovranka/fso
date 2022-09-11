import { useEffect, useState } from 'react';
import userService from '../services/users';

const User = ({ id }) => {
    const [user, setUser] = useState({});
    console.log(user);
    useEffect(() => {
        userService.findUser(id).then((res) => setUser(res[0]));
    }, []);

    if (!user.name) {
        return null;
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blog.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
