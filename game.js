class Game {
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.newDeck = this.shuffle(freshDeck);
    this.playedCards = [];
    this.turn = 'Player 1';
    this.winner = '';
    this.slapResult = '';
  }

  randomizer(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }

  shuffle(deck) {
    var tempDeck = [...deck];
    for (let i = 0; i < tempDeck.length; i++) {
      var randCard = tempDeck.splice(this.randomizer(tempDeck.length - i), 1);
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
    if (this.playerOne.hand.length && this.playerTwo.hand.length) {
      this.normalTurn(player);
    } else {
      this.endGameTurn(player);
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

  endGameTurn(player) {
    this.reshuffle(player);
    if (this.playerOne.hand.length) {
      this.normalTurn(player);
      this.turn = this.playerOne.name;
    } else if (this.playerTwo.hand.length) {
      this.normalTurn(player);
      this.turn = this.playerTwo.name;
    }
    this.slapResult = `A player is out of cards! Only jacks are valid slaps!`;
  }

  reshuffle(player) {
    if (this.playedCards.length === 52) {
      player.hand = this.shuffle(this.playedCards);
      this.playedCards = [];
    }
  }

  slapCard(player) {
    if (this.playerOne.hand.length && this.playerTwo.hand.length) {
      this.normalSlap(player);
    } else {
      this.endGameSlap(player);
    }
  }

  normalSlap(player) {
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
      this.badSlap(player);
    }
  }

  endGameSlap(player) {
    if (this.playedCards[0].name === 'jack' && player.hand.length) {
      this.slapResult = `${player.name} slapped a jack and received the pile!`;
      this.slapJack(player);
      this.winCheck();
    } else if (this.playedCards[0].name !== 'jack' && !player.hand.length) {
      this.slapResult = 'Bad Slap!';
      this.winCheck();
    } else {
      this.slapResult = `${player.name} slapped a jack and received the pile! Back to Normal Rules!`;
      this.slapJack(player);
    }
  }

  slapJack(player) {
    for (let i = 0; i < this.playedCards.length; i++) {
      player.hand.push(this.playedCards[i]);
    }
    this.playedCards = [];
    player.hand = this.shuffle(player.hand);
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
    gameOver();
    showNewGame();
  }

}
