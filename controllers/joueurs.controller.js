const joueursService = require('../services/joueurs.service');

exports.lister = (req, res) => {
  const joueurs = joueursService.getAll();
  res.json(joueurs);
};

exports.creer = (req, res) => {
  const { nom } = req.body; // Récupère le nom depuis le formulaire HTML
  const nouveauJoueur = joueursService.creerJoueur(nom);
  res.status(201).json(nouveauJoueur);
};