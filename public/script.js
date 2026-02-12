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