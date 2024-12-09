let messageTimer = 0;

// Global variables for running raccoon
let runningFrame = 0;
let runningX = -100;
let runningY = 0;
let isRunningRight = true;
let runningFrameCount = 0;

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
      GameMenu.currentFrame = (GameMenu.currentFrame + 1) % 8;
      GameMenu.frameCount = 0;
    }
  }
  
  static drawRaccoon() {
    try {
      const spriteWidth = 32;
      const spriteHeight = 32;
      const displayWidth = spriteWidth * 10;
      const displayHeight = spriteHeight * 10;
      const row = 2;
      const startFrame = 8;
      
      const sx = (GameMenu.currentFrame + startFrame) * spriteWidth;
      const sy = row * spriteHeight;

      push();
      noSmooth();
      imageMode(CENTER);

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
      fill("blue");
      rect(width * 0.7, height * 0.5, 192, 192);
    }
  }
  
  static drawRunningRaccoon() {
    try {
      const spriteWidth = 32;
      const spriteHeight = 32;
      const displayWidth = spriteWidth * 3;
      const displayHeight = spriteHeight * 3;
      
      // Update animation
      runningFrameCount++;
      if (runningFrameCount >= 8) {
        runningFrame = (runningFrame + 1) % 8;
        runningFrameCount = 0;
      }
      
      // Update position
      if (isRunningRight) {
        runningX += 3;
        if (runningX > width + 100) {
          isRunningRight = false;
          runningY = height * 0.7; // Move to lower path
        }
      } else {
        runningX -= 3;
        if (runningX < -100) {
          isRunningRight = true;
          runningY = height * 0.3; // Move to upper path
        }
      }
      
      // Draw raccoon
      push();
      noSmooth();
      imageMode(CENTER);
      
      const row = isRunningRight ? 3 : 1; // Right or left running animation
      const sx = runningFrame * spriteWidth;
      const sy = row * spriteHeight;
      
      image(
        GameMenu.sprite,
        runningX,
        runningY,
        displayWidth,
        displayHeight,
        sx,
        sy,
        spriteWidth,
        spriteHeight
      );
      
      pop();
    } catch (error) {
      fill("blue");
      rect(runningX, runningY, 96, 96);
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
    
    if (!GameMenu.sprite) {
      GameMenu.loadSprite();
      runningY = height * 0.3; // Initialize Y position
    }
    
    // Draw running raccoon first (behind everything)
    GameMenu.drawRunningRaccoon();
    
    // Draw main raccoon
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