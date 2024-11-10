
/** @todo @mfwolffe do this differently idk */
const DEFAULTSPEED = 5;
const DEFAULTHEALTH = 15;
const DEFAULTCURRENCY = 100;

/**
 * Player model
 *
 * @class Player
 * @typedef {Player}
 * @author Matt Wolffe @mfwolffe, ** ADD YOURSELF HERE IF YOU EDIT ** 
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
    keyIsDown(DOWN_ARROW) && this.updatePlayerYPos(this.ySpeed);
    keyIsDown(UP_ARROW) && this.updatePlayerYPos(-(this.ySpeed));
    keyIsDown(RIGHT_ARROW) && this.updatePlayerXPos(this.xSpeed);
    keyIsDown(LEFT_ARROW) && this.updatePlayerXPos(-(this.xSpeed));
  }

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

  drawPlayer() {
    // TODO make a sprite
    fill("green");
    rect(this.xPos, this.yPos, 50, 50);
  }
}
