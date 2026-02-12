const magasin = require('../data/magasin'); 

module.exports = {
  all: () => magasin.joueurs,
  add: (joueur) => {
    magasin.joueurs.push(joueur);
    return joueur;
  },
  findById: (id) => magasin.joueurs.find(j => j.id === id)
};