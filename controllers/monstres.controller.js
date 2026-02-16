const service = require('../services/monstres.service');

exports.apparaitre = (req, res) => {
    try {
        const monstre = service.genererUnEnnemi();
        res.json(monstre);  // ✅ Renvoyer directement le monstre
    } catch (error) {
        res.status(500).json({ message: "Le donjon est vide..." });
    }
};
