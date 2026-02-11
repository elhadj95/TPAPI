const express = require('express');
const app = express();

//demarrer un serveur

app.get ('/',(req , res) => {res.send('Hello World')});


app.listen ( 3000 , ( ) => { console.log ('Le serveur est en cours d \' exécution sur http://localhost:3000/')})