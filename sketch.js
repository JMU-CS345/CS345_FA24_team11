let game, menu;


/* ADD SPRITE VARIABLES HERE */
let coinSprite;
let raccoonImg;
let racoonSprite;

function preload() {
  /* LOAD SPRITES HERE */
  coinSprite = loadImage('assets/coin.gif');
  raccoonImg = loadImage('assets/raccoon.jpg');
  racoonSprite = loadImage('assets/raccoon.jpg');
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
}

function mousePressed() {
  switch(currentScreen) {
    case 'main':      GameMenu.handleMainMenuClick();     break;
    case 'store':     StoreMenu.handleStoreMenuClick();   break;
    case 'cosmetics':
    case 'powerups':  StoreMenu.handleSubmenuClick();     break;
    case 'inventory': StoreMenu.handleInventoryClick();   break;
    case 'casino': /* handleCasinoMenuClick(); */         break;
    case 'game':      Game.handleGameClick();             break;
    }
}


function draw() {
  /** @todo @mfwolffe don't call this here */
  background("teal");

  switch(currentScreen) {
    case 'game':        Game.drawGame();                      break;
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

  let block;
  (block = Game.player.checkCollectCoin()) && Game.player.collectCoin(block);
}
