import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <h1>Homepage</h1>
            {user ? (<p> Welcome back {user.username} </p>) : (<Link to='/login'>Log-in quickly !</Link>)}
        </div>
    )
}

export default Home
