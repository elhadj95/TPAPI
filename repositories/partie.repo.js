// Répertoire partie (placeholder)
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const filePath = path.join(dataDir, 'parties.json');

// Assure dossier data existe
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Charge données depuis JSON ou []
let parties = [];
try {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    parties = JSON.parse(data);
  }
} catch (error) {
  console.log('Fichier parties.json créé');
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

let nextId = parties.length > 0 ? Math.max(...parties.map(p => p.id)) + 1 : 1;

module.exports = {
  createPartie(data) {
    const partie = { id: nextId++, ...data, createdAt: new Date().toISOString() };
    parties.push(partie);
    this.save();
    return partie;
  },

  findById(id) {
    return parties.find(p => p.id === parseInt(id));
  },

  findAll() {
    return parties;
  },

  update(partie) {
    const index = parties.findIndex(p => p.id === partie.id);
    if (index !== -1) {
      parties[index] = { ...parties[index], ...partie };
      this.save();
      return parties[index];
    }
    return null;
  },

  deleteById(id) {
    const index = parties.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      parties.splice(index, 1);
      nextId = parties.length > 0 ? Math.max(...parties.map(p => p.id)) + 1 : 1;
      this.save();
      return true;
    }
    return false;
  },

  save() {
    fs.writeFileSync(filePath, JSON.stringify(parties, null, 2));
  }
};
