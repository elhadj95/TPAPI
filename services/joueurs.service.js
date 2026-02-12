const joueurRepo = require('../repositories/joueur.repo');
const genererId = require('../utils/genererId'); 

exports.getAll = () => joueurRepo.all();

exports.creerJoueur = (nom) => {
  const nouveauHeros = {
    id: genererId(),
    nom: nom || "Aventurier Inconnu",
    pv: 100,
    niveau: 1,
    inventaire: [],
    dateCreation: new Date()
  };
  return joueurRepo.add(nouveauHeros);
};