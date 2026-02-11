const service = require('../services/auth.service');

exports.register = (req, res) => {
    const infos = req.body;
    const nouveauJoueur = service.createUser(infos);
    
    res.status(201).json({
        message: "Joueur créé",
        data: nouveauJoueur
    });
};

exports.login = (req, res) => {
    const infos = req.body;
    const resultat = service.login(infos);

    res.json({
        message: "Bonjour",
        token: resultat.token
    });
};