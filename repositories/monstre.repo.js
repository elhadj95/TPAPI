// Répertoire monstre (placeholder)
const monstres = [];
module.exports = {
  all: () => monstres,
  add: (m) => { monstres.push(m); return m; }
};
