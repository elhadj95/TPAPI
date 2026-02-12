const express = require('express');
const app = express();

// 1. Importation des routes
// On utilise le nom choisi par tes collègues pour l'auth
const authRoutes = require('./routes/auth.routes'); 
// On utilise ton fichier pour les joueurs
const joueursRoutes = require('./routes/joueurs.routes'); 

// 2. Middlewares (Indispensables pour le JSON et le CSS/HTML)
app.use(express.json()); 
app.use(express.static('public')); 

// 3. Branchement des points d'entrée (Endpoints)
app.use('/auth', authRoutes);       // Pour le login/register
app.use('/api/joueurs', joueursRoutes); // Pour ton bouton "Forger Héros"

// 4. Lancement du serveur
app.listen(3000, () => { 
    console.log("⚔️  Donjon opérationnel sur http://localhost:3000"); 
});