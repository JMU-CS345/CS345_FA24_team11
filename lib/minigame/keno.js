let selectedNumbers = [];
let drawnNumbers = [];
let totalNumbers = 76;
let isGameStarted = false;
let winnings = 0;
let betAmount = 10; // Example bet amount
let buttons = []; // Array to store button objects
let startButton, resetButton;
let betInput;

function setupKeno() {
  // Create the canvas
  createCanvas(1280, 720);
  textAlign(CENTER, CENTER);
  textSize(16);

  // Create number buttons
  createNumberButtons();

  // Create input for bet amount
  betInput = createInput(betAmount.toString());
  betInput.position(width / 2 - 500, height / 2 - 230); // Top-left of the grid
  betInput.size(100);
  betInput.input(() => {
    const inputVal = parseInt(betInput.value());
    if (!isNaN(inputVal) && inputVal > 0) {
      betAmount = inputVal;
    }
  });

  // Create the "Start Game" button
  startButton = createButton("Start Game");
  startButton.position(width / 2 - 500, height / 2 - 200); // Below bet amount input
  startButton.size(100, 40);
  startButton.mousePressed(() => {
    if (!isGameStarted && selectedNumbers.length === 3) {
      startGame();
    } else {
      alert("Please select exactly 3 numbers to play.");
    }
  });

  // Create the "Reset Grid" button
  resetButton = createButton("Reset Grid");
  resetButton.position(width / 2 - 500, height / 2 - 150); // Below the start button
  resetButton.size(100, 40);
  resetButton.mousePressed(() => resetGame());

  resetGame();
}

function drawKeno() {
  background(220);

  

  if (isGameStarted) {
    // Display drawn numbers and winnings below the grid
    fill(0);
    textSize(20);
    text("Drawn Numbers: " + drawnNumbers.join(", "), width / 2, height / 2 + 300);
    text("Winnings: $" + winnings, width / 2, height / 2 + 330);
  } else {
    // Display instructions below the grid
    fill(0);
    textSize(20);
    text("Select exactly 3 numbers and press 'Start Game' to play.", width / 2, height / 2 + 300);
    text("Set your bet amount in the top-left.", width / 2, height / 2 + 330);
  }
  
  // Display Money Counter
  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text(`Money: $${money}`, width / 2 + 450, height / 2 - 250); // Top-right of the grid

  // Text to explain the bet amount field
  textSize(14);
  textAlign(RIGHT);
  text("Place Bet Amount", width / 2 - 502, height / 2 - 305);

  drawButton("Back to Casino", width / 2 - 535, height - 45, 200, 50);

  if (!mouseIsPressed || isGameStarted) return;
  if (isButtonClicked(width / 2 - 535, height - 45, 200, 50)) {
    currentCasinoScreen = "landing";
    kenoInitialized = false;
    removeKenoElements(); // Clean up Keno elements
  }
}



function createNumberButtons() {
  let cols = 10;
  let rows = 8;
  let gridWidth = width - 400; // Centered grid width
  let gridHeight = 500;
  let cellWidth = gridWidth / cols;
  let cellHeight = gridHeight / rows;

  let startX = width / 2 - 330; // Start horizontally centered
  let startY = height / 2 - 290; // Adjust vertical positioning

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let number = i * cols + j + 1;
      let x = startX + j * cellWidth;
      let y = startY + i * cellHeight;

      let button = createButton(number.toString());
      button.position(x, y);
      button.size(cellWidth, cellHeight);
      button.style("background-color", "white");
      button.style("border", "1px solid black");
      button.mousePressed(() => handleNumberClick(number, button));
      buttons.push(button);
    }
  }
}

function handleNumberClick(number, button) {
  if (isGameStarted) return;

  if (selectedNumbers.includes(number)) {
    // Deselect the number
    selectedNumbers = selectedNumbers.filter((n) => n !== number);
    button.style("background-color", "white");
  } else if (selectedNumbers.length < 3) {
    // Select the number
    selectedNumbers.push(number);
    button.style("background-color", "blue"); // Change to blue when selected
  }

  // Ensure only 3 numbers are selected
  if (selectedNumbers.length === 3) {
    for (let btn of buttons) {
      if (!selectedNumbers.includes(parseInt(btn.elt.innerHTML))) {
        btn.attribute("disabled", "true"); // Disable unselected buttons
      }
    }
  } else {
    for (let btn of buttons) {
      btn.removeAttribute("disabled");
    }
  }
}

function startGame() {
  isGameStarted = true;
  drawnNumbers = [];
  for (let i = 0; i < 17; i++) {
    let number;
    do {
      number = floor(random(1, totalNumbers + 1));
    } while (drawnNumbers.includes(number));
    drawnNumbers.push(number);
  }

  drawnNumbers.push(77);
  drawnNumbers.push(78);
  drawnNumbers.push(79);

  highlightDrawnNumbers();
  calculateWinnings();
}

function highlightDrawnNumbers() {
  for (let btn of buttons) {
    let number = parseInt(btn.elt.innerHTML);
    if (selectedNumbers.includes(number) && drawnNumbers.includes(number)) {
      // Selected and drawn numbers are green
      btn.style("background-color", "green");
    } else if (drawnNumbers.includes(number)) {
      // Only drawn numbers are red
      btn.style("background-color", "red");
    } else if (selectedNumbers.includes(number)) {
      // Only selected numbers are blue
      btn.style("background-color", "blue");
    }
  }
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

  // Adjust money
  money += winnings - betAmount; // Deduct the bet and add winnings
}


function resetGame() {
  selectedNumbers = [];
  drawnNumbers = [];
  isGameStarted = false;
  winnings = 0;

  // Reset all buttons
  for (let btn of buttons) {
    btn.style("background-color", "white");
    btn.removeAttribute("disabled");
  }
}

function removeKenoElements() {
  // Remove all dynamically created buttons and input fields
  selectAll("button").forEach((btn) => btn.remove());
  selectAll("input").forEach((input) => input.remove());
}
