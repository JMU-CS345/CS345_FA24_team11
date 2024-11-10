

const DAMAGEMAP = [2, 3, 5];

class Vehicle extends Obstacle {
  #lane;
  #speed;
  #damage;
  #started;
  #direction;

  constructor() {
    this.super();
    this.updateSpeed();
    this.updateDirection();
    this.#damage = DAMAGEMAP[Game.difficulty];
    this.#lane = randIntLeftInclusiveRange(0, LANESMAP[Game.difficulty]);

    /** @todo @mfwolffe do I want this const?  
     *                  how would de/buffs work if so?
     *                  apply mutation to damage as it is applied to player?
     */
    // Object.defineProperty(this, "DMG", {
    //   value: randIntFromInclusiveRange(1, Game.MAXDMGS[Game.difficulty]),
    //   ...WEC,
    // });
  }

  
  getDamage() { return this.#damage }

  getDirection() { return this.#direction }

  updateLane() { randIntLeftInclusiveRange(0, LANESMAP[Game.difficulty]) }

  updateSpeed() { this.#speed = randIntFromInclusiveRange(1, Game.MAXSPDS[Game.difficulty]) }

  updateDirection() {
    if ((this.#direction = this.#lane < Game.NUMLANES / 2))
      this.#speed = -this.#speed;
  }
  
  getHumanReadableDirection() { return this.getDirection() ? "Left-Right" : "Right-Left" }

  initCoords() {
    x = this.getDirection() ? Game.XSTARTLFT : Game.XSTARTRGT;
    y = Game.LANECOORDS[this.#lane];
    return x, y;
  }

  traverse() {
    this.#started = true;
    if (!this.checkBounds()) this.resetThisVehicle;
    this.xPos += this.#speed;
  }

  stop() { this.#started = false }

  resetThisVehicle () {
    this.updateDirection();
    this.initCoords();
    this.updateSpeed();
    this.#damage = DAMAGEMAP[Game.difficulty];
  }

  checkBounds() {
    return  (!this.#direction && this.xPos <= -this.len * Game.BLOCKSIZE) ||
            ( this.#direction && this.xPos >= Game.CANVAS.width + this.len * Game.BLOCKSIZE);
  }
}
