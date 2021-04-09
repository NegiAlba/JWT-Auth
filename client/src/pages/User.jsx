import React, {useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';



const User = () => {

    const {user, setUser} = useContext(UserContext);
    
    const context = useContext(UserContext);
    console.log(context);

    

    //? useEffect qui va récupérer l'utilisateur connecté
    useEffect(()=>{
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                })

                const content = await response.json();



                // if(content._id){
                //     setUser(content);
                // }

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

        setUser(null);
    }

    //? Création d'une variable qui va contenir un élément JSX variable : S'il y a un user alors c'est un bouton de déconnexion, autrement c'est un bouton de connexion
    let link;

    if (!user){
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
            {user ? `You are connected as ${user.username}` : `Log-in to discover new stuff`}
            {link}
        </div>
    )
}

export default User
