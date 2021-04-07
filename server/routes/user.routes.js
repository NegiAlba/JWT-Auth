//? Récupération de router de express afin d'assurer que les routes soit servies sur des url qu'on définit dans le index.js
const router = require('express').Router();
//? La dépendance bcryptjs permet de crypter un password en bcrypt
const bcrypt = require('bcryptjs');

//? La dépendance jsonwebtoken qui permet de... créer des json web tokens, mais aussi de les utiliser.
const jwt = require('jsonwebtoken');

//? Le model a réutiliser sur les pages des routes. Généralement le CRUD de ces modèles.
const User = require('../models/user.model');




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

//? Route /login qui sert à se connecter en vérifiant les identifiants depuis la BDD
router.post('/login', async (req,res)=>{

    //? Etape 1.Vérifier qu'un utilisateur possède cette adresse
    const user = await User.findOne({email:req.body.email});

    if (!user) {
        return res.status(404).send({
            message:'User not found'
        })
    }

    //? Etape 2. Vérifier que le mot de passe est valide

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(404).send({
            message:'Invalid credentials'
        })
    }


    //? Etape 3.Créer un token de session
    const token = jwt.sign({_id: user._id}, "secret");

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day in ms
    })

    res.send({
        message:'Authentification success'
    });

})

//? La route /user va servir de route qui récupère les infos de l'utilisateur authentifié.
router.get('/', async (req,res) => {

    try {
        //? Récupère mon cookie qui est présent sur la machine
        const cookie = req.cookies['jwt']


        //? Je vais faire vérifier le cookie via la méthode verify de jwt -> Je vais retourner l'id utilisé pour le cookie et un id de cryptage
        const claims = await jwt.verify(cookie, 'secret');

        //? Si mon cookie n'est pas valide, je renvoie un code d'erreur 401 avec un message de non autorisation
        if (!claims) {
            return res.status(401).send({
                message: 'Not authenticated'
            })
        }

        //? Si toutefois mon cookie est valide, je récupère l'utilisateur qui est associé à l'id du cookie

        const user = await User.findOne({_id:claims._id});

        //* user {(JSON) _id,username,email,password}

        //* const password = {(JSON)password} && const data = {(JSON)_id,username,email}

        const {password, ...data} = await user.toJSON()

        //* const data = {(JSON)_id,username,email}

        //? Je renvoie les infos liées à l'utilisateur authentifié
        res.send(data);

    } catch (error) {
        return res.status(401).send({
            message: 'Not authenticated'
        })
    }
})

router.post('/logout', (req,res)=>{
    res.cookie('jwt', '', {maxAge:0});

    res.send({
        message:'Successfully logged out'
    })
})

//! Export du module router a réutiliser dans le index.js pour associer les routes avec un router.
module.exports = router;