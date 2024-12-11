let selectedNumbers = [];
let drawnNumbers = [];
let totalNumbers = 76;
let isGameStarted = false;
let winnings = 0;
let betAmount = 10;
let buttons = [];
let resetGridCountdown = 0;

function setupKeno() {
  textAlign(CENTER, CENTER);
  textSize(16);

  resetGame(); // Initialize the game
}

function drawKeno() {
  background(220);

  // Draw grid
  drawNumberButtons();

  

  // Instructions and results
  if (isGameStarted) {
    fill(0);
    textSize(24);
    text("Drawn Numbers: " + drawnNumbers.join(", "), width / 2, height / 2 + 300);
    text("Winnings: $" + winnings, width / 2, height / 2 + 330);
  } else {
    fill(0);
    textSize(24);
    text("Select exactly 3 numbers and press 'Start Game' to play.", width / 2, height / 2 + 300);
    text("Set your bet amount in the top-left.", width / 2, height / 2 + 330);
  }

  // Display money in the top-right corner
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(`Money: $${money}`, width - 100, 100);

  // Bet input label
  fill(0);
  textSize(18);
  textAlign(RIGHT, CENTER);
  text("Start Game for $10", 170, 100);

  // Draw buttons
  drawButton("Start Game", width / 2 - 550, 150, 150, 50);
  drawButton("Reset Grid", width / 2 - 550, 220, 150, 50);
  drawButton("Back", width / 2 - 555, height - 45, 150, 50);
}

function mouseClicked() {
  // Check for button clicks
  if (isButtonClicked(width / 2 - 550, 150, 150, 50)) {
    startGame();
  }
  if (isButtonClicked(width / 2 - 550, 220, 150, 50)) {
    resetGame();
  }
  if (isButtonClicked(width / 2 - 550, height - 45, 150, 50)) {
    backToCasinoKeno();
  }

  // Check for grid clicks
  checkGridClick();
}

function drawNumberButtons() {
  let cols = 10;
  let rows = 8;
  let gridWidth = width - 400; // Centered grid width
  let gridHeight = 500;
  let cellWidth = gridWidth / cols;
  let cellHeight = gridHeight / rows;

  let startX = (width - gridWidth) / 2;
  let startY = (height - gridHeight) / 2 - 50;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let number = i * cols + j + 1;
      let x = startX + j * cellWidth;
      let y = startY + i * cellHeight;

      let color = "white";
      if (selectedNumbers.includes(number)) color = "blue";
      if (drawnNumbers.includes(number)) color = "red";
      if (selectedNumbers.includes(number) && drawnNumbers.includes(number)) color = "green";

      fill(color);
      rect(x, y, cellWidth - 2, cellHeight - 2);
      fill(0);
      textSize(14);
      textAlign(CENTER, CENTER);
      text(number, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}

function checkGridClick() {
  let cols = 10;
  let rows = 8;
  let gridWidth = width - 400; // Centered grid width
  let gridHeight = 500;
  let cellWidth = gridWidth / cols;
  let cellHeight = gridHeight / rows;

  let startX = (width - gridWidth) / 2;
  let startY = (height - gridHeight) / 2 - 50;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let number = i * cols + j + 1;
      let x = startX + j * cellWidth;
      let y = startY + i * cellHeight;

      if (mouseX > x && mouseX < x + cellWidth && mouseY > y && mouseY < y + cellHeight) {
        handleNumberClick(number);
        break;
      }
    }
  }
}

function handleNumberClick(number) {
  if (isGameStarted) return;

  if (selectedNumbers.includes(number)) {
    selectedNumbers = selectedNumbers.filter((n) => n !== number);
  } else if (selectedNumbers.length < 3) {
    selectedNumbers.push(number);
  }
}

function startGame() {
  if (selectedNumbers.length !== 3) {
    alert("Please select exactly 3 numbers to play.");
    return;
  }

  isGameStarted = true;
  drawnNumbers = [];
  for (let i = 0; i < 20; i++) {
    let number;
    do {
      number = floor(random(1, totalNumbers + 1));
    } while (drawnNumbers.includes(number));
    drawnNumbers.push(number);
  }

  calculateWinnings();
}

function calculateWinnings() {
  let matches = selectedNumbers.filter((n) => drawnNumbers.includes(n)).length;

  if (matches === 1) {
    winnings = betAmount; // 1x multiplier
  } else if (matches === 2) {
    winnings = betAmount * 3; // 3x multiplier
  } else if (matches === 3) {
    winnings = betAmount * 10; // 10x multiplier
  } else {
    winnings = 0; // No winnings
  }

  money += winnings - betAmount; // Deduct bet, add winnings
}

function resetGame() {
  selectedNumbers = [];
  drawnNumbers = [];
  isGameStarted = false;
  winnings = 0;
}

function backToCasinoKeno() {
  currentCasinoScreen = "landing";
  kenoInitialized = false;
  removeKenoElements();
}

function removeKenoElements() {
  // Remove all dynamically created buttons and input fields
  selectAll("button").forEach((btn) => btn.remove());
  selectAll("input").forEach((input) => input.remove());
}