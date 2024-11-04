class Player {
  constructor(xPos, yPos, xSpeed, ySpeed, health, currency) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.health = health;
    this.currency = currency;
    this.width = 50; // Assuming player width
    this.height = 50; // Assuming player height
    this.touchingCasino = false;
  }

  handlePlayerMovement() {
    if (keyIsDown(DOWN_ARROW)) {
      this.updatePlayerYPos(this.ySpeed);
    }
    if (keyIsDown(UP_ARROW)) {
      this.updatePlayerYPos(-this.ySpeed);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.updatePlayerXPos(this.xSpeed);
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.updatePlayerXPos(-this.xSpeed);
    }
    this.checkNearCasino();
  }

  updatePlayerXPos(change) {
    const newXPos = this.xPos + change;
    if (newXPos >= 0 && newXPos + this.width <= 1280) { // Assuming canvas width is 1280
      this.xPos = newXPos;
    }
  }

  updatePlayerYPos(change) {
    const newYPos = this.yPos + change;
    if (newYPos >= 0 && newYPos + this.height <= tileHeight * rows) { // Assuming canvas height is dynamic based on rows
      this.yPos = newYPos;
    }
  }

  checkNearCasino() {
    const casinoRow = rows - 1;
    const casinoCols = mainMap[casinoRow].map((tile, index) => tile === 4 ? index : -1).filter(index => index !== -1);
    this.touchingCasino = casinoCols.some(col =>
      this.xPos < (col + 1) * tileWidth &&
      this.xPos + this.width > col * tileWidth &&
      this.yPos < (rows - 1 - casinoRow + 1) * tileHeight &&
      this.yPos + this.height > (rows - 1 - casinoRow) * tileHeight
    );
  }

  drawPlayer() {
    fill("green");
    rect(this.xPos, this.yPos, this.width, this.height);
  }

  drawCasinoPrompt() {
    if (this.touchingCasino) {
      const casinoRow = rows - 1;
      const casinoCols = mainMap[casinoRow].map((tile, index) => tile === 4 ? index : -1).filter(index => index !== -1);
      const casinoCol = casinoCols[0]; // Assuming there's only one casino column
      const casinoX = casinoCol * tileWidth;
      const casinoY = (rows - 1 - casinoRow) * tileHeight + tileHeight;

      fill(0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("Press 'E' to enter the casino", 350, casinoY + 20);
    }
  }

  enterCasino() {
    if (this.touchingCasino) {
      alert("Entering the casino...");
      // Add logic to navigate to the casino interface
    }
  }
}
