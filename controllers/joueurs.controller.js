const joueursService = require('../services/joueurs.service');

exports.lister = (req, res) => {
  res.json(joueursService.getAll());
};

exports.creer = (req, res) => {
  try {
    const { nom } = req.body; 
    if (!nom) return res.status(400).json({ message: "Nom requis" });

    const nouveau = joueursService.creerJoueur(nom);
    res.status(201).json(nouveau);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};