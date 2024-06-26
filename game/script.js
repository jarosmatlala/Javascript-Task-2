const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...letters, ...letters]; // Duplicate letters to form pairs
cards = cards.sort(() => 0.5 - Math.random()); //  reshuffling the cards

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let flippedCards = 0;

function createCard(letter) {
    const card = document.createElement('div'); // creating a Div
    card.classList.add('card');
    card.dataset.letter = letter;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (this === firstCard || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    this.textContent = this.dataset.letter;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;
    if (isMatch) {
        flippedCards += 2;
        resetCards();
        if (flippedCards === cards.length) {
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

cards.forEach(letter => gameBoard.appendChild(createCard(letter)));