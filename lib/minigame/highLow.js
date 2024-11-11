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

function drawHighLowGame() {
  background(255);
  textSize(24);
  textAlign(LEFT);
  text(`Money: $${globalMoney}`, 10, 30);
  text(`Winnings: $${winnings}`, 10, 60);

  textAlign(CENTER);

  if (gameActive) {
    textSize(36);
    textStyle(BOLD);
    text(displayCard(currentCard), width / 2, height / 2 - 100);

    textSize(18);
    textStyle(NORMAL);

    text(`Bet Amount: $${betAmount}`, width / 2, height / 2);
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
  let higherButton = createButton("Higher");
  higherButton.position(width / 2 - 100, height / 2 + 100);
  higherButton.mousePressed(() => makeGuess("higher"));

  let lowerButton = createButton("Lower");
  lowerButton.position(width / 2 + 100, height / 2 + 100);
  lowerButton.mousePressed(() => makeGuess("lower"));

  let lockBetButton = createButton("Lock Bet");
  lockBetButton.position(width / 2, height / 2 + 150);
  lockBetButton.mousePressed(() => lockBet());

  let cashOutButton = createButton("Cash Out");
  cashOutButton.position(width / 2, height / 2 + 200);
  cashOutButton.mousePressed(() => cashOut());

  let betInput = createInput("10");
  betInput.position(width / 2 - 50, height / 2 + 250);
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