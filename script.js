// 1. Sélection des éléments de l'interface
const btnCreatePlayer = document.getElementById('btn-create-player');
const playerNameInput = document.getElementById('player-name');
const playerIdSpan = document.getElementById('player-id');
const logPre = document.getElementById('log');

// 2. Fonction utilitaire pour écrire dans le grimoire
function addLog(message) {
  const timestamp = new Date().toLocaleTimeString();
  logPre.textContent += `\n[${timestamp}] ${message}`;
  logPre.scrollTop = logPre.scrollHeight;
}

// 3. Logique pour FORGER HÉROS
btnCreatePlayer.onclick = async () => {
  const name = playerNameInput.value.trim();

  if (!name) {
    addLog("⚠️ Un héros doit avoir un nom !");
    return;
  }

  try {
    const response = await fetch('/api/joueurs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: name })
    });

    const data = await response.json();

    if (response.ok) {
      playerIdSpan.textContent = data.id; // Utilise l'ID généré par ton service
      addLog(`✨ Succès : ${data.nom} forgé avec ${data.pv} PV !`);
      playerNameInput.value = '';
    } else {
      addLog(`❌ Erreur : ${data.message}`);
    }
  } catch (error) {
    addLog("❌ Serveur injoignable.");
  }
};

// 4. Logique pour INSCRIPTION (Partie de tes collègues)
document.getElementById('btn-register').onclick = async () => {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const resultat = await response.json();
    addLog(`🔑 Auth : ${resultat.message}`);
  } catch (error) {
    addLog("❌ Erreur lors de l'inscription.");
  }
};