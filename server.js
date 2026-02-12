const express = require('express');
const app = express();

const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use(express.static('public'));


app.use('/auth', authRoutes); 

app.listen(3000, () => { console.log("OK"); });