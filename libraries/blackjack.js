class Hand {
  constructor(x, y, d = false) {
      this.isDealer = d;
      this.cards = [];
      this.x = x;
      this.y = y;
  }

  addCard(card) {
      this.cards.push(card);
  }

  getValue() {
      let total = 0;
      let aces = 0;

      this.cards.forEach((e) => {
          if (!isNaN(e.value)) {
              total += e.value;
          } else if (e.value === "A") {
              total += 11;
              aces += 1;
          } else {
              total += 10;
          }
      });

      while (total > 21 && aces > 0) {
          total -= 10;
          aces -= 1;
      }

      return { total, aces };
  }

  busted() {
      return this.getValue().total > 21;
  }

  draw() {
      this.cards.forEach((e, i) => {
          if (this.isDealer && inPlay && i === 0) {
              e.visible = true;
          } else if (this.isDealer && inPlay && i > 0) {
              e.visible = false;
          } else {
              e.visible = true;
          }

          e.x = this.x + (i * 60);
          e.y = this.y + (i * 20);
          e.draw();
      });

      if (!this.isDealer) {
          let handValue = this.getValue();
          let displayValue = handValue.total;

          if (handValue.aces > 0 && handValue.total <= 21) {
              displayValue = `${handValue.total - 10}/${handValue.total}`;
          }

          push();
          fill(255);
          textSize(24);
          textAlign(CENTER);
          text(displayValue, this.x + 120, this.y + 120);
          pop();
      }
  }
}

class Deck {
  constructor() {
      this.cards = [];
      this.suits = ["s", "c", "d", "h"];
      this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
      this.suits.forEach((s) => {
          this.values.forEach((v) => {
              this.cards.push(createCard(0, 0, s, v));
          });
      });
      this.shuffle();
  }

  shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          let r = Math.floor(Math.random() * (i + 1));
          let temp = this.cards[i];
          this.cards[i] = this.cards[r];
          this.cards[r] = temp;
      }
  }

  dealCard() {
      return this.cards.pop();
  }
}

var deck = new Deck();
var playerHand = new Hand(640, 500);
var dealer = new Hand(640, 200, true);
var inPlay = false;
message = "Hit or Stand?";
money = 2500;
var bet = 0;
var bettingAllowed = true;

function setupBlackJack() {
  rectMode(CENTER);
  deal();
}


function drawBlackJack() {
  background(180, 0, 0);

  playerHand.draw();
  dealer.draw();

  push();
  fill(0);
  textSize(28);
  textAlign(CENTER);
  text(message, width / 2, height / 2);
  pop();

  push();
  fill(0);
  textSize(28);
  textAlign(LEFT);
  text("$: " + money, 20, 40);
  text("Bet: " + bet, 20, 80);
  text("1-5: 100-500", 20, 120);
  pop();

  push()
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("H: Hit", 20, 400);
  text("S: Stand", 20, 425);
  text("Space: Place Bet/New Hand", 20, 450);
  pop();
}

/** @todo @mfwolffe  */
function keyReleasedBlackJack() {
  if (keyCode == 72 && inPlay) {
      hit();
  }
  if (keyCode == 83 && inPlay) {
      stand();
  }
  if (keyCode == 32 && bettingAllowed) {
      deal();
  }
  if (bettingAllowed) {
      if (keyCode >= 48 && keyCode <= 53) {
          bet = (keyCode - 48) * 100;
      }
  }
}

function deal() {
  if (bet === 0) {
      message = "Place your bet before dealing!";
      return;
  }

  inPlay = true;
  bettingAllowed = false;

  if (deck.cards.length < 4) {
      deck = new Deck();
  }

  playerHand.cards = [];
  dealer.cards = [];

  playerHand.addCard(deck.dealCard());
  playerHand.addCard(deck.dealCard());
  dealer.addCard(deck.dealCard());
  dealer.addCard(deck.dealCard());

  message = "Hit or Stay?";
}

function hit() {
  if (deck.cards.length < 1) {
      deck = new Deck();
  }

  playerHand.addCard(deck.dealCard());

  if (playerHand.busted()) {
      message = "You took an L!";
      money -= bet;
      inPlay = false;
      bettingAllowed = true;
  }
}

function stand() {
  while (dealer.getValue().total < 17) {
      dealer.addCard(deck.dealCard());
  }

  dealer.cards.forEach(card => card.visible = true);

  inPlay = false;
  bettingAllowed = true;

  if (dealer.busted()) {
      message = "Bust! You win!";
      money += bet;
  } else if (playerHand.getValue().total > dealer.getValue().total) {
      message = "You win!";
      money += bet;
  } else if (playerHand.getValue().total == dealer.getValue().total) {
      message = "Tie.";
  } else {
      message = "You lost!";
      money -= bet;
  }
}

function createCard(x, y, s, v) {
  return {
      x: x,
      y: y,
      suit: s,
      value: v,
      visible: false,
      color: undefined,
      draw: function() {
          this.setColor();
          if (this.visible) {
              fill("white");
              rect(this.x, this.y, 80, 106);
              fill(this.color);
              textSize(20);
              text(this.value, this.x - 30, this.y - 30);
              text(this.value, this.x + 20, this.y + 40);

              if (this.suit == "d") {
                  push();
                  noStroke();
                  translate(this.x, this.y);
                  rotate(PI / 4);
                  rect(0, 0, 15, 15);
                  pop();
              } else if (this.suit == "h") {
                  push();
                  noStroke();
                  translate(this.x, this.y);
                  rotate(PI / 4);
                  rect(0, 0, 15, 15);
                  ellipse(-7, 0, 15, 15);
                  ellipse(0, -7, 15, 15);
                  pop();
              } else if (this.suit == "s") {
                  push();
                  noStroke();
                  translate(this.x, this.y);
                  triangle(0, 0, 5, 20, -5, 20);
                  rotate(PI / 4);
                  rect(0, 0, 15, 15);
                  ellipse(7, 0, 15, 15);
                  ellipse(0, 7, 15, 15);
                  pop();
              } else if (this.suit == "c") {
                  push();
                  fill(0);
                  translate(this.x, this.y);
                  triangle(0, 0, 5, 20, -5, 20);
                  ellipse(7, 7, 15, 15);
                  ellipse(0, -3, 15, 15);
                  ellipse(-7, 7, 15, 15);
                  pop();
              }
          } else {
              fill("gray");
              rect(this.x, this.y, 80, 106);
          }
      },
      setColor: function() {
          this.color = (this.suit == "d" || this.suit == "h") ? "red" : "black";
      }
  }
}