exports.register = (req, res) => {
    try {
        const infos = req.body;
        
        // On vérifie juste si on a bien reçu un nom
        const nomJoueur = infos.username || "Héros Mystérieux";

        res.status(201).json({
            message: "Bienvenue : " + nomJoueur + " un rotis de chien avant de commencer? !",
            status: "Succès"
        });
    } catch (erreur) {
        res.status(500).json({ message: "Oups, le cerveau a glissé..." });
    }
};

exports.login = (req, res) => {
    res.json({
        message: " La porte s'ouvre !",
        token: "cle-magique-123"
    });
};