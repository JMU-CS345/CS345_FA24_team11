let game, menu;


/* ADD SPRITE VARIABLES HERE */
let coinSprite;
let raccoonImg;
let racoonSprite;
let roadBotImg, roadTopImg, sidewalkImg, grassImg, waterImg, carpetImg;

function preload() {
  /* LOAD SPRITES HERE */
  coinSprite = loadImage('assets/coin.gif');
  raccoonImg = loadImage('assets/raccoon.jpg');
  racoonSprite = loadImage('assets/raccoon.jpg');
  roadBotImg = loadImage('assets/mapGraphics/roadBot.png');
  roadTopImg = loadImage('assets/mapGraphics/roadTop.png');
  sidewalkImg = loadImage('assets/mapGraphics/sidewalk2.png');
  grassImg = loadImage('assets/mapGraphics/grass.png');
  waterImg = loadImage('assets/mapGraphics/water2.png');
  carpetImg = loadImage('assets/mapGraphics/redCarpet.png');
  bridgeImg = loadImage('assets/mapGraphics/bridge.png');
  // casinoImg = loadImage('assets/mapGraphics/casino.png');

  preloadCasino();
  preloadSlots();
}

function setup() {
  /** @todo @mfwolffe don't forget about difficulty */
  game = new Game(1, 1280, 720);
  menu = new Menu(0.5);

  // if you see the error thrown below
  // in console, you are likely just
  // missing an instance of a game.
  if (!Game.difficulty) throw new Error("Game not initialized");

  /* ADD STUFF THAT DEPENDS ON `Game` BELOW HERE AS NEEDED */
  createCanvas(Game.CANVAS.WIDTH, Game.CANVAS.HEIGHT);
  textAlign(CENTER, CENTER);

  // console.log(`PLAYER DFAULT CURRENCY: ${Game.player.currency}`);

  setupTileTypes();
  setupAggregateTypes();
  initMap();
}

function mousePressed() {
  switch(currentScreen) {
    case 'main':      GameMenu.handleMainMenuClick();     break;
    case 'store':     StoreMenu.handleStoreMenuClick();   break;
    case 'cosmetics':
    case 'powerups':  StoreMenu.handleSubmenuClick();     break;
    case 'inventory': StoreMenu.handleInventoryClick();   break;
    case 'casino':    handleCasinoMenuClick();            break;
    case 'game':      Game.handleGameClick();             break;
    case 'difficulty' : handleDifficultyClick();          break;
    }
}

function keyReleased() {
  if (currentScreen == 'game') {
    Game.player.keyReleased();
  }
}

function keyPressed() {
  if (currentScreen == 'game') {
    CoinMultiplier.handleCoinKeyPress(key);
    DashPowerUp.handleDashKeyPress(key);
    ShieldPowerUp.handleShieldKeyPress(key);
      // Add casino entry check
      if (keyCode === 69) { // 'E' key
          const playerTileX = Math.floor(Game.player.xPos / (Game.LANEWIDTH * 2));
          const playerTileY = Math.floor(Game.player.yPos / (Game.BLOCKSIZE * 4));

          if (mainMap[playerTileY] && mainMap[playerTileY][playerTileX] === 4) {
              currentScreen = 'casino';
              currentCasinoScreen = 'landing';
          }
      }
  }
  if (currentCasinoScreen == 'blackjack') keyPressedBlackJack(keyCode);

  if (currentScreen === 'main' && key === ' ') Game.describeGame();
}

function draw() {
  /** @todo @mfwolffe don't call this here */
  background("teal");

  switch(currentScreen) {
    case 'game':        Game.drawGame();                      break;
    case 'difficulty':  drawDifficultyMenu();                 break;
    case 'main':        GameMenu.drawMenu();                  break;
    case 'store':       StoreMenu.drawStoreMenu();            break;
    case 'casino':      setupCasinoUI(); drawCasino();        break;
    case 'inventory':   StoreMenu.drawInventory();            break;
    case 'powerups':    /** @todo @mfwolffe don't do below like that, inject it */
    case 'cosmetics':   StoreMenu.drawSubmenu(currentScreen === 'cosmetics' ? StoreMenu.cosmetics : StoreMenu.powerUps);
      break;
    default:
      console.log("BAD SCENE");
      break;
  }
  // let block;
  // (block = Game.player.checkCollectCoin()) && Game.player.collectCoin(block);
}
