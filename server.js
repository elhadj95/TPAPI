const express = require('express');
const app = express();

const joueursRoutes = require('./routes/joueurs.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/joueurs', joueursRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('http://localhost:3000/');
});