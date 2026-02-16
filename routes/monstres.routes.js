const express = require('express');
const router = express.Router();
const monstreCtrl = require('../controllers/monstres.controller');

// Route pour générer un monstre aléatoire
router.get('/random', monstreCtrl.apparaitre);

module.exports = router;