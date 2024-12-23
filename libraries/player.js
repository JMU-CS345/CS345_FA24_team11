const DEFAULTSPEED = 10;
const DEFAULTHEALTH = 15;

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
    currency = Game.defaultCurrency,
  ) {
    // Position and movement properties
    this.moveLength = Game.BLOCKSIZE;
    this.xPos = xPos;
    this.yPos = yPos;
    this.targetX = xPos;
    this.targetY = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.health = health;
    this.currency = currency;
    this.coinMultiplier = 1;
    this.shield = false;
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

    // this.moveLength = Game.BLOCKSIZE * 4;

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

    useShieldPowerUp() {
      const shieldPowerUp = this.inventory.find(item => item instanceof ShieldPowerUp);
      if (shieldPowerUp) {
        if (shieldPowerUp.fetchQuantity() > 0) {
          shieldPowerUp.applyEffect();
          shieldPowerUp.updateQuantity(shieldPowerUp.fetchQuantity() - 1);
          if (shieldPowerUp.fetchQuantity() === 0) {
            this.inventory = this.inventory.filter(item => item !== shieldPowerUp);
          }
        } else {
          console.log('ShieldPowerUp quantity is 0');
        }
      } else {
        console.log('ShieldPowerUp not found in inventory');
      }
    }

    updatePlayerHealth(change) {
      if (this.shield) {
        this.shield = false; // Shield absorbs the hit
        console.log('Shield Used');
      } else {
        this.health += change;
      }
    }

    handlePlayerMovement() {
      if (this.isMoving) {
        console.log('Player is currently moving, skipping movement.');
        return; // Prevent multiple movements
      }

      let newX = this.xPos;
      let newY = this.yPos;

      if (keyIsDown(DOWN_ARROW)) {
        newY += this.moveLength;
        this.facing = 'down';

        if (newY > numScreens * height) return;

        this.isMoving = true;
      } else if (keyIsDown(UP_ARROW)) {
        newY -= this.moveLength;
        this.facing = 'up';

        if (newY < 0) return;

        this.isMoving = true;
      } else if (keyIsDown(RIGHT_ARROW)) {
        newX += this.moveLength;
        this.facing = 'right';

        if (newX > width) return;

        this.isMoving = true;
      } else if (keyIsDown(LEFT_ARROW)) {
        newX -= this.moveLength;
        this.facing = 'left';
        
        if (newX < 0) return;
        
        this.isMoving = true;
      } else {
        // No movement keys pressed
        this.isMoving = false;
      }

      // Use canMoveTo to check if movement is allowed
      if (this.isMoving && this.canMoveTo(newX, newY)) {
        this.updatePlayerXPos(newX - this.xPos);
        this.updatePlayerYPos(newY - this.yPos);
      } else if (this.isMoving) {
        console.log('Cannot move to the desired tile.');
        this.isMoving = false; // Prevents the player from getting stuck in moving state
      }

      checkCasinoEntry(Game.player);

      // Always update animation, whether moving or idle
      this.updateAnimation();
    }

  canMoveTo(x, y) {
    const row = Math.floor(y / (Game.BLOCKSIZE));
    const col = Math.floor(x / (Game.BLOCKSIZE));
    console.log(`coord: <${row}, ${col}>`);

    console.log("block", combinedMap[row][col]);
    

    // Check if indices are within the map boundaries
    if (row < 0 || row >= combinedMap.length || col < 0 || col >= combinedMap[0].length) {
      return false;
    }

    const tileType = combinedMap[row][col].getType();
    const tile = tileTypes[tileType];

    if (!tile) {
      console.log(`Undefined tile: row=${row}, col=${col}, tileType=${tileType}. Allowing traversal.`);
      return true; // Allow traversal for undefined tiles
    }

    if (tile.type === 'water') {
      return false;
    }
    return true;
  }

  keyReleased() {
    this.isMoving = false; // Allow movement again when key is released
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
        this.xPos + (this.spriteWidth * 1.5) / 8,  // Center the sprite horizontally
        this.yPos + (this.spriteHeight * 1.5) / 8, // Center the sprite vertically
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
    if (candidate < combinedMap.length * (Game.BLOCKSIZE * 4) && candidate >= 0) {
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

  killPlayer() {
    this.currency -= Game.coinPenalty;
    Game.coinPenalty += 25;
    Game.endGame();
  }

  collectCoin(block) {
    block.updateCoin(false);
    // GameMap.renderGrid();  //  causes flickering when main map is drawn
  }

}
