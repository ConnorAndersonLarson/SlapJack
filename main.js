var game = '';

var homeScreen = document.querySelector('#startMenu')
var instScreen = document.querySelector('#instructionMenu')
var gameScreen = document.querySelector('#gameWindow')
var playedCard = document.querySelector('#playedPile')

homeScreen.addEventListener('click', homeScreenPress)
instScreen.addEventListener('click', returnHome)
document.addEventListener('keydown', playerPress)

//window.addEventListener('onload', makeGame);

function homeScreenPress() {
  if (event.target.id === 'play') {
    startGame()
  } else if (event.target.id === 'instructions') {
    showRules()
  }
}

function returnHome() {
  if (event.target.id === 'return') {
    showRules()
  }
}

function playerPress(key) {
  var yourCard = '';
  if (game.turn === 'Player 1' && key.key === 'q') {
    yourCard = game.playerTurn(game.playerOne)
    playedCard.innerHTML = yourCard.image;
  } else if (game.turn === 'Player 2' && key.key === 'p') {
    yourCard = game.playerTurn(game.playerTwo)
    playedCard.innerHTML = yourCard.image;
  }

}

function startGame() {
    homeScreen.classList.toggle('hidden');
    gameScreen.classList.toggle('hidden');
    makeGame()
}

function showRules() {
  homeScreen.classList.toggle('hidden');
  instScreen.classList.toggle('hidden')
}

function makeGame() {
  if (localStorage.getItem('savedGame') === null) {
    player1 = new Player('Player 1')
    player2 = new Player('Player 2')
    game = new Game(player1, player2);
    game.deal()
  } else {
    game = JSON.parse(localStorage.getItem('savedGame'));
  }
}
