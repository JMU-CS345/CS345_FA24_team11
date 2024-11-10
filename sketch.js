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
    case 'main':  GameMenu.handleMainMenuClick();   break;
    case 'store': handleStoreMenuClick();           break;
    case 'cosmetics':
    case 'powerups':  handleSubmenuClick();         break;
    case 'inventory': handleInventoryClick();       break;
    case 'casino': /* handleCasinoMenuClick(); */   break;
    case 'game':      Game.handleGameClick();       break;
    }
}


function draw() {
  /** @todo @mfwolffe don't call this here */
  Game.startGame();

  switch(currentScreen) {
    case 'game':        Game.drawGame();                    break;
    case 'main':        GameMenu.drawMenu();                break;
    case 'store':       drawStoreMenu();                    break;
    case 'inventory':   drawInventory();                    break;
    case 'inventory':   !blackJackInit && setupBlackJack(); break;
    case 'powerups':
    case 'cosmetics':   drawSubmenu(currentScreen === 'cosmetics' ? cosmetics : powerUps);
      break;
    default: 
      console.log("BAD SCENE");
      break;
  }
}
