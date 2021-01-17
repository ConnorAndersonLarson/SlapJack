

class Game {
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.newDeck = this.shuffle(freshDeck);
    this.playedCards = [];
    this.topCard = '';
    this.turn = 'Player 1';
    this.winner = '';
    this.slapResult = '';
  }

  randomizer(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  shuffle(deck) {
    var tempDeck = [...deck];
    for (let i = 0; i < 52; i++) {
      var randCard = tempDeck.splice(this.randomizer(52 - i), 1);
      tempDeck.push(randCard[0]);
    }
    return tempDeck;
  }

  deal() {
    var tempDeck = this.newDeck;
    for (let i = 0; i < 26; i++) {
      var drawnCard = tempDeck.splice(0,1);
      this.playerOne.hand.push(drawnCard[0]);
      drawnCard = tempDeck.splice(0,1);
      this.playerTwo.hand.push(drawnCard[0]);
    }
  }

  playerTurn(player) {
    if (this.playerOne.hand && this.playerTwo.hand) {
      this.normalTurn(player)
    } else {
      endGameTurn(player)
    }
  }

  normalTurn(player) {
    if (player.name === this.playerOne.name && this.playerOne.hand[0]) {
      this.playedCards.unshift(player.playCard());
      this.turn = this.playerTwo.name;
      this.slapResult = '';
      return this.playedCards[0];
    } else if (player.name === this.playerTwo.name && this.playerTwo.hand[0]){
      this.playedCards.unshift(player.playCard());
      this.turn = this.playerOne.name;
      this.slapResult = '';
      return this.playedCards[0];
    } else {
      this.winCheck();
    }

  }

  slapCard(player) {
    if (this.playedCards[0].name === 'jack') {
      this.slapResult = `${player.name} slapped a jack and received the pile!`;
      this.slapJack(player);
    } else if (this.playedCards[1] && this.playedCards[0].name === this.playedCards[1].name) {
      this.slapResult = `${player.name} slapped doubles and received the pile!`;
      this.slapJack(player);
    } else if (this.playedCards[2] && this.playedCards[0].name === this.playedCards[2].name) {
      this.slapResult = `${player.name} slapped a sandwich and received the pile!`;
      this.slapJack(player);
    } else {
      this.slapResult = `${player.name} made a bad slap! The other player gets a card!`;
      console.log('test')
      this.badSlap(player);
    }
  }

  slapJack(player) {
    for (let i = 0; i < this.playedCards.length; i++) {
      player.hand.push(this.playedCards[i]);
    }
    this.playedCards = [];
  }

  badSlap(player) {
    var givenCard = player.hand.splice(0,1);
    if (player.name === this.playerOne.name) {
      this.playerTwo.hand.push(givenCard[0]);
    } else if (player.name === this.playerTwo.name) {
      this.playerOne.hand.push(givenCard[0]);
    }
  }

  winCheck() {
    if (this.playerOne.hand.length === 0) {
      this.winner = this.playerTwo.name;
      this.playerTwo.saveWinsToStorage();
    } else if (this.playerTwo.hand.length === 0) {
      this.winner = this.playerOne.name;
      this.playerOne.saveWinsToStorage();
    }
  }



}
