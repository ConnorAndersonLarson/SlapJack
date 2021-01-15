var game = '';

window.addEventListener('onload', makeGame)



function makeGame() {
  if (localStorage.getItem('savedGame') === undefined) {
    game = new Game(player1, player2)
  } else {
    game = JSON.parse(localStorage.getItem('savedGame'))
  }
}
