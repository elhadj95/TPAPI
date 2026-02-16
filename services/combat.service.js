const magasin = require('../data/magasin');

exports.attaquer = (joueurId, monstreNom) => {
    const joueur = magasin.joueurs.find(j => j.id == joueurId);
    // On simule un monstre à partir du nom (puisqu'ils ne sont pas encore persistés)
    const monstre = { nom: monstreNom, pv: 50, atk: 10 }; 

    if (!joueur) throw new Error("Joueur introuvable");

    // 1. Le joueur attaque le monstre
    const degatsJoueur = Math.floor(Math.random() * 15) + 5;
    monstre.pv -= degatsJoueur;

    // 2. Le monstre contre-attaque
    const degatsMonstre = Math.floor(Math.random() * monstre.atk) + 1;
    joueur.pv -= degatsMonstre;

    return {
        joueurPv: joueur.pv,
        monstrePv: monstre.pv,
        log: `Joueur inflige ${degatsJoueur} dégâts. Le monstre réplique avec ${degatsMonstre} dégâts !`
    };
};