const express = require('express');
const app = express();
const joueursRoutes = require('./routes/joueurs.routes');

//demarrer un serveur

app.get ('/',(req , res) => {res.send('Hello World')});


app.listen ( 3000 , ( ) => { console.log ('Le serveur est en cours d \' exécution sur http://localhost:3000/')})
app.use(express.json()); // Indispensable pour lire le JSON envoyé par le bouton "Forger Héros"
app.use('/api/joueurs', joueursRoutes);