const touches =  [...document.querySelectorAll('.bouton')]
const listeKeycode = touches.map(touche => touche.dataset.key);

const ecran = document.querySelector('.ecran')

document.addEventListener('keydown', (e) => {
    // Créer un mapping pour les touches du clavier
    let valeur;
    
    // Touches numériques du pavé numérique
    if (e.key >= '0' && e.key <= '9' && e.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
        valeur = (96 + parseInt(e.key)).toString(); // 96-105 pour 0-9 du pavé numérique
    } 
    // Touches numériques normales
    else if (e.key >= '0' && e.key <= '9') {
        // Pour les touches 0-9 normales, on doit trouver le bouton correspondant
        const boutonCorrespondant = touches.find(touche => touche.textContent === e.key);
        if (boutonCorrespondant) {
            valeur = boutonCorrespondant.dataset.key;
        }
    }
    // Opérateurs
    else if (e.key === '+') valeur = '107';
    else if (e.key === '-') valeur = '109';
    else if (e.key === '*') valeur = '106';
    else if (e.key === '/') valeur = '111';
    else if (e.key === '.') valeur = '110';
    else if (e.key === '(') valeur = '53';
    else if (e.key === ')') valeur = '219';
    // Touche Entrée pour le calcul
    else if (e.key === 'Enter') valeur = '13';
    // Touche Escape ou Delete pour effacer
    else if (e.key === 'Escape' || e.key === 'Delete' || e.key === 'c' || e.key === 'C') valeur = '8';
    
    if (valeur) calculer(valeur);
});

touches.forEach((touche) => {
    touche.addEventListener("click", (e) => {
        const valeur = e.target.dataset.key;
        calculer(valeur);
    });
});

const calculer = (valeur) => {
    if (listeKeycode.includes(valeur)){
        switch(valeur) {
            case '8' :
                ecran.textContent = "";
                break;
            case '13' :
                const calcul = eval(ecran.textContent);
                ecran.textContent = calcul;
                break;
            default :
                const indexKeycode = listeKeycode.indexOf(valeur);
                const touche = touches[indexKeycode];
                ecran.textContent += touche.innerHTML;
        }
    }
};

window.addEventListener("error", (e) => {
    alert("Une erreur est survenue dans votre calcul : " + e.error.message);
});