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