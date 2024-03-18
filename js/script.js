// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
// (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo 
// l'index.html, e le cartelle js/ css/ e /img con i relativi script e fogli di stile, 
// per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà 
// prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata 
// al massimo una bomba, perciò nell’array delle bombe non potranno esserci 
// due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista 
// dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e 
// la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può 
// continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge 
// il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte 
// le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero 
// di volte che l’utente ha cliccato su una cella che non era una bomba.

document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const gridContainer = document.getElementById('grid-container');
    const selectDifficulty = document.createElement('select');
    let bombs = [];
    // Inizializza il punteggio dell'utente
    let userScore = 0;

    // Aggiungi le opzioni di difficoltà alla select
    selectDifficulty.innerHTML = `
        <option value="1">Difficoltà 1</option>
        <option value="2">Difficoltà 2</option>
        <option value="3">Difficoltà 3</option>
    `;
    
    // Aggiungi un gestore di eventi al bottone Play
    playButton.addEventListener('click', function () {
        // Rimuovi le celle esistenti dal contenitore della griglia
        gridContainer.innerHTML = '';
        bombs = [];
        // Resetta il punteggio dell'utente
        userScore = 0;

        // Ottieni la difficoltà selezionata dalla select
        const selectedDifficulty = parseInt(selectDifficulty.value);
        let gridSize, gridColumns, gridRows;

        // Imposta le dimensioni della griglia in base alla difficoltà selezionata
        if (selectedDifficulty === 1) {
            gridSize = 100;
            gridColumns = 10;
            gridRows = 10;
        } else if (selectedDifficulty === 2) {
            gridSize = 81;
            gridColumns = 9;
            gridRows = 9;
        } else if (selectedDifficulty === 3) {
            gridSize = 49;
            gridColumns = 7;
            gridRows = 7;
        }

        // Genera le bombe
        while (bombs.length < 16) {
            const bombIndex = Math.floor(Math.random() * gridSize) + 1;
            if (!bombs.includes(bombIndex)) {
                bombs.push(bombIndex);
            }
        }

        // Genera la griglia
        for (let i = 1; i <= gridSize; i++) {
            const cell = document.createElement('div');
            cell.dataset.index = i;
            // Aggiungi il testo con l'indice della cella
            cell.innerHTML = i;
            cell.classList.add('cell');
            gridContainer.appendChild(cell);

            cell.addEventListener('click', function handleClick() {
                const clickedIndex = parseInt(cell.dataset.index);
                if (bombs.includes(clickedIndex)) {
                    // Bomba cliccata
                     // Aggiungi la classe "bomb" e "red"
                    cell.classList.add('bomb', 'red');
                    alert('Hai cliccato su una bomba! Game over. Il tuo punteggio è: ' + userScore);
                    // Riattiva il pulsante di gioco
                    playButton.disabled = false;
                    gridContainer.querySelectorAll('.cell').forEach(cell => {
                        cell.removeEventListener('click', handleClick);
                    });
                } else {
                    // Cella non bomba cliccata
                    cell.classList.add('clicked');
                    // Incrementa il punteggio dell'utente
                    userScore++;
                    const remainingCells = document.querySelectorAll('.cell:not(.clicked)');
                    if (remainingCells.length === 16) {
                        alert('Hai completato il gioco! Hai vinto! Il tuo punteggio è: ' + userScore);
                    }
                }
            });
        }

        // Imposta lo stile della griglia in base alle dimensioni calcolate
        gridContainer.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;

        playButton.disabled;
    });

    // Aggiungi la select prima del bottone di generazione
    playButton.parentNode.insertBefore(selectDifficulty, playButton);
});