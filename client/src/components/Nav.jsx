import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

const Nav = () => {
    const {user} = useContext(UserContext);
    
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">JWT-Auth</Link>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {!user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                        ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">User</Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
