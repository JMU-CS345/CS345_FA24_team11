const DEFAULTSPEED = 10;
const DEFAULTHEALTH = 15;
const DEFAULTCURRENCY = 100;

/**
 * Player model with sprite animation and movement
 *
 * @class Player
 * @typedef {Player}
 * @author Matt Wolffe @mfwolffe, @stroudw
 */
class Player {
  constructor(
    xPos = Game.STARTX,
    yPos = Game.STARTY,
    xSpeed = DEFAULTSPEED,
    ySpeed = DEFAULTSPEED,
    health = DEFAULTHEALTH,
    currency = DEFAULTCURRENCY
  ) {
    // Position and movement properties
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.health = health;
    this.currency = currency;
    this.coinMultiplier = 1;
    this.inventory = []; // TODO @mfwolffe regroup on inventory DS choice

    // Sprite and animation properties
    this.sprite = loadImage('assets/rSprite.png');
    this.spriteWidth = 32;  // fixed cannot be changed
    this.spriteHeight = 32;
    this.currentFrame = 0;
    this.frameCount = 0;
    this.idleAnimationSpeed = 15;  // Slower speed for idle animations
    this.moveAnimationSpeed = 3;   // Faster speed for movement animations
    this.facing = 'down';          // Default facing direction
    this.isMoving = false;         // Track movement state

    // Animation frames mapping
    this.animations = {
      down: { row: 7, frames: 8, startFrame: 0 },
      left: { row: 1, frames: 8, startFrame: 0 },
      right: { row: 3, frames: 16, startFrame: 0 },
      up: { row: 2, frames: 8, startFrame: 0 }
    };

    // // TESTING adds 100 of each powerup to inventory
    // for (let i = 0; i < 100; i++) {
    //   this.inventory.push(new CoinMultiplier());
    //   this.inventory.push(new DashPowerUp());
    // }
  }

  useCoinMultiplier() {
    const coinMultiplier = this.inventory.find(item => item instanceof CoinMultiplier);
    if (coinMultiplier && coinMultiplier.fetchQuantity() > 0) {
      coinMultiplier.applyEffect();
      coinMultiplier.updateQuantity(coinMultiplier.fetchQuantity() - 1);
      if (coinMultiplier.fetchQuantity() === 0) {
        this.inventory = this.inventory.filter(item => item !== coinMultiplier);
      }
    } else {
      console.log('CoinMultiplier not found or quantity is 0');
    }
  }

  useDashPowerUp() {
    const dashPowerUp = this.inventory.find(item => item instanceof DashPowerUp);
    if (dashPowerUp) {
      if (dashPowerUp.fetchQuantity() > 0) {
        dashPowerUp.applyEffect();
        dashPowerUp.updateQuantity(dashPowerUp.fetchQuantity() - 1);
        if (dashPowerUp.fetchQuantity() === 0) {
          this.inventory = this.inventory.filter(item => item !== dashPowerUp);
        }
      } else {
        console.log('DashPowerUp quantity is 0');
      }
    } else {
      console.log('DashPowerUp not found in inventory');
    }
  }

  handlePlayerMovement() {
    this.isMoving = false;

    if (keyIsDown(DOWN_ARROW)) {
      this.updatePlayerYPos(this.ySpeed);
      this.facing = 'down';
      this.isMoving = true;
    }
    if (keyIsDown(UP_ARROW)) {
      this.updatePlayerYPos(-this.ySpeed);
      this.facing = 'up';
      this.isMoving = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.updatePlayerXPos(this.xSpeed);
      this.facing = 'right';
      this.isMoving = true;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.updatePlayerXPos(-this.xSpeed);
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
    try {
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
        this.spriteWidth * 2,
        this.spriteHeight * 2,
        sx,
        sy,
        this.spriteWidth,
        this.spriteHeight
      );

      pop();  // Restore previous rendering state
    } catch (error) {
      // Fallback to simple rectangle if sprite fails to load
      fill("blue");
      rect(this.xPos, this.yPos, 20, 20);
    }
  }

  updatePlayerXPos(change) {
    let candidate = this.xPos + change;
    if (candidate < Game.CANVAS.WIDTH && candidate >= 0) {
      this.xPos = candidate;
    }
  }

  updatePlayerYPos(change) {
    let candidate = this.yPos + change;
    if (candidate < Game.CANVAS.HEIGHT && candidate >= 0) {
      this.yPos = candidate;
    }
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

  /**
   * Concise collision check idea thanks to Alice MC (@alicmc)
   */
  // checkCollectCoin() {
  //   let i = Math.floor(this.xPos / Game.BLOCKSIZE);
  //   let j = Math.floor(this.yPos / Game.BLOCKSIZE);
  //   let block = Game.MAP.fetchBlock(i, j);
  //   return block.checkCoin() ? block : null;
  // }

  checkCollectCoin() {
    const boo = () => { console.log("yo")}
    if (smallHadronCollider(this, Game.MAP.fetchMap())) boo();
      }



  collectCoin(block) {
    block.updateCoin(false);
    // GameMap.renderGrid();  //  causes flickering when main map is drawn
  }

}
