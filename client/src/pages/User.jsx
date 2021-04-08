import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';



const User = () => {

    //? Ajout du state username pour l'affichage des boutons ou du username
    const [username,setUsername] = useState('');

    //? useEffect qui va récupérer l'utilisateur connecté
    useEffect(()=>{
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                })

                const content = await response.json();

                setUsername(content.username);

            }
        )()
    }, [])


    //? Fonction logout qui va déconnecter l'utilisateur
    const logout = async () => {
        await fetch('http://localhost:8000/api/user/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        setUsername('');
    }

    //? Création d'une variable qui va contenir un élément JSX variable : S'il y a un user alors c'est un bouton de déconnexion, autrement c'est un bouton de connexion
    let link;

    if (!username){
        link = (
            <Link to="/login" className="btn btn-success">Login</Link>
        )
    }else{
        link = (
            <button onClick={logout} className="btn btn-danger">Logout</button>
        )
    }
    //? Fin de la variable


    return (
        <div>
            {username ? `You are connected as ${username}` : `Log-in to discover new stuff`}
            {link}
        </div>
    )
}

export default User
