// Service parties (placeholder)
exports.getAll = () => {
  return [];
};
const partiesRepo = require('../repositories/parties.repo');
const monstresRepo = require('../repositories/monstres.repo'); 

const monstresBase = [
  { id: 'gobelin', nom: 'Gobelin', pv: 20, attaque: 5, loot: 'potion' },
  { id: 'orc', nom: 'Orc', pv: 30, attaque: 8, loot: 'epee' },
  { id: 'dragon', nom: 'Dragon', pv: 50, attaque: 15, loot: 'tresor' }
];

exports.creerPartie = async (joueurId) => {
  const donjon = [];
  const nbSalles = 5;
  
  for (let i = 1; i <= nbSalles; i++) {
    const hasMonstre = Math.random() < 0.6; // 60% chance monstre
    donjon.push({
      numero: i,
      monstre: hasMonstre ? { ...monstresBase[Math.floor(Math.random() * monstresBase.length)] } : null,
      visitee: false,
      pillage: hasMonstre ? null : 'rien'
    });
  }
  
  const partie = {
    id: partiesRepo.createPartie({ joueurId, pvJoueur: 100, salleActuelle: 1, donjon, terminee: false, joueurMort: false })
  };
  
  await partiesRepo.save(partie); // Persist si repo le fait
  return partie;
};

exports.findById = async (id) => {
  return partiesRepo.findById(id);
};

exports.deplacer = async (id) => {
  const partie = await partiesRepo.findById(id);
  if (!partie) throw new Error('Partie non trouvée');
  
  const salleActuelle = partie.salleActuelle;
  if (salleActuelle >= partie.donjon.length) {
    partie.terminee = true;
  } else {
    partie.salleActuelle++;
    partie.donjon[salleActuelle - 1].visitee = true; // Marque précédente
  }
  
  await partiesRepo.update(partie);
  return partie;
};

exports.attaquer = async (id) => {
  const partie = await partiesRepo.findById(id);
  if (!partie) throw new Error('Partie non trouvée');
  
  const salle = partie.donjon[partie.salleActuelle - 1];
  const monstre = salle.monstre;
  
  // Joueur attaque (20 dmg)
  monstre.pv -= 20;
  
  if (monstre.pv <= 0) {
    salle.monstre = null;
    salle.pillage = monstre.loot;
    // Marque salle visitée
    salle.visitee = true;
  } else {
    // Monstre riposte
    partie.pvJoueur -= monstre.attaque;
    if (partie.pvJoueur <= 0) {
      partie.joueurMort = true;
      partie.terminee = true;
    }
  }
  
  await partiesRepo.update(partie);
  return partie;
};
