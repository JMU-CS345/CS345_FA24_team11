let deckA = [];
let currentCard, comparisonCard;
let globalMoney = 100;
let winnings = 0;
let betAmount = 10;
let highLowMessage = "Set your bet and click 'Lock Bet' before choosing.";
let gameActive = false;
let betLocked = false;
let roundEnded = false;
let buttonsCreated = false;

function setup() {
  createCanvas(800, 600); // Canvas size for the casino game
  setupHighLowGame();
}

function setupHighLowGame() {
  deckA = createdeckA();
  currentCard = drawCard();
  comparisonCard = null;
  winnings = 0;
  highLowMessage = "Set your bet and click 'Lock Bet' before choosing.";
  gameActive = true;
  betLocked = false;
  roundEnded = false;
  buttonsCreated = false;
}

function createdeckA() {
  let suits = ["hearts", "diamonds", "clubs", "spades"];
  let values = Array.from({ length: 13 }, (_, i) => i + 1);
  let newdeckA = [];

  for (let suit of suits) {
    for (let value of values) {
      newdeckA.push({ suit, value });
    }
  }
  return shuffle(newdeckA);
}

function shuffle(deckA) {
  for (let i = deckA.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckA[i], deckA[j]] = [deckA[j], deckA[i]];
  }
  return deckA;
}

function drawCard() {
  return deckA.pop();
}

function displayCard(card) {
  let valueDisplay = card.value;
  if (card.value === 1) valueDisplay = "Ace";
  else if (card.value === 11) valueDisplay = "Jack";
  else if (card.value === 12) valueDisplay = "Queen";
  else if (card.value === 13) valueDisplay = "King";
  return `${valueDisplay} of ${card.suit}`;
}

function draw() {
  drawHighLowGame();
}

function drawHighLowGame() {

  backToCasino();
  background(34, 139, 34); // Green casino-style background
  textSize(24);
  fill(255); // White text color
  textAlign(LEFT);
  text("Money: $" + globalMoney, 20, 40);
  text("Winnings: $" + winnings, 20, 70);

  textAlign(CENTER);
  fill(255);

  if (gameActive) {
    textSize(36);
    textStyle(BOLD);
    text(displayCard(currentCard), width / 2, height / 2 - 100);

    textSize(18);
    textStyle(NORMAL);
    text("Bet Amount: $" + betAmount, width / 2, height / 2);
    text(highLowMessage, width / 2, height / 2 + 50);

    if (!buttonsCreated) {
      setupButtons();
      buttonsCreated = true;
    }
  } else {
    text("Game Over! Please restart to play again.", width / 2, height / 2);
  }
}

function setupButtons() {
  // Higher Button
  let higherButton = createButton("Higher");
  higherButton.position(width / 2 - 150, height / 2 + 120);
  higherButton.style("color", "#fff");
  higherButton.style("background-color", "#c71585");
  higherButton.style("border", "none");
  higherButton.style("padding", "10px 20px");
  higherButton.style("border-radius", "5px");
  higherButton.style("font-size", "18px");
  higherButton.mousePressed(() => makeGuess("higher"));

  // Lower Button
  let lowerButton = createButton("Lower");
  lowerButton.position(width / 2 + 50, height / 2 + 120);
  lowerButton.style("color", "#fff");
  lowerButton.style("background-color", "#c71585");
  lowerButton.style("border", "none");
  lowerButton.style("padding", "10px 20px");
  lowerButton.style("border-radius", "5px");
  lowerButton.style("font-size", "18px");
  lowerButton.mousePressed(() => makeGuess("lower"));

  // Lock Bet Button
  let lockBetButton = createButton("Lock Bet");
  lockBetButton.position(width / 2 - 50, height / 2 + 180);
  lockBetButton.style("color", "#fff");
  lockBetButton.style("background-color", "#c71585");
  lockBetButton.style("border", "none");
  lockBetButton.style("padding", "10px 20px");
  lockBetButton.style("border-radius", "5px");
  lockBetButton.style("font-size", "18px");
  lockBetButton.mousePressed(() => lockBet());

  // Cash Out Button
  let cashOutButton = createButton("Cash Out");
  cashOutButton.position(width / 2 - 50, height / 2 + 240);
  cashOutButton.style("color", "#fff");
  cashOutButton.style("background-color", "#c71585");
  cashOutButton.style("border", "none");
  cashOutButton.style("padding", "10px 20px");
  cashOutButton.style("border-radius", "5px");
  cashOutButton.style("font-size", "18px");
  cashOutButton.mousePressed(() => cashOut());

  // Bet Amount Input
  let betInput = createInput("10");
  betInput.position(width / 2 - 25, height / 2 + 300);
  betInput.style("padding", "8px");
  betInput.style("font-size", "18px");
  betInput.style("width", "50px");
  betInput.style("text-align", "center");
  betInput.style("border-radius", "5px");
  betInput.input(() => {
    let value = parseInt(betInput.value());
    if (value > 0 && value <= globalMoney) {
      betAmount = value;
    } else {
      betInput.value(betAmount);
    }
  });
}

function lockBet() {
  if (betAmount > globalMoney) {
    highLowMessage = "Insufficient funds for this bet!";
  } else {
    betLocked = true;
    highLowMessage = "Bet locked! Now choose Higher or Lower.";
  }
}

function makeGuess(choice) {
  if (!betLocked) {
    highLowMessage = "Please lock in your bet first.";
    return;
  }

  comparisonCard = drawCard();
  roundEnded = true;

  const currentCardText = displayCard(currentCard);
  const comparisonCardText = displayCard(comparisonCard);

  if (
    (choice === "higher" && comparisonCard.value > currentCard.value) ||
    (choice === "lower" && comparisonCard.value < currentCard.value)
  ) {
    winnings += betAmount;
    highLowMessage = `${comparisonCardText} is ${
      choice === "higher" ? "higher than" : "lower than"
    } ${currentCardText}. You won!`;
  } else {
    globalMoney -= winnings + betAmount;
    winnings = 0;
    highLowMessage = `${comparisonCardText} is not ${
      choice === "higher" ? "higher than" : "lower than"
    } ${currentCardText}. You lost your winnings.`;
  }

  currentCard = comparisonCard;
  comparisonCard = null;

  betLocked = false;
  roundEnded = false;
}

function cashOut() {
  globalMoney += winnings;
  winnings = 0;
  setupHighLowGame();
}
