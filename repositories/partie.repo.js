// Répertoire partie (placeholder)
const parties = [];
module.exports = {
  all: () => parties,
  add: (p) => { parties.push(p); return p; }
};
