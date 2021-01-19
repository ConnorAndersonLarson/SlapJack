var game = '';

var homeScreen = document.querySelector('#startMenu');
var instScreen = document.querySelector('#instructionMenu');
var gameScreen = document.querySelector('#gameWindow');
var playedCard = document.querySelector('#playedPile');
var cardCount = document.querySelector('#cardsInPile');
var slapUpdate = document.querySelector('#gameUpdates');
var leftWins = document.querySelector('#leftWins');
var rightWins = document.querySelector('#rightWins');
var newGameButton = document.querySelector('#newGame');

homeScreen.addEventListener('click', homeScreenPress);
instScreen.addEventListener('click', returnHome);
newGameButton.addEventListener('click', newGamePress);
document.addEventListener('keydown', playerKeyPress);

function homeScreenPress() {
  if (event.target.id === 'play') {
    startGame();
  } else if (event.target.id === 'instructions') {
    showRules();
  }
}

function returnHome() {
  if (event.target.id === 'return') {
    showRules();
  }
}

function newGamePress() {
  showNewGame();
  makeGame();
  updateTopText();
  updateCardCount();
}

function playerKeyPress(key) {
  var yourCard = '';
  if (game.turn === 'Player 1' && key.key === 'q') {
    game.playerTurn(game.playerOne);
    updateCardShadow('left-card')
  } else if (game.turn === 'Player 2' && key.key === 'p') {
    game.playerTurn(game.playerTwo);
    updateCardShadow('right-card')
  } else if (game.turn && key.key === 'f' && game.playedCards[0]) {
    game.slapCard(game.playerOne);
  } else if (game.turn && key.key === 'j' && game.playedCards[0]) {
    game.slapCard(game.playerTwo);
  }
  updateCardCount();
  updateTopText();
}

function startGame() {
  homeScreen.classList.toggle('hidden');
  gameScreen.classList.toggle('hidden');
  slapUpdate.classList.remove('hidden');
  makeGame();
}

function showRules() {
  homeScreen.classList.toggle('hidden');
  instScreen.classList.toggle('hidden');
}

function showNewGame() {
  newGameButton.classList.toggle('hidden');
  cardCount.classList.toggle('hidden');
}

function makeGame() {
  player1 = new Player('Player 1');
  player2 = new Player('Player 2');
  game = new Game(player1, player2);
  game.playerOne.wins = JSON.parse(localStorage.getItem('Player 1')) || 0;
  game.playerTwo.wins = JSON.parse(localStorage.getItem('Player 2')) || 0;
  leftWins.innerText = game.playerOne.wins;
  rightWins.innerText = game.playerTwo.wins;
  game.deal();
}

function updateTopText() {
  slapUpdate.innerText = game.slapResult;
}

function updateCardCount() {
  cardCount.innerText = game.playedCards.length || '0';
  if (game.playedCards[0]) {
    playedCard.innerHTML = game.playedCards[0].image;
  } else {
    playedCard.innerHTML = '';
  }
}

function updateCardShadow(className) {
  playedCard.classList.remove('left-card');
  playedCard.classList.remove('right-card');
  playedCard.classList.add(className);
}

function gameOver() {
  if (game.winner === game.playerOne.name) {
    playedCard.innerHTML = `<h2>${game.playerOne.name} wins!</h2>`;
    game.slapResult = `${game.winner} HAS WON!`;
    leftWins.innerText = game.playerOne.wins;
  } else if (game.winner === game.playerTwo.name) {
    playedCard.innerHTML = `<h2>${game.playerTwo.name} wins!</h2>`;
    game.slapResult = `${game.winner} HAS WON!`;
    rightWins.innerText = game.playerTwo.wins;
  }
  updateTopText();
}
