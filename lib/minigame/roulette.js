// Global variables for the roulette game
let wheelNumbers = Array.from({ length: 37 }, (_, i) => i); // 0 to 36
let colors = wheelNumbers.map((n) =>
  n === 0 ? "green" : n % 2 === 0 ? "black" : "red"
);
let angle = 0;
let spinning = false;
let targetAngle = 0;
let winnings = 0;
let betAmount = 10;
let betType = null; // Can be 'number', 'red', or 'black'
let betValue = null; // Stores the chosen number or color
let isRouletteActive = false;

// Call this function to set up the roulette game
function setupRouletteGame() {
  createCanvas(800, 600);
  resetRouletteGame();
  isRouletteActive = true; // Marks roulette as the active game
}

// Call this function to play the roulette game
function drawRouletteGame() {
  if (!isRouletteActive) return; // Ensures the game runs only if active

  background(50);
  drawWheel();
  drawBettingArea();
  drawInfo();
  drawBackButton();

  if (spinning) {
    angle += (targetAngle - angle) * 0.05; // Smooth spinning
    if (Math.abs(targetAngle - angle) < 0.01) {
      spinning = false;
      determineResult();
    }
  }
}

// Draw the roulette wheel
function drawWheel() {
  push();
  translate(width / 2, height / 2 - 50);
  rotate(angle);
  for (let i = 0; i < wheelNumbers.length; i++) {
    let start = (TWO_PI / 37) * i;
    let end = (TWO_PI / 37) * (i + 1);
    fill(colors[i]);
    arc(0, 0, 300, 300, start, end, PIE);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    let theta = start + (end - start) / 2;
    let x = cos(theta) * 140;
    let y = sin(theta) * 140;
    text(wheelNumbers[i], x, y);
  }
  pop();
}

// Betting area
function drawBettingArea() {
  fill(200);
  rect(50, height - 150, 700, 100, 10);
  fill(50);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Place Your Bet:", 60, height - 140);

  // Red button
  fill("red");
  rect(60, height - 100, 80, 50);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Red", 100, height - 75);

  // Black button
  fill("black");
  rect(160, height - 100, 80, 50);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Black", 200, height - 75);

  // Number input
  fill(255);
  rect(260, height - 100, 100, 50);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Number", 310, height - 75);

  // Spin button
  fill(0, 200, 0);
  rect(width - 150, height - 100, 120, 50);
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Spin!", width - 90, height - 75);
}

// Display player's money and winnings
function drawInfo() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Money: $${money}`, 50, 20);
  text(`Winnings: $${winnings}`, 50, 50);
}

// Draw the back button
function drawBackButton() {
  fill(200, 50, 50);
  rect(20, 20, 100, 40, 10);
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Back", 70, 40);
}

// Mouse interaction for betting, spinning, and back button
function mousePressed() {
  if (!isRouletteActive) return;

  // Back button logic
  if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 60) {
    isRouletteActive = false; // Deactivate the game
    resetRouletteGame(); // Reset game-specific variables
    return;
  }

  // Bet on red
  if (
    mouseX > 60 &&
    mouseX < 140 &&
    mouseY > height - 100 &&
    mouseY < height - 50
  ) {
    betType = "red";
    betValue = "red";
    winnings = 0;
  }
  // Bet on black
  else if (
    mouseX > 160 &&
    mouseX < 240 &&
    mouseY > height - 100 &&
    mouseY < height - 50
  ) {
    betType = "black";
    betValue = "black";
    winnings = 0;
  }
  // Bet on a specific number
  else if (
    mouseX > 260 &&
    mouseX < 360 &&
    mouseY > height - 100 &&
    mouseY < height - 50
  ) {
    let number = prompt("Enter a number (0-36):");
    if (number !== null && !isNaN(number) && number >= 0 && number <= 36) {
      betType = "number";
      betValue = parseInt(number);
      winnings = 0;
    } else {
      alert("Invalid number!");
    }
  }
  // Spin the wheel
  else if (
    mouseX > width - 150 &&
    mouseX < width - 30 &&
    mouseY > height - 100 &&
    mouseY < height - 50
  ) {
    if (!spinning && betType !== null) {
      money -= betAmount;
      targetAngle = random(TWO_PI); // Random target angle
      spinning = true;
    } else if (betType === null) {
      alert("Place a bet first!");
    }
  }
}

// Determine the result of the spin
function determineResult() {
  let segment = Math.floor((angle % TWO_PI) / (TWO_PI / 37));
  let winningNumber = wheelNumbers[segment];
  let winningColor = colors[segment];

  if (betType === "number" && winningNumber === betValue) {
    winnings = betAmount * 35; // 35x payout for numbers
  } else if (betType === "red" && winningColor === "red") {
    winnings = betAmount * 2; // 2x payout for colors
  } else if (betType === "black" && winningColor === "black") {
    winnings = betAmount * 2; // 2x payout for colors
  } else {
    winnings = 0; // Lose the bet
  }

  money += winnings; // Add winnings to total money
  winnings = 0; // Reset winnings
  betType = null; // Reset bet
  betValue = null;
}

// Reset game variables
function resetRouletteGame() {
  angle = 0;
  spinning = false;
  targetAngle = 0;
  betType = null;
  betValue = null;
  winnings = 0;
}
