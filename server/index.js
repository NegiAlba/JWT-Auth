//! Executer npm init et mettre en place le package.json initial, installer nodemon via npm i --save-dev nodemon et changer le script de start en nodemon index.js
//! Récupérer les dépendances : npm i express mongoose

//? Dépendances de l'application : Express pour le serveur et Mongoose pour la connection avec MongoDB, Cors pour donner les droits d'accès au serveur
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');


//? Ajout des liens des fichiers de routes
const userRoutes = require('./routes/user.routes');

//? DB Connection avec mongoose : utilisation de l'URL mongodb
//TODO : Ajouter la connection dans un fichier séparé qui servira de module de connexion.
mongoose.connect('mongodb://localhost/jwt_auth',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, ()=>{
    console.log('Connected to MongoDB');
});

//? Instanciation de mon serveur & middlewares
//TODO : Créer un fichier .env qui contient les variables d'environnement comme l'URL de connexion à la BDD, le port d'écoute par exemple.
const app = express();
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: ['http://localhost:8000', 'http://localhost:3000', 'http://localhost:4200']
}))
app.use(express.json());

//? Routes
app.use('/api/user', userRoutes);

//! Ajouter le app.listen permet au serveur d'être servi sur une route localhost avec le port choisi
app.listen(8000);

//! On crée le model de notre données qui va être persistée dans un fichier models/user.model.js