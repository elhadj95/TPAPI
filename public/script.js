const gameState = {
  token: null,
  hero: null,
  gameId: null,
  room: 0,
  inCombat: false,
  monster: null
};

const logEl = document.getElementById('log');

function log(message) {
  const time = new Date().toLocaleTimeString();
  logEl.innerHTML += `\n[${time}] ${message}`;
  logEl.scrollTop = logEl.scrollHeight;
}

function updateUI() {
  document.getElementById('token').innerText = gameState.token ? "Actif" : "Aucun";
  document.getElementById('player-id').innerText = gameState.hero ? gameState.hero.name : "-";
  document.getElementById('game-id').innerText = gameState.gameId || "-";
  document.getElementById('current-room').innerText = gameState.room;
  document.getElementById('game-status').innerText = gameState.inCombat ? "COMBAT" : "Exploration";

  const zoneCombat = document.getElementById('zone-combat');
  if (gameState.inCombat && gameState.monster) {
    zoneCombat.style.display = 'block';
    document.getElementById('nom-monstre').innerText = gameState.monster.nom;  
    document.getElementById('pv-monstre').innerText = gameState.monster.pointsDeVie;  
  } else {
    zoneCombat.style.display = 'none';
  }
}

document.getElementById('btn-register').addEventListener('click', async () => {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;

  try {
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });
    const data = await res.json();
    if (res.ok) log(`Inscription réussie: ${username}`);
    else log(`Erreur: ${data.message}`);
  } catch (e) {
    log("Erreur serveur lors de l'inscription");
  }
});

document.getElementById('btn-login').addEventListener('click', async () => {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      gameState.token = data.token;
      log(`Connexion réussie: ${username}`);
      updateUI();
    } else {
      log(`Erreur: ${data.message}`);
    }
  } catch (e) {
    log("Erreur serveur lors de la connexion");
  }
});

document.getElementById('btn-create-player').addEventListener('click', async () => {
  if (!gameState.token) return log("Veuillez vous connecter d'abord.");
  
  const name = document.getElementById('player-name').value;
  
  try {
    const res = await fetch('/api/joueurs', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gameState.token}`
      },
      body: JSON.stringify({ nom: name })
    });
    const data = await res.json();
    if (res.ok) {
      gameState.hero = data;
      log(`Héros ${name} créé.`);
      updateUI();
    } else {
      log(`Erreur: ${data.message}`);
    }
  } catch (e) {
    log("Erreur serveur création héros");
  }
});

document.getElementById('btn-start-game').addEventListener('click', () => {
  if (!gameState.hero) return log("Créez un héros d'abord.");
  
  gameState.gameId = "G-" + Math.floor(Math.random() * 1000);
  gameState.room = 1;
  gameState.inCombat = false;
  log("Vous entrez dans le donjon.");
  updateUI();
});

document.getElementById('btn-move').addEventListener('click', () => {
  if (!gameState.gameId) return;
  if (gameState.inCombat) return log("Combat en cours !");
  
  gameState.room++;
  log(`Vous avancez salle ${gameState.room}.`);
  updateUI();
});

document.getElementById('btn-chercher').addEventListener('click', async () => {
  if (!gameState.gameId || gameState.inCombat) return;

  try {
    const res = await fetch('/api/monstres/random');
    if (!res.ok) throw new Error("Erreur récupération monstre");
    
    const response = await res.json();
    gameState.monster = response.data;  
    gameState.inCombat = true;
    
    log(`Un ${gameState.monster.nom} apparaît !`);  
    updateUI();
  } catch (e) {
    log("Erreur: Impossible de récupérer un monstre depuis le serveur.");
    console.error(e);
  }
});

document.getElementById('btn-attack').addEventListener('click', () => {
  if (!gameState.inCombat) return log("Personne à attaquer.");
  
  const dmg = 10;
  gameState.monster.pointsDeVie -= dmg;  
  log(`Vous infligez ${dmg} dégâts.`);

  if (gameState.monster.pointsDeVie <= 0) {  
    log(`Le ${gameState.monster.nom} est vaincu.`);  
    gameState.inCombat = false;
    gameState.monster = null;
  }
  updateUI();
});
