// Contrôleur parties (placeholder)
exports.lister = (req, res) => {
  res.json({ message: 'Liste des parties contrôleur (placeholder)' });
};
const partiesService = require('../services/parties.service');
const joueursRepo = require('../repositories/joueurs.repo'); // Pour validation joueur

// POST /api/parties - Créer une partie pour un joueur
exports.creerPartie = async (req, res) => {
  try {
    const { joueurId } = req.body;
    if (!joueurId) return res.status(400).json({ error: 'joueurId requis' });
    
    const joueur = joueursRepo.findById(joueurId);
    if (!joueur) return res.status(404).json({ error: 'Joueur non trouvé' });
    
    const partie = await partiesService.creerPartie(joueurId);
    res.status(201).json(partie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/parties/:id - Récupérer état partie
exports.getPartie = async (req, res) => {
  try {
    const partie = await partiesService.findById(req.params.id);
    if (!partie) return res.status(404).json({ error: 'Partie non trouvée' });
    res.json(partie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/parties/:id/move - Avancer salle
exports.deplacer = async (req, res) => {
  try {
    const partie = await partiesService.findById(req.params.id);
    if (!partie) return res.status(404).json({ error: 'Partie non trouvée' });
    
    if (partie.joueurMort) return res.status(400).json({ error: 'Joueur mort' });
    if (partie.salleActuelle.monstre) return res.status(400).json({ error: 'Vaincre monstre d\'abord' });
    
    const updated = await partiesService.deplacer(req.params.id);
    if (updated.terminee) return res.json({ ...updated, message: 'Donjon terminé ! Victoire' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/parties/:id/attack - Attaquer monstre
exports.attaquer = async (req, res) => {
  try {
    const partie = await partiesService.findById(req.params.id);
    if (!partie) return res.status(404).json({ error: 'Partie non trouvée' });
    
    if (partie.joueurMort) return res.status(400).json({ error: 'Joueur mort' });
    if (!partie.salleActuelle.monstre) return res.status(400).json({ error: 'Aucun monstre' });
    
    const updated = await partiesService.attaquer(req.params.id);
    if (updated.joueurMort) return res.json({ ...updated, message: 'Défaite !' });
    if (!updated.salleActuelle.monstre) return res.json({ ...updated, message: 'Monstre vaincu ! Avancez' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};