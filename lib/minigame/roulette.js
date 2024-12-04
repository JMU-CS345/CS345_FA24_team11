// Roulette Game Variables
let rouletteNumbers = Array.from({ length: 37 }, (_, i) => i);
let rouletteColors = rouletteNumbers.map((n) =>
  n === 0 ? "green" : n % 2 === 0 ? "black" : "red"
);
let rouletteAngle = 0;
let rouletteSpinning = false;
let targetRouletteAngle = 0;
let spinSpeed = 0.1;
let betType = null;
let betValue = null; 
let rouletteMoney = 100;
let rouletteBetAmount = 10;
let resultMessage = "Place your bet and spin the wheel!";
let winnerMessage = "";
let resetting = false; 
let randomSeedOffset = 0;
let colors;
let showNumberPrompt = false;
let mouseWasPressed = false;

function drawRouletteControls() {
  if (resetting || rouletteSpinning) return;

  let centerX = width / 2;
  let baseY = height - 80;

  // Draw all buttons but handle clicks separately
  drawButton("Bet Red", centerX - 160, baseY, 80, 40, color(220, 38, 38));
  drawButton("Bet Black", centerX - 60, baseY, 80, 40, color(0));
  drawButton("Bet Number", centerX + 40, baseY, 80, 40, color(75, 85, 99));
  drawButton("SPIN", centerX + 140, baseY, 80, 40, color(34, 197, 94));
}

// Add this new function to handle button clicks
function handleRouletteButtonClicks() {
  if (!mouseIsPressed || resetting || rouletteSpinning) return;
  
  let centerX = width / 2;
  let baseY = height - 80;

  if (isButtonClicked(centerX - 160, baseY, 80, 40)) {
    placeRouletteBet("red");
  } else if (isButtonClicked(centerX - 60, baseY, 80, 40)) {
    placeRouletteBet("black");
  } else if (isButtonClicked(centerX + 40, baseY, 80, 40)) {
    showNumberPrompt = true;
  } else if (isButtonClicked(centerX + 140, baseY, 80, 40)) {
    spinRouletteWheel();
  }
}

// Add this function to handle the number prompt
function handleNumberPrompt() {
  if (!showNumberPrompt) return;
  
  let number = prompt("Enter a number between 0 and 36:");
  showNumberPrompt = false;
  
  if (number !== null && !isNaN(number) && number >= 0 && number <= 36) {
    placeRouletteBet("number", parseInt(number));
  } else {
    resultMessage = "Invalid number. Please try again.";
  }
}

function setupRouletteGame() {
  removeRouletteElements(); // Clean up any existing elements
  rouletteAngle = 0;
  rouletteSpinning = false;
  targetRouletteAngle = 0;
  spinSpeed = 0.1;
  betType = null;
  betValue = null;
  resultMessage = "Place your bet and spin the wheel!";
  winnerMessage = ""; 
  rouletteBetAmount = 10;
  resetting = false;
  randomSeedOffset += 1;
}

function drawRouletteGame() {
  // Clear any existing elements when switching screens
  // Initialize colors at the start
  colors = {
    background: color(31, 41, 55),
    machine: color(55, 65, 81),
    display: color(17, 24, 39),
    slot: color(255),
    button: color(220, 38, 38),
    buttonHover: color(185, 28, 28),
    text: color(255)
  };
  if (!rouletteInitialized) {
    removeRouletteElements();
    rouletteInitialized = true;
  }

  background(colors.background);
  
  // Draw machine background
  fill(colors.machine);
  noStroke();
  rect(width/2 - 200, height/2 - 250, 400, 500, 20);
  
  // Draw display panel
  fill(colors.display);
  rect(width/2 - 180, height/2 + 120, 360, 100, 10);
  
  drawRouletteWheel();
  drawRouletteIndicator();
  drawRouletteControls();
  drawRouletteInfo();

  // Handle button clicks
  if (mouseIsPressed && !mouseWasPressed) {
    handleRouletteButtonClicks();
    if (showNumberPrompt) {
      handleNumberPrompt();
    }
  }
  mouseWasPressed = mouseIsPressed;


  
  if (rouletteSpinning) {
    rouletteAngle += spinSpeed;
    spinSpeed *= 0.99; 
    if (spinSpeed < 0.01) {
      spinSpeed = 0;
      rouletteSpinning = false;
      determineRouletteResult();
    }
  }
  // In drawRouletteGame()
drawButton("Back to Casino", width / 6, height - 45, 200, 50);
if (!mouseIsPressed || resetting || rouletteSpinning) return; // Add this check
if (isButtonClicked(width / 6, height - 45, 200, 50)) {
  currentCasinoScreen = "landing";
  rouletteInitialized = false;
  removeRouletteElements();
}
}

function drawRouletteWheel() {
  push();
  translate(width / 2, height / 2 - 50);
  
  // Draw wheel border
  stroke(colors.slot);
  strokeWeight(3);
  fill(colors.machine);
  circle(0, 0, 320);
  
  // Draw wheel segments
  rotate(rouletteAngle % TWO_PI);
  noStroke();
  for (let i = 0; i < rouletteNumbers.length; i++) {
    let start = (TWO_PI / 37) * i;
    let end = (TWO_PI / 37) * (i + 1);
    
    // Enhanced colors with slight transparency
    let segmentColor;
    if (rouletteColors[i] === "red") {
      segmentColor = color(220, 38, 38, 240);
    } else if (rouletteColors[i] === "black") {
      segmentColor = color(0, 0, 0, 240);
    } else {
      segmentColor = color(34, 197, 94, 240);
    }
    
    fill(segmentColor);
    arc(0, 0, 300, 300, start, end, PIE);
    
    // Numbers
    fill(colors.text);
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let theta = start + (end - start) / 2;
    let x = cos(theta) * 140;
    let y = sin(theta) * 140;
    text(rouletteNumbers[i], x, y);
  }
  
  // Center decoration
  fill(colors.slot);
  circle(0, 0, 40);
  fill(colors.machine);
  circle(0, 0, 20);
  pop();
}

function drawRouletteIndicator() {
  push();
  translate(width / 2, height / 2 - 220);
  
  // Shadow effect
  fill(0, 0, 0, 50);
  triangle(-12, 2, 12, 2, 0, 22);
  
  fill(colors.button);
  stroke(colors.slot);
  strokeWeight(2);
  triangle(-10, 0, 10, 0, 0, 20);
  pop();
}

// function drawRouletteControls() {
//   if (resetting || rouletteSpinning) return;

//   let centerX = width / 2;
//   let baseY = height - 80;

//   // Bet Red button
//   if (isButtonClicked(centerX - 160, baseY, 80, 40)) {
//     placeRouletteBet("red");
//   }
//   drawButton("Bet Red", centerX - 160, baseY, 80, 40, color(220, 38, 38));

//   // Bet Black button
//   if (isButtonClicked(centerX - 60, baseY, 80, 40)) {
//     placeRouletteBet("black");
//   }
//   drawButton("Bet Black", centerX - 60, baseY, 80, 40, color(0));

//   // Bet Number button
//   if (isButtonClicked(centerX + 40, baseY, 80, 40)) {
//     let number = prompt("Enter a number between 0 and 36:");
//     if (number !== null && !isNaN(number) && number >= 0 && number <= 36) {
//       placeRouletteBet("number", parseInt(number));
//     } else {
//       resultMessage = "Invalid number. Please try again.";
//     }
//   }
//   drawButton("Bet Number", centerX + 40, baseY, 80, 40, color(75, 85, 99));

//   // Spin button
//   if (isButtonClicked(centerX + 140, baseY, 80, 40)) {
//     spinRouletteWheel();
//   }
//   drawButton("SPIN", centerX + 140, baseY, 80, 40, color(34, 197, 94));
// }

function drawRouletteInfo() {
  // Money display
  fill(colors.display);
  stroke(colors.slot);
  strokeWeight(2);
  rect(20, 20, 150, 40, 5);
  
  // Text
  noStroke();
  fill(colors.text);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`$${rouletteMoney}`, 35, 40);

  // Messages
  textAlign(CENTER);
  textSize(18);
  fill(colors.text);
  text(resultMessage, width / 2, height / 2 + 150);
  
  textSize(24);
  textStyle(BOLD);
  if (winnerMessage.includes("WIN")) {
    fill(34, 197, 94);
  } else {
    fill(colors.text);
  }
  text(winnerMessage, width / 2, height / 2 + 190);
  textStyle(NORMAL);
}

function placeRouletteBet(type, value = null) {
  if (rouletteBetAmount > rouletteMoney) {
    resultMessage = "Insufficient funds!";
    return;
  }
  betType = type;
  betValue = value;
  resultMessage = `Bet placed: ${type}${value !== null ? ` ${value}` : ""}`;
}

function spinRouletteWheel() {
  if (betType === null) {
    resultMessage = "Place a bet first!";
    return;
  }

  rouletteMoney -= rouletteBetAmount;
  const winningSegment = floor(random(37) + randomSeedOffset);
  const segmentAngle = TWO_PI / 37;

  targetRouletteAngle =
    segmentAngle * winningSegment + TWO_PI * floor(random(5, 10));
  spinSpeed = 0.3;
  rouletteSpinning = true;

  rouletteWinningSegment = winningSegment % 37;
}

function determineRouletteResult() {
  const winningSegment = rouletteWinningSegment;
  const winningNumber = rouletteNumbers[winningSegment];
  const winningColor = rouletteColors[winningSegment];

  if (betType === "number" && betValue === winningNumber) {
    rouletteMoney += rouletteBetAmount * 35;
    resultMessage = `Winning number: ${winningNumber} (${winningColor}). You won $${
      rouletteBetAmount * 35
    }!`;
    winnerMessage = "You WIN!";
  } else if (betType === "red" && winningColor === "red") {
    rouletteMoney += rouletteBetAmount * 2;
    resultMessage = `Winning number: ${winningNumber} (${winningColor}). You won $${
      rouletteBetAmount * 2
    }!`;
    winnerMessage = "You WIN!";
  } else if (betType === "black" && winningColor === "black") {
    rouletteMoney += rouletteBetAmount * 2;
    resultMessage = `Winning number: ${winningNumber} (${winningColor}). You won $${
      rouletteBetAmount * 2
    }!`;
    winnerMessage = "You WIN!";
  } else {
    resultMessage = `Winning number: ${winningNumber} (${winningColor}). You lost.`;
    winnerMessage = "Better luck next time!";
  }

  resetting = true;
  setTimeout(() => {
    setupRouletteGame();
  }, 3000);
}

function removeRouletteElements() {
  // Remove any existing buttons or elements
  selectAll("button").forEach((btn) => btn.remove());
  selectAll("input").forEach((input) => input.remove());
}