const listeDesMonstres = [
    { id: 1, nom: "Kongana", pointsDeVie: 30, attaque: 8 },
    { id: 2, nom: "Dracula", pointsDeVie: 45, attaque: 10 },
    { id: 3, nom: "Thanos", pointsDeVie: 80, attaque: 30 },
    { id: 4, nom: "Venom", pointsDeVie: 200, attaque: 28 }
];

exports.trouverTous = () => {
    return listeDesMonstres;
};

exports.trouverParId = (id) => {
    return listeDesMonstres.find(monstre => monstre.id === id);
};

exports.monstreAuHasard = () => {
    const numeroHasard = Math.floor(Math.random() * listeDesMonstres.length);
    return listeDesMonstres[numeroHasard];
};