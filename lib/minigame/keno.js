// Keno Game Implementation in p5.js
let selectedNumbers = [];
let drawnNumbers = [];
let maxSelection = 3;
let totalNumbers = 80;
let isGameStarted = false;
let winnings = 0;
let betAmount = 10; // Example bet amount

function setupKeno() {
  createCanvas(1280, 720);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function drawKeno() {
  background(220);

  // Draw grid for numbers
  drawKenoGrid();

  if (isGameStarted) {
    // Display drawn numbers
    fill(0);
    text("Drawn Numbers: " + drawnNumbers.join(", "), width / 2, 600);

    // Display winnings
    text("Winnings: $" + winnings, width / 2, 650);
  } else {
    // Display instructions
    fill(0);
    text(
      "Select up to " + maxSelection + " numbers and press Space to start.",
      width / 2,
      650
    );
  }
}

function drawKenoGrid() {
  let cols = 10;
  let rows = 8;
  let gridWidth = width - 100;
  let gridHeight = 500;
  let cellWidth = gridWidth / cols;
  let cellHeight = gridHeight / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let number = i * cols + j + 1;
      let x = 50 + j * cellWidth;
      let y = 50 + i * cellHeight;

      if (selectedNumbers.includes(number)) {
        fill(0, 255, 0); // Highlight selected numbers
      } else {
        fill(255);
      }

      rect(x, y, cellWidth, cellHeight);
      fill(0);
      text(number, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}

function mousePressed() {
  if (isGameStarted) return;

  let cols = 10;
  let rows = 8;
  let gridWidth = width - 100;
  let gridHeight = 500;
  let cellWidth = gridWidth / cols;
  let cellHeight = gridHeight / rows;

  let x = floor((mouseX - 50) / cellWidth);
  let y = floor((mouseY - 50) / cellHeight);
  let number = y * cols + x + 1;

  if (mouseX >= 50 && mouseX < width - 50 && mouseY >= 50 && mouseY < 550) {
    if (selectedNumbers.includes(number)) {
      selectedNumbers = selectedNumbers.filter((n) => n !== number);
    } else if (selectedNumbers.length < maxSelection) {
      selectedNumbers.push(number);
    }
  }
}

function keyPressed() {
  if (key === " " && !isGameStarted && selectedNumbers.length > 0) {
    startGame();
  }
}

function startGame() {
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
}

function resetGame() {
  selectedNumbers = [];
  drawnNumbers = [];
  isGameStarted = false;
  winnings = 0;
}
