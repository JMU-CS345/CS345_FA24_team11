let blackjackButton, rouletteButton, storeButton;
let currentCasinoScreen = 'landing';

function setupCasinoUI() {
  // Create buttons for casino interface
  blackjackButton = createButton("Blackjack");
  blackjackButton.position(260, 500);
  blackjackButton.mousePressed(navigateToBlackjack);
  
  rouletteButton = createButton("Roulette");
  rouletteButton.position(260, 600);
  rouletteButton.mousePressed(navigateToRoulette);
  
  storeButton = createButton("Store");
  storeButton.position(260, 700);
  storeButton.mousePressed(navigateToStore);
  
  // Initially hide the buttons
  hideAllCasinoButtons();
}

function drawCasino() {
  switch(currentCasinoScreen) {
    case 'landing':
      drawLandingPage();
      showAllCasinoButtons();
      break;
    case 'blackjack':
      drawBlackjackGame();
      hideAllCasinoButtons();
      break;
    case 'roulette':
      drawRouletteGame();
      hideAllCasinoButtons();
      break;
  }
}

function drawLandingPage() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to the Casino!", width / 2, 200);
}

function drawBlackjackGame() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Blackjack Game", width / 2, 200);
  // Add blackjack game implementation here
}

function drawRouletteGame() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Roulette Game", width / 2, 200);
  // Add roulette game implementation here
}

function navigateToBlackjack() {
  currentCasinoScreen = 'blackjack';
}

function navigateToRoulette() {
  currentCasinoScreen = 'roulette';
}

function navigateToStore() {
  hideAllCasinoButtons();
  currentScreen = 'store'; // This will communicate with the main menu system
}

function showAllCasinoButtons() {
  blackjackButton.show();
  rouletteButton.show();
  storeButton.show();
}

function hideAllCasinoButtons() {
  blackjackButton.hide();
  rouletteButton.hide();
  storeButton.hide();
}