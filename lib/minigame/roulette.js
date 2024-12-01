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


function setupRouletteGame() {
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
  background(50, 50, 150); 
  drawRouletteWheel();
  drawRouletteIndicator();
  drawRouletteControls();
  drawRouletteInfo();
  backToCasino();
  if (rouletteSpinning) {
    rouletteAngle += spinSpeed;
    spinSpeed *= 0.99; 
    if (spinSpeed < 0.01) {
      spinSpeed = 0;
      rouletteSpinning = false;
      determineRouletteResult();
    }
  }
}
function drawRouletteWheel() {
  push();
  translate(width / 2, height / 2 - 50);
  rotate(rouletteAngle % TWO_PI);
  for (let i = 0; i < rouletteNumbers.length; i++) {
    let start = (TWO_PI / 37) * i;
    let end = (TWO_PI / 37) * (i + 1);
    fill(
      rouletteColors[i] === "red"
        ? "red"
        : rouletteColors[i] === "black"
        ? "black"
        : "green"
    );
    arc(0, 0, 300, 300, start, end, PIE);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    let theta = start + (end - start) / 2;
    let x = cos(theta) * 140;
    let y = sin(theta) * 140;
    text(rouletteNumbers[i], x, y);
  }
  pop();
}

function drawRouletteIndicator() {
  push();
  translate(width / 2, height / 2 - 220); 
  fill(255, 0, 0); 
  triangle(-10, 0, 10, 0, 0, 20); 
  pop();
}

function drawRouletteControls() {
  if (resetting || rouletteSpinning) return;

  let centerX = width / 2;
  let baseY = height - 80;

  let betRedButton = createButton("Bet Red");
  betRedButton.position(centerX - 160, baseY);
  betRedButton.style("background-color", "red");
  betRedButton.style("color", "white");
  betRedButton.mousePressed(() => placeRouletteBet("red"));

  let betBlackButton = createButton("Bet Black");
  betBlackButton.position(centerX - 60, baseY);
  betBlackButton.style("background-color", "black");
  betBlackButton.style("color", "white");
  betBlackButton.mousePressed(() => placeRouletteBet("black"));

  let betNumberButton = createButton("Bet Number");
  betNumberButton.position(centerX + 40, baseY);
  betNumberButton.style("background-color", "#cccccc");
  betNumberButton.mousePressed(() => {
    let number = prompt("Enter a number between 0 and 36:");
    if (number !== null && !isNaN(number) && number >= 0 && number <= 36) {
      placeRouletteBet("number", parseInt(number));
    } else {
      resultMessage = "Invalid number. Please try again.";
    }
  });

  let spinButton = createButton("Spin");
  spinButton.position(centerX + 140, baseY);
  spinButton.style("background-color", "green");
  spinButton.style("color", "white");
  spinButton.mousePressed(() => spinRouletteWheel());
}

function drawRouletteInfo() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Money: $${rouletteMoney}`, 20, 40);

  textAlign(CENTER);
  textSize(18);
  text(resultMessage, width / 2, height / 2 + 150);
  textSize(24);
  text(winnerMessage, width / 2, height / 2 + 190);
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
  selectAll("button").forEach((btn) => btn.remove());
  selectAll("input").forEach((input) => input.remove());
}
