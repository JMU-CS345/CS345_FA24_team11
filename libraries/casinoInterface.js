
let buttonWidth, buttonHeight, currentCasinoScreen;
let highLowInitialized = false;
let blackJackInitialized = false;
let slotsInitialized = false;
let rouletteInitialized = false;
let kenoInitialized = false;

function preloadCasino() {
  width = 200; // Define the width of each button
  height = 100; // Define the height of each button
  currentCasinoScreen = "landing";
  // hideButtons();
}

// const buttonWidth = 200; // Define the width of each button
// const buttonHeight = 100; // Define the height of each button

function setupCasinoUI() {
  const centerY = height / 2; // Vertical center
  const spacing = 220; // Horizontal spacing between buttons

  drawButton("Blackjack", width / 2 - 2 * spacing, centerY, 200, 80);
  drawButton("High-Low", width / 2 - spacing, centerY, 200, 80);
  drawButton("Roulette", width / 2, centerY, 200, 80);
  drawButton("Slots", width / 2 + spacing, centerY, 200, 80);
  drawButton("Keno", width / 2 + 2 * spacing, centerY, 200, 80);
  drawButton("Back", width / 2, height - 45, 200, 50);
}

function handleCasinoMenuClick() {
  const spacing = 220; // Horizontal spacing between buttons

  if (isButtonClicked(width / 2, height - 45, 200, 50) && currentCasinoScreen == "landing") {
    console.log("Back to landing");
    currentScreen = "main";
    highLowInitialized = false;
    blackJackInitialized = false;
    slotsInitialized = false;
  } else if (isButtonClicked(width / 2 - 2 * spacing, height / 2, 200, 80) && currentCasinoScreen == "landing") {
    console.log("blackjack");
    currentCasinoScreen = "blackjack";
  } else if (isButtonClicked(width / 2 - spacing, height / 2, 200, 80) && currentCasinoScreen == "landing") {
    console.log("highlow");
    currentCasinoScreen = "highlow";
  } else if (isButtonClicked(width / 2, height / 2, 200, 80) && currentCasinoScreen == "landing") {
    console.log("roulette");
    currentCasinoScreen = "roulette";
  } else if (isButtonClicked(width / 2 + spacing, height / 2, 200, 80) && currentCasinoScreen == "landing") {
    console.log("slots");
    currentCasinoScreen = "slots";
  } else if (isButtonClicked(width / 2 + 2 * spacing, height / 2, 200, 80) && currentCasinoScreen == "landing") {
    console.log("keno");
    currentCasinoScreen = "keno";
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
      drawBlackJack();xw
      break;
    case "roulette":
      if (!rouletteInitialized) {
        console.log("Setting up Roulette");
        setupRouletteGame();
        rouletteInitialized = true;
      }
      drawRouletteGame();
      break;
    case "slots":
      if (!slotsInitialized) {
        setupSlots();
        slotsInitialized = true;
      }
      drawSlots();
      break;
    case "keno":
      if (!kenoInitialized) {
        setupKeno();
        kenoInitialized = true;
      }
      drawKeno();
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
