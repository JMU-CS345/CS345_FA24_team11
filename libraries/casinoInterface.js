let blackjackButton, highLowButton, rouletteButton, slotsButton, storeButton;
let buttonWidth, buttonHeight, currentCasinoScreen;
let highLowInitialized = false;
let blackJackInitialized = false;

function preloadCasino() {
  buttonWidth = 200; // Define the width of each button
  buttonHeight = 100; // Define the height of each button
  currentCasinoScreen = "landing";
  // hideButtons();
}

// const buttonWidth = 200; // Define the width of each button
// const buttonHeight = 100; // Define the height of each button

function setupCasinoUI() {
  const centerY = height / 2; // Vertical center
  const spacing = 220; // Horizontal spacing between buttons

  drawButton("Blackjack", width / 2 - 1.5 * spacing, centerY, 200, 80);
  drawButton("High-Low", width / 2 - 0.5 * spacing, centerY, 200, 80);
  drawButton("Roulette", width / 2 + 0.5 * spacing, centerY, 200, 80);
  drawButton("Slots", width / 2 + 1.5 * spacing, centerY, 200, 80);
  drawButton("Back", width / 2, height - 45, 200, 50);
}

function handleCasinoMenuClick() {
  if (isButtonClicked(width / 2, height - 45, 200, 50)) {
    console.log("Back to landing");
    currentScreen = "main";
    highLowInitialized = false;
    blackJackInitialized = false;
  } else if (isButtonClicked(width / 2 - 1.5 * 220, height / 2, 200, 80)) {
    console.log("blackjack");
    currentCasinoScreen = "blackjack";
  } else if (isButtonClicked(width / 2 - 0.5 * 220, height / 2, 200, 80)) {
    console.log("highlow");
    currentCasinoScreen = "highlow";
  } else if (isButtonClicked(width / 2 + 0.5 * 220, height / 2, 200, 80)) {
    currentCasinoScreen = "roulette";
  } else if (isButtonClicked(width / 2 + 1.5 * 220, height / 2, 200, 80)) {
    currentCasinoScreen = "slots";
  }
}

function drawCasino() {
  switch (currentCasinoScreen) {
    case "landing":
      drawLandingPage();
      break;
    case "blackjack":
      if (!blackJackInitialized) {
        setupBlackJack();
        blackJackInitialized = true;
      }
      drawBlackJack();
      break;
    case "roulette":
      // drawRouletteGame();
      break;
    case "slots":
      setupSlots();
      drawSlots();
      break;
    case "highlow":
      if (!highLowInitialized) {
        console.log("Setting up High Low");
        setupHighLowGame();
        highLowInitialized = true;
      }
      drawHighLowGame();
      break;
    case "store":
      drawStore();
      break;
  }
}

function drawLandingPage() {
  textSize(42);
  textAlign(CENTER, CENTER);
  fill(color(212, 175, 55));
  text("Welcome to Raccoon Royale!", width / 2, 100);
}
