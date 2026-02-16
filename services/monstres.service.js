const monstreRepo = require('../repositories/monstre.repo');

exports.genererUnEnnemi = () => {
    // On récupère un monstre aléatoire du repo
    const monstre = monstreRepo.monstreAuHasard();
    
    // On ajoute un petit message d'ambiance
    return {
        ...monstre,
        criDeGuerre: "GROUUAARR !!!"
    };
};