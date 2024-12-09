/** @todo @mfwolffe pre-commit? */
/** @todo @mfwolffe constants???? */
/** @todo @everyone come to consensus on style things */
/** @todo @mfwolffe submenu as own class?? */
let messageTimer = 0;

class GameMenu {
  static sprite;
  static currentFrame = 0;
  static frameCount = 0;
  static animationSpeed = 15;
  
  static loadSprite() {
    GameMenu.sprite = loadImage('assets/rSprite.png');
  }
  
  static updateRaccoonAnimation() {
    GameMenu.frameCount++;
    if (GameMenu.frameCount >= GameMenu.animationSpeed) {
      GameMenu.currentFrame = (GameMenu.currentFrame + 1) % 8; // 8 frames in animation
      GameMenu.frameCount = 0;
    }
  }
  
  static drawRaccoon() {
    try {
      const spriteWidth = 32;
      const spriteHeight = 32;
      const displayWidth = spriteWidth * 10;
      const displayHeight = spriteHeight * 10;
      const row = 2;  // Changed to row 2 (up-facing)
      const startFrame = 8;  // Start at frame 8 to get last 8 frames
      
      // Calculate source rectangle from sprite sheet
      const sx = (GameMenu.currentFrame + startFrame) * spriteWidth;  // Added startFrame offset
      const sy = row * spriteHeight;

      push();
      noSmooth();
      imageMode(CENTER);

      // Draw the current frame
      image(
        GameMenu.sprite,
        width * 0.7,
        height * 0.5,
        displayWidth,
        displayHeight,
        sx,
        sy,
        spriteWidth,
        spriteHeight
      );

      pop();
    } catch (error) {
      // Fallback to simple rectangle if sprite fails to load
      fill("blue");
      rect(width * 0.7, height * 0.5, 192, 192);
    }
  }

  static drawMenu() {
    colors = {
      background: color(31, 41, 55),
      machine: color(55, 65, 81),
      display: color(17, 24, 39),
      button: color(220, 38, 38),
      buttonHover: color(185, 28, 28),
      text: color(255)
    }
    
    clear();
    background(colors.background);
    readableOverlay();
    
    // Load sprite if not loaded
    if (!GameMenu.sprite) {
      GameMenu.loadSprite();
    }
    
    // Update and draw raccoon
    GameMenu.updateRaccoonAnimation();
    GameMenu.drawRaccoon();
    
    textAlign(CENTER, CENTER);
    textSize(60);
    
    push();
    textSize(80);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    fill(17, 24, 39);
    text('RACCOON RUSH', width/2 + 4, 86);
    fill(255);
    text('RACCOON RUSH', width/2, 80);
    pop();
    
    push();
    imageMode(CENTER);
    noFill();
    pop();
    
    push()
    drawButton('Store', width/5, height/2 - 20, 200, 80);
    drawButton('Casino', width/5, height/2 + 220 , 200, 80);
    drawButton('Inventory', width/5, height/2 + 100, 200, 80);
    drawButton('Play Game', width/5, height/2 - 140, 200, 80);
    pop();
    
    fill(0);
    drawMoneyCounter();
    
    if (messageTimer > 0) {
      drawMessage();
    }
  }

  static handleMainMenuClick() {
    if (isButtonClicked(width/5, height/2 - 140 , 200, 80)) {
      currentScreen = 'difficulty';
    } else if (isButtonClicked(width/5, height/2 - 20, 200, 80)) {
      currentScreen = 'store';
    } else if (isButtonClicked(width/5, height/2 + 100, 200, 80)) {
      currentScreen = 'inventory';
    } else if (isButtonClicked(width/5, height/2 + 220 , 200, 80)) {
      currentScreen = 'casino';
    }
  }

  static setMessage(msg) {
    message = msg;
    messageTimer = 180;
  }
}