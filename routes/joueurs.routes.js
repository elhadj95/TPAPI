// Routes des joueurs (placeholder)
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Liste des joueurs (placeholder)' }));

module.exports = router;
