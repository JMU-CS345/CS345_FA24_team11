let game, menu;


/* ADD SPRITE VARIABLES HERE */
let coinsprite;
let racoonSprite;

function preload() {
  /* LOAD SPRITES HERE */
  coinsprite = loadImage('assets/coin.gif');
  racoonSprite = loadImage('assets/raccoon.jpg');

}

function setup() {
  /** @todo @mfwolffe don't forget about difficulty */
  game = new Game(2);
  menu = new Menu(0.5);

  // if you see the error thrown below 
  // in console, you are likely just 
  // missing an instance of a game.
  if (!Game.difficulty) throw new Error("Game not initialized");

  /* ADD STUFF THAT DEPENDS ON `Game` BELOW HERE AS NEEDED */
  createCanvas(Game.CANVAS.WIDTH, Game.CANVAS.HEIGHT);
  console.log(Game.MAP.fetchMap());
}

function draw() {
  Game.MAINMENU.colorizeBackground();
  
  Game.player.drawPlayer();
  Game.player.handlePlayerMovement();
  
  Game.MAP.renderCoins();
}
