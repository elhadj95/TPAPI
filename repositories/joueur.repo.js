const joueurs = [];
module.exports = {
  all: () => joueurs,
  add: (j) => { joueurs.push(j); return j; }
};
