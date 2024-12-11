class Hand {
    constructor(x, y, d = false) {
      this.isDealer = d;
      this.cards = [];
      this.x = x;
      this.y = y;
    }

    draw() {
      push(); // Save state for hand drawing

      this.cards.forEach((e, i) => {
        if (this.isDealer && inPlay && i === 0) {
          e.visible = true;
        } else if (this.isDealer && inPlay && i > 0) {
          e.visible = false;
        } else {
          e.visible = true;
        }

        e.x = this.x + i * 60;
        e.y = this.y + i * 20;
        e.draw();
      });

      if (!this.isDealer) {
        let handValue = this.getValue();
        let displayValue = handValue.total;

        if (handValue.aces > 0 && handValue.total <= 21) {
          displayValue = `${handValue.total - 10}/${handValue.total}`;
        }

        fill(255);
        textSize(24);
        textAlign(CENTER);
        text(displayValue, this.x + 120, this.y + 120);
      }

      pop(); // Restore state after hand drawing
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
// money = 2500;
var bet = 0;
var bettingAllowed = true;

function setupBlackJack() {
  // Start with default drawing modes
  push();
  rectMode(CENTER);
  blackJackInit = true;
  deal();
  pop();
}

function drawBlackJack() {
  // Save the drawing state at the start
  push();

  background(180, 0, 0);
  rectMode(CENTER);  // Set mode for cards

  playerHand.draw();
  dealer.draw();

  // Message display
  fill(0);
  textSize(28);
  textAlign(CENTER);
  text(message, width / 2, height / 2);

  // Money and bet display
  textAlign(LEFT);
  text("$: " + Game.player.currency, 20, 40);
  text("Bet: " + bet, 20, 80);
  text("1-5: 100-500", 20, 120);

  // Controls display
  textSize(20);
  text("H: Hit", 20, 400);
  text("S: Stand", 20, 425);
  text("Space: Place Bet/New Hand", 20, 450);

  // Draw back button with proper state management
  drawBackButton();

  // Restore the drawing state
  pop();
}

function keyPressedBlackJack(key) {
  if (key == "72" && inPlay) {
    hit();
  }
  if (key == 83 && inPlay) {
    stand();
  }
  if (key == 32 && bettingAllowed) {
    deal();
  }
  if (bettingAllowed) {
    if (key >= 48 && key <= 53) {
      bet = (key - 48) * 100;
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
    Game.player.currency -= bet;
    inPlay = false;
    bettingAllowed = true;
  }
}

function stand() {
  while (dealer.getValue().total < 17) {
    dealer.addCard(deck.dealCard());
  }

  dealer.cards.forEach((card) => (card.visible = true));

  inPlay = false;
  bettingAllowed = true;

  if (dealer.busted()) {
    message = "Bust! You win!";
    Game.player.currency += bet;
  } else if (playerHand.getValue().total > dealer.getValue().total) {
    message = "You win!";
    Game.player.currency += bet;
  } else if (playerHand.getValue().total == dealer.getValue().total) {
    message = "Tie.";
  } else {
    message = "You lost!";
    Game.player.currency -= bet;
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
function drawBackButton() {
  push();
  // Reset to default drawing modes for the button
  rectMode(CORNER);
  textAlign(LEFT, BASELINE);

  drawButton("Back to Casino", width / 6, height - 45, 200, 50);

  if (mouseIsPressed && !mouseWasPressed) {
    if (isButtonClicked(width / 6, height - 45, 200, 50)) {
      cleanupBlackjack();
      currentCasinoScreen = "landing";
    }
  }
  pop();
}
// Add cleanup function
function cleanupBlackjack() {
  // Reset game state
  deck = new Deck();
  playerHand = new Hand(640, 500);
  dealer = new Hand(640, 200, true);
  inPlay = false;
  message = "Hit or Stand?";
  bet = 0;
  bettingAllowed = true;

  // Reset drawing states
  rectMode(CORNER);
  textAlign(LEFT, BASELINE);

  // Remove any DOM elements if they exist
  selectAll("button").forEach(btn => btn.remove());
  selectAll("input").forEach(input => input.remove());
}
