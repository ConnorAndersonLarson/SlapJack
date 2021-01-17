class Player {
  constructor(name){
    this.name = name,
    this.hand = [],
    this.wins = 0
  }

  saveWinsToStorage() {
    this.wins+=1;
    localStorage.setItem(`${this.name}`, JSON.stringify(this.wins))
  }

  playCard() {
    var drawnCard = this.hand.splice(0,1);
    return drawnCard[0];
  }

}
