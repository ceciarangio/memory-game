const cards = [
    { name: 'jirafa', img: 'assets/jirafa.png' },
    { name: 'zebra', img: 'assets/zebra.png' },
    { name: 'oso', img: 'assets/oso.png' },
    { name: 'leon', img: 'assets/leon.png' },
    { name: 'jirafa', img: 'assets/jirafa.png' },
    { name: 'zebra', img: 'assets/zebra.png' },
    { name: 'oso', img: 'assets/oso.png' },
    { name: 'leon', img: 'assets/leon.png' },
];

let flippedCards = [];
let matchedPairs = 0;
let timer;
let seconds = 0;

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    shuffleCards(cards).forEach(card => {
        const cardElement = createCardElement(card);
        gameBoard.appendChild(cardElement);
    });
    startTimer();
});

function shuffleCards(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.name = card.name;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const cardImage = document.createElement('img');
    cardImage.src = card.img;
    cardImage.style.width = '100px';
    cardImage.style.height = '150px';
    cardFront.appendChild(cardImage);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    cardElement.addEventListener('click', handleCardClick);
    return cardElement;
}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [cardOne, cardTwo] = flippedCards;
    const isMatch = cardOne.dataset.name === cardTwo.dataset.name;

    if (isMatch) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            setTimeout(() => {
                document.getElementById('congratulations').style.display = 'block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            cardOne.classList.remove('flipped');
            cardTwo.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = seconds;
    }, 1000);
}
