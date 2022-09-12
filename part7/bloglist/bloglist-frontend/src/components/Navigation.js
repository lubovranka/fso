import { Link } from 'react-router-dom';

const Navigation = ({ name, handleLogout }) => {
    return (
        <div className="nav">
            <div className="navLinks">
                <Link to="/">blogs</Link>
                <Link to="/users">users</Link>
            </div>
            <div className="navUser">
                <button onClick={() => handleLogout()} id="logoutBtn">
                    logout
                </button>
                <p>{name} logged in</p>
            </div>
        </div>
    );
};

export default Navigation;
