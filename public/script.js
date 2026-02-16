// 1. Sélection des éléments de l'interface
const btnCreatePlayer = document.getElementById('btn-create-player');
const playerNameInput = document.getElementById('player-name');
const playerIdSpan = document.getElementById('player-id');
const logPre = document.getElementById('log');

// 2. Fonction utilitaire pour écrire dans le grimoire (logs)
function addLog(message) {
  const timestamp = new Date().toLocaleTimeString();
  logPre.textContent += `\n[${timestamp}] ${message}`;
  logPre.scrollTop = logPre.scrollHeight; // Garde le log à jour en bas
}

// 3. Logique du bouton "FORGER HÉROS"
btnCreatePlayer.addEventListener('click', async () => {
  const name = playerNameInput.value.trim();

  if (!name) {
    addLog("⚠️ Grimoire : Un héros ne peut pas être forgé sans nom !");
    return;
  }

  try {
    // Envoi de la requête au serveur 
    const response = await fetch('/api/joueurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom: name }) // Le corps de la requête
    });

    const data = await response.json();

    if (response.ok) {
      // Si le serveur répond 201 (Succès)
      playerIdSpan.textContent = data.id; // Affiche l'ID généré par ton utilitaire
      addLog(`✨ Forge réussie : ${data.nom} (Niveau ${data.niveau}) est prêt !`);
      playerNameInput.value = ''; // Vide le champ après création
    } else {
      addLog(`❌ Échec de la forge : ${data.message}`);
    }
  } catch (error) {
    addLog("❌ Le serveur est injoignable. Le donjon est fermé.");
    console.error("Erreur Fetch :", error);
  }
});
const grimoire = document.getElementById('log');

document.getElementById('btn-register').onclick = async () => {
    const username = document.getElementById('reg-username').value;
    
    const reponse = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username })
    });

    const resultat = await reponse.json();
    
    // On ajoute le texte dans le grimoire sans effacer l'ancien
    grimoire.innerHTML += "\n> " + resultat.message;
};

// Fonction pour invoquer un monstre dans le donjon
async function chercherCombat() {
    try {
        const response = await fetch('/api/monstres/random');
        const resultat = await response.json();
        
        if (response.ok) {
            const monstre = resultat.data;
            // On affiche le monstre dans le grimoire
            const grimoire = document.getElementById('log');
            grimoire.innerHTML += `\n⚠️ ${resultat.message} : <b>${monstre.nom}</b> (PV: ${monstre.pointsDeVie}, ATK: ${monstre.attaque}) surgit !`;
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de combat", error);
    }
}

let monstreActuel = null;

// CHERCHER UN COMBAT
document.getElementById('btn-chercher').onclick = async () => {
    const response = await fetch('/api/monstres/random');
    const res = await response.json();
    
    if (response.ok) {
        monstreActuel = res.data;
        document.getElementById('nom-monstre').textContent = monstreActuel.nom;
        document.getElementById('pv-monstre').textContent = monstreActuel.pointsDeVie;
        document.getElementById('btn-attaquer').style.display = 'inline-block';
        addLog(`⚠️ Un ${monstreActuel.nom} bloque le chemin !`);
    }
};

// ATTAQUER
document.getElementById('btn-attack').onclick = async () => {
    const joueurId = document.getElementById('player-id').textContent;
    
    // Pour simplifier sans créer de route de combat complexe tout de suite :
    const degats = Math.floor(Math.random() * 20);
    monstreActuel.pointsDeVie -= degats;
    
    document.getElementById('pv-monstre').textContent = monstreActuel.pointsDeVie;
    addLog(`⚔️ Tu frappes le ${monstreActuel.nom} pour ${degats} dégâts !`);

    if (monstreActuel.pointsDeVie <= 0) {
        addLog(`🏆 VICTOIRE ! Le ${monstreActuel.nom} est terrassé !`);
        document.getElementById('btn-attaquer').style.display = 'none';
        monstreActuel = null;
    }
};
