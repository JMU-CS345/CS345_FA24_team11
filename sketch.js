// Hand class
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

        // Calculate total and count Aces
        this.cards.forEach((e) => {
            if (!isNaN(e.value)) {
                total += e.value;
            } else if (e.value === "A") {
                total += 11; // Initially count Ace as 11
                aces += 1;   // Increment the Ace count
            } else {
                total += 10; // Face cards add 10
            }
        });

        // Adjust for Aces if total exceeds 21
        while (total > 21 && aces > 0) {
            total -= 10; // Count Ace as 1 instead of 11
            aces -= 1;
        }

        return total;
    }

    busted() {
        return this.getValue() > 21;
    }

    draw() {
        this.cards.forEach((e, i) => {
            // Show only the first card for the dealer when in play
            if (this.isDealer && inPlay && i === 0) {
                e.visible = true;
            } else if (this.isDealer && inPlay && i > 0) {
                e.visible = false;
            } else {
                e.visible = true;
            }

            e.x = this.x + (i * 28);
            e.y = this.y + (i * 10);
            e.draw();
        });
    }
}

// Deck class
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

// Global variables
var deck = new Deck();
var player = new Hand(300, 200);
var dealer = new Hand(300, 100, true);
var inPlay = false;
var message = "Hit or Stand?";
var money = 2500;
var bet = 0;
var bettingAllowed = true; // Controls if betting is allowed

// p5.js setup function
function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
    deal();
}

// p5.js draw function
function draw() {
    background(180, 0, 0);

    // Draw player's hand
    player.draw();

    // Draw dealer's hand
    dealer.draw();

    // Display message
    push();
    fill(0);
    textSize(22);
    text(message, 100, 200);
    pop();

    // Display money and bet
    push();
    fill(0);
    textSize(22);
    text("$: " + money, 5, 30);
    text("Bet: " + bet, 5, 50);
    pop();
}

// Key control function
function keyPressed() {
    if (keyCode == 72 && inPlay) { // H key for hit
        hit();
    }
    if (keyCode == 83 && inPlay) { // S key for stand
        stand();
    }
    if (keyCode == 32 && bettingAllowed) { // Spacebar to deal
        deal();
    }
    if (bettingAllowed) { // Allow betting only if bettingAllowed is true
        if (keyCode >= 48 && keyCode <= 53) { // Number keys for betting
            bet = (keyCode - 48) * 100;
        }
    }
}

// Deal function
function deal() {
    if (bet === 0) {
        message = "Place your bet before dealing!";
        return;
    }

    inPlay = true;
    bettingAllowed = false; // Lock betting once a hand starts

    if (deck.cards.length < 4) {
        deck = new Deck();
    }

    // Reset player and dealer hands
    player.cards = [];
    dealer.cards = [];

    // Deal two cards to each
    player.addCard(deck.dealCard());
    player.addCard(deck.dealCard());
    dealer.addCard(deck.dealCard());
    dealer.addCard(deck.dealCard());

    message = "Hit or Stay?";
}

// Hit function
function hit() {
    if (deck.cards.length < 1) {
        deck = new Deck();
    }

    player.addCard(deck.dealCard());

    if (player.busted()) {
        message = "You took an L!";
        inPlay = false;
        bettingAllowed = true; // Unlock betting when round ends
    }
}

// Stand function
function stand() {
    while (dealer.getValue() < 17) {
        dealer.addCard(deck.dealCard());
    }

    // Reveal dealer's hidden card
    dealer.cards.forEach(card => card.visible = true);

    inPlay = false; // End the round
    bettingAllowed = true; // Unlock betting when round ends

    // Check the outcome of the game
    if (dealer.busted()) {
        message = "Bust! You win!";
        money += bet;
    } else if (player.getValue() > dealer.getValue()) {
        message = "You win!";
        money += bet;
    } else if (player.getValue() == dealer.getValue()) {
        message = "Tie.";
    } else {
        message = "You lost!";
        money -= bet;
    }
}

// Card creation function
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
                rect(this.x, this.y, 50, 66);
                fill(this.color);
                text(this.value, this.x - 20, this.y - 20);
                text(this.value, this.x + 10, this.y + 30);

                // Draw suit symbols
                if (this.suit == "d") { // Diamonds
                    push();
                    noStroke();
                    translate(this.x, this.y);
                    rotate(PI / 4);
                    rect(0, 0, 10, 10);
                    pop();
                } else if (this.suit == "h") { // Hearts
                    push();
                    noStroke();
                    translate(this.x, this.y);
                    rotate(PI / 4);
                    rect(0, 0, 10, 10);
                    ellipse(-5, 0, 10, 10);
                    ellipse(0, -5, 10, 10);
                    pop();
                } else if (this.suit == "s") { // Spades
                    push();
                    noStroke();
                    translate(this.x, this.y);
                    triangle(0, 0, 3, 13, -3, 13);
                    rotate(PI / 4);
                    rect(0, 0, 10, 10);
                    ellipse(5, 0, 10, 10);
                    ellipse(0, 5, 10, 10);
                    pop();
                } else if (this.suit == "c") { // Clubs
                    push();
                    fill(0);
                    translate(this.x, this.y);
                    triangle(0, 0, 3, 13, -3, 13);
                    ellipse(5, 5, 10, 10);
                    ellipse(0, -2, 10, 10);
                    ellipse(-5, 5, 10, 10);
                    pop();
                }
            } else {
                fill("gray");
                rect(this.x, this.y, 50, 66); // Hidden card
            }
        },
        setColor: function() {
            this.color = (this.suit == "d" || this.suit == "h") ? "red" : "black";
        }
    }
}
