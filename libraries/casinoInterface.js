let blackjackButton, rouletteButton;

function setupUI() {
  blackjackButton = createButton("Blackjack");
  blackjackButton.position(260, 500);
  blackjackButton.mousePressed(navigateToBlackjack);

  rouletteButton = createButton("Roulette");
  rouletteButton.position(260, 600);
  rouletteButton.mousePressed(navigateToRoulette);

  storeButton = createButton("Store");
  storeButton.position(260, 700);
  storeButton.mousePressed(navigateToStore);
}

function drawLandingPage() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to the Casino!", width / 2, 200);
}

function navigateToBlackjack() {}

function navigateToRoulette() {}

function navigateToStore() {}
