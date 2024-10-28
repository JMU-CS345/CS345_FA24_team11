let p;

function setup() {
  let g = new Game(2);
  if (!Game.difficulty) throw new Error("Game not initialized");

  /* ADD STUFF THAT DEPENDS ON `Game` AFTER HERE AS NEEDED */

  p = new Player(100, 100, 20, 20, 20, 20);
  createCanvas(Game.CANVAS.WIDTH, Game.CANVAS.HEIGHT);
}

function draw() {
  background(220);
  drawLandingPage();
  
  p.drawPlayer();
  p.handlePlayerMovement();

  drawLandingPage();
}

// setup()
draw()
