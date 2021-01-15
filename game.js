

class Game {
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.newDeck = this.shuffle(freshDeck);
    this.playedCards = [];
    this.topCard = ''
    this.turn = 'Player 1';
    this.winner = '';
    this.slapResult = '';
  }

  randomizer(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  shuffle(deck) {
    var tempDeck = deck
    for (let i = 0; i < 52; i++) {
      var randCard = tempDeck.splice(this.randomizer(52 - i), 1);
      tempDeck.push(randCard[0]);
    }
    return tempDeck
  }

  deal() {
    var tempDeck = this.newDeck;
    for (let i = 0; i < 26; i++) {
      var drawnCard = tempDeck.splice(0,1);
      this.playerOne.hand.push(drawnCard[0]);
      drawnCard = tempDeck.splice(0,1);
      console.log(drawnCard)
      this.playerTwo.hand.push(drawnCard[0]);
    }
  }

  playerTurn(player) {
    this.playedCards.unshift(player.playCard());
    if (player.name === this.playerOne.name) {
      this.turn = this.playerTwo.name;
      return this.playedCards[0]
    } else if (player.name === this.playerTwo.name){
      this.turn = this.playerOne.name;
      return this.playedCards[0]
    }
  }

  slapCard(player) {
    if (this.playedCards[0].name === 'jack') {
      this.slapResult = '';
      this.slapJack(player);
    } else if (this.playedCards[0] === this.playedCards[1]) {
      this.slapResult = '';
      this.slapJack(player);
    } else if (this.playedCards[0] === this.playedCards[2]) {
      this.slapResult = '';
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
      this.winner = this.playerTwo.name;
    } else if (this.playerTwo.hand === 0) {
      this.winner = this.playerOne.name;
    }
  }



}
