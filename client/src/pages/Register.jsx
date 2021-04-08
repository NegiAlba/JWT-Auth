import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'


const Register = () => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);

    const submit = async (e)=>{
        e.preventDefault();

        await fetch('http://localhost:8000/api/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        setRedirect(true);
    }


    if(redirect){
        return <Redirect to="/login" />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>

            <input type="text" className="form-control" placeholder="e.g. Username123" id="username-input" required value={username}
                onChange={e=>setUsername(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="name@example.com" required value={email}
                onChange={e=>setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required value={password}
                onChange={e=>setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>

        </form>
    )
}

export default Register
