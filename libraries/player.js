
/** @todo @mfwolffe do this differently idk */
const DEFAULTSPEED = 5;
const DEFAULTHEALTH = 15;
const DEFAULTCURRENCY = 100;

/**
 * Player model
 *
 * @class Player
 * @typedef {Player}
 * @author Matt Wolffe @mfwolffe, @stroudw ** ADD YOURSELF HERE IF YOU EDIT ** 
 * @classdesc
 */

class Player {
  constructor(xPos=Game.STARTX,
    yPos=Game.STARTY,
    xSpeed=DEFAULTSPEED,
    ySpeed=DEFAULTSPEED,
    health=DEFAULTHEALTH,
    currency=DEFAULTCURRENCY) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
      this.health = health;
      this.currency = currency;
      
      // TODO @mfwolffe regroup on inventory DS choice
      this.inventory = [];
  }

  handlePlayerMovement() {
    this.isMoving = false;

    if (keyIsDown(DOWN_ARROW)) {
      this.updatePlayerYPos(this.ySpeed);
      this.facing = 'down';
      this.isMoving = true;
    }
    if (keyIsDown(UP_ARROW)) {
      this.updatePlayerYPos(-(this.ySpeed));
      this.facing = 'up';
      this.isMoving = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.updatePlayerXPos(this.xSpeed);
      this.facing = 'right';
      this.isMoving = true;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.updatePlayerXPos(-(this.xSpeed));
      this.facing = 'left';
      this.isMoving = true;
    }

    // Always update animation, whether moving or idle
    this.updateAnimation();
  }

  updateAnimation() {
    this.frameCount++;
    // Use different animation speeds based on movement state
    const currentAnimationSpeed = this.isMoving ? this.moveAnimationSpeed : this.idleAnimationSpeed;
    
    if (this.frameCount >= currentAnimationSpeed) {
      // Always cycle through all frames, whether moving or idle
      const maxFrames = this.animations[this.facing].frames;
      this.currentFrame = (this.currentFrame + 1) % maxFrames;
      this.frameCount = 0;
    }
  }

  drawPlayer() {
    // Calculate source rectangle from sprite sheet
    const animation = this.animations[this.facing];
    const sx = (this.currentFrame + animation.startFrame) * this.spriteWidth;
    const sy = animation.row * this.spriteHeight;
    
    push();  // Save current rendering state
    noSmooth();  // Ensure pixel-perfect rendering
    
    // Draw the current frame
    image(
      this.sprite,
      this.xPos + (this.spriteWidth * 1.5) / 2,  // Center the sprite horizontally
      this.yPos + (this.spriteHeight * 1.5) / 2, // Center the sprite vertically
      this.spriteWidth * 3,
      this.spriteHeight * 3,
      sx,
      sy,
      this.spriteWidth,
      this.spriteHeight
    );
    
    pop();  // Restore previous rendering state
  }

  // ... keep other existing methods unchanged ...
  updatePlayerXPos(change) {
    this.xPos += change;
  }

  updatePlayerYPos(change) {
    this.yPos += change;
  }

  setXSpeed(change) {
    this.xSpeed = change;
  }

  setYSpeed(change) {
    this.ySpeed = change;
  }

  updatePlayerHealth(change) {
    this.health += change;
  }

  updatePlayerCurrency(change) {
    this.currency += change;
  }
}