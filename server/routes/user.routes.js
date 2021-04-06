//? Récupération de router de express afin d'assurer que les routes soit servies sur des url qu'on définit dans le index.js
const router = require('express').Router();
//? La dépendance bcryptjs permet de crypter un password en bcrypt
const bcrypt = require('bcryptjs');
//? Le model a réutiliser sur les pages des routes. Généralement le CRUD de ces modèles.
const User = require('../models/user.model');


//? Route d'une méthode GET à la racine de la route (ici localhost:8000/api/user/)
router.get('/', (req,res)=>{
    res.send('Hello from user');
})

//? Route d'une méthode POST à l'url /register qui sert de moyen d'inscription
router.post('/register', async (req,res)=>{

    //? On génère du sel pour hasher le mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //? Création d'un nouvel utilisateur suivant le model défini dans le fichier user.model.js et le hashedPassword
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

    //? Ajout des données dans la BDD
    const result = await user.save();

    const {password, ...data} = await result.toJSON();
    //? Response du serveur à l'ajout dans la BDD avec les infos users (sauf le password)
    res.send(data);

})

//! Export du module router a réutiliser dans le index.js pour associer les routes avec un router.
module.exports = router;