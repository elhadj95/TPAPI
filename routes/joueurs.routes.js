const express = require('express');
const router = express.Router();
const joueursController = require('../controllers/joueurs.controller');

// GET /api/joueurs -> Liste les joueurs
router.get('/', joueursController.lister);

// POST /api/joueurs -> Crée un nouveau joueur
router.post('/', joueursController.creer); 

module.exports = router;