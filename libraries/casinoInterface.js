let blackjackButton, rouletteButton, storeButton;
let currentCasinoScreen = "landing";
highLowInitialized = false;

function setupCasinoUI() {
  // Create buttons for casino interface
  blackjackButton = createButton("Blackjack");
  blackjackButton.position(260, 400);
  blackjackButton.mousePressed(navigateToBlackjack);

  highlowButton = createButton("High Low");
  highlowButton.position(260, 500);
  highlowButton.mousePressed(navigateToHighLow);

  rouletteButton = createButton("Roulette");
  rouletteButton.position(260, 600);
  rouletteButton.mousePressed(navigateToRoulette);

  rouletteButton = createButton("Slots");
  rouletteButton.position(260, 600);
  rouletteButton.mousePressed(navigateToSlots);

  storeButton = createButton("Store");
  storeButton.position(260, 700);
  storeButton.mousePressed(navigateToStore);

  // Initially hide the buttons
  hideAllCasinoButtons();
}

function drawCasino() {
  switch (currentCasinoScreen) {
    case "landing":
      drawLandingPage();
      showAllCasinoButtons();
      break;
    case "blackjack":
      drawBlackjackGame();
      hideAllCasinoButtons();
      break;
    case "roulette":
      drawRouletteGame();
      hideAllCasinoButtons();
      break;
    case "slots":
      drawSlotsGame();
      hideAllCasinoButtons();
      break;
    case "highlow":
      hideAllCasinoButtons();
      if (!highLowInitialized) {
        setupHighLowGame(); // Initialize the game only once
        highLowInitialized = true; // Set the flag to prevent reinitialization
      }
      drawHighLowGame();
      break;
  }
  // switch(currentCasinoScreen) {
  //   case 'landing':
  //     drawLandingPage();
  //     showAllCasinoButtons();
  //     break;
  //   case 'blackjack':
  //     drawBlackjackGame();
  //     hideAllCasinoButtons();
  //     break;
  //   case 'roulette':
  //     drawRouletteGame();
  //     hideAllCasinoButtons();
  //     break;
  // }

  /** @todo casino code? */
  // setupBlackJack();
  // drawBlackjackGame();
}

function drawLandingPage() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to the Casino!", width / 2, 200);
}

function drawBlackjackGame() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Blackjack Game!!!!", width / 2, 200);
  // Add blackjack game implementation here
}

function drawRouletteGame() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Roulette Game", width / 2, 200);
  // Add roulette game implementation here
}

function drawSlotsGame() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Roulette Game", width / 2, 200);
  // Add roulette game implementation here
}

// function drawHighLowGame() {
//   textSize(32);
//   textAlign(CENTER, CENTER);
//   text("High Low Game", width / 2, 200);
//   // Add high-low game implementation here
// }

function navigateToBlackjack() {
  currentCasinoScreen = "blackjack";
}

function navigateToRoulette() {
  hideAllCasinoButtons();
  currentCasinoScreen = "roulette";
}

function navigateToHighLow() {
  hideAllCasinoButtons();
  currentCasinoScreen = "highlow";
}

function navigateToSlots() {
  hideAllCasinoButtons();
  currentCasinoScreen = "slots";
}

function navigateToStore() {
  hideAllCasinoButtons();
  currentScreen = "store"; // This will communicate with the main menu system
}

function showAllCasinoButtons() {
  blackjackButton.show();
  rouletteButton.show();
  storeButton.show();
  highlowButton.show();
}

function hideAllCasinoButtons() {
  blackjackButton.hide();
  rouletteButton.hide();
  storeButton.hide();
  highlowButton.hide();
}
