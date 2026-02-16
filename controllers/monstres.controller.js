const service = require('../services/monstres.service');

exports.apparaitre = (req, res) => {
    try {
        const monstre = service.genererUnEnnemi();
        res.json({
            message: "Un monstre surgit de l'ombre !",
            data: monstre
        });
    } catch (error) {
        res.status(500).json({ message: "Le donjon est vide..." });
    }
};