let player, game;

function setup() {
  game = new Game(2);
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
}