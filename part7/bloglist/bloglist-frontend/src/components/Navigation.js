import { Link } from 'react-router-dom';

const style = {
    gap: '1em',
    display: 'flex',
    backgroundColor: 'grey',
    fontSize: '1rem',
    alignItems: 'center'
};

const Navigation = ({ name, handleLogout }) => {
    return (
        <div style={style}>
            <Link to="/">
                blogs
            </Link>
            <Link to="/users">users</Link>
            <p>{name} logged in</p>
            <button onClick={() => handleLogout()} id="logoutBtn">
                logout
            </button>
        </div>
    );
};

export default Navigation;
