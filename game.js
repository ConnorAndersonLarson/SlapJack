class Game {
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.newDeck = [];
    this.playedCards = [];
    this.Winner = '';
    this.slapResult = '';
  }

  playerTurn(player) {
    this.playedCards.unshift(player.playCard())
  }

  slapCard(player) {
    if (this.playedCards[0].name === 'jack') {
      this.slapJack(player);
    } else if (this.playedCards[0] === this.playedCards[1]) {
      this.doubles(player);
    } else if (this.playedCards[0] === this.playedCards[2]) {
      this.sandwich(player);
    } else {

    }
  }

  slapJack(player) {
    this.slapResult = '';
    for (let i = 0; i < this.playedCards.length; i++) {
      [player].hand.push(this.playedCards[i]);
    }
    this.playedCards = [];
  }

  doubles(player) {
    this.slapResult = '';
  }

  sandwich(player) {
    this.slapResult = '';
  }

}
