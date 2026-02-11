// Routes des parties (placeholder)
const express = require('express');
const router = express.Router();
const { 
  createPartie, 
  getPartie, 
  avancer, 
  attaquer 
} = require('../controllers/parties.controller');


const requireAuth = require('../utils/auth.utils'); 

router.post('/', requireAuth, createPartie);
router.get('/:id', requireAuth, getPartie);
router.post('/:id/avancer', requireAuth, avancer);
router.post('/:id/attaquer', requireAuth, attaquer);

module.exports = router;
