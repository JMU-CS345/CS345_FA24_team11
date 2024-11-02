let player, game;

/* ADD SPRITE VARIABLES HERE */
let coinsprite;

function preload() {
  /* LOAD SPRITES HERE */
  coinsprite = loadImage('assets/coin.gif');

}

function setup() {
  /** @todo @mfwolffe don't forget about difficulty */
  game = new Game(2);

  // if you see the error thrown below 
  // in console, you are likely just 
  // missing an instance of a game.
  if (!Game.difficulty) throw new Error("Game not initialized");

  /* ADD STUFF THAT DEPENDS ON `Game` AFTER HERE AS NEEDED */
  player = new Player(100, 100, 20, 20, 20, 20);
  createCanvas(Game.CANVAS.WIDTH, Game.CANVAS.HEIGHT);
  console.log(Game.MAP.fetchMap());

}

function draw() {
  background(220);
  
  player.drawPlayer();
  player.handlePlayerMovement();
  Game.MAP.renderCoins();
}