class Game {
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.newDeck = [];
    this.playedCards = [];
    this.playerTurn = 'Player 1';
    this.winner = '';
    this.slapResult = '';
  }

  randomizer(num) {
    return Math.floor(Math.random() * Math.floor(num))
  }

  shuffle(deck) {
    for(i = 0; i < 52; i++) {
      var randCard = deck.splice(randomizer(52 - i))
      this.newDeck.push(randCard[0]);
    }
  }

  deal() {
    for (i = 0; i < 26; i++) {
      var drawnCard = this.newDeck.splice(0,1)
      this.playerOne.hand.push(drawnCard[0])
      drawnCard = this.newDeck.splice(0,1)
      this.playerTwo.hand.push(drawnCard[0])
    }
  }

  playerTurn(player) {
    this.playedCards.unshift(player.playCard())
    if (player === this.playerOne) {
      this.playerTurn = this.playerTwo
    } else {
      this.playerTurn = this.playerOne
    }
  }

  slapCard(player) {
    if (this.playedCards[0].name === 'jack') {
      this.slapResult = ''
      this.slapJack(player);
    } else if (this.playedCards[0] === this.playedCards[1]) {
      this.slapResult = ''
      this.slapJack(player);
    } else if (this.playedCards[0] === this.playedCards[2]) {
      this.slapResult = ''
      this.slapJack(player);
    } else {

    }
  }

  slapJack(player) {
    for (let i = 0; i < this.playedCards.length; i++) {
      [player].hand.push(this.playedCards[i]);
    }
    this.playedCards = [];
  }

  winCheck() {
    if (this.playerOne.hand === 0) {
      this.winner = this.playerTwo.name
    } else if (this.playerTwo.hand === 0) {
      this.winner = this.playerOne.name
    }
  }

  

}
