/** @todo @mfwolffe finish documenting */
/** @todo @mfwolffe a bunch of other stuff */

/**
 * Obstacle model
 *
 * @class Obstacle
 * @typedef {Obstacle}
 * @author Matt Wolffe @mfwolffe, ** ADD YOURSELF HERE IF YOU EDIT ** 
 * @classdesc
 */
class Obstacle {
  // TODO some kind of assignment to xPos 
  //      and yPos based on lane assignment
  // 
  constructor() {
    this.lane = randIntLeftInclusiveRange(0, Game.NUMLANES);
    this.speed = randIntFromInclusiveRange(1, Game.MAXSPDS[Game.difficulty]);
    this.damage = randIntFromInclusiveRange(1, Game.MAXDMGS[Game.difficulty]);

    this.xPos, this.yPos = this.initCoords();
  }

  getDirection() {
    return this.lane < Game.NUMLANES / 2;
  }

  getHumanReadableDirection() {
    return this.getDirection() ? "Left-Right" : "Right-Left";
  }

  initCoords() {
    x = this.getDirection() ? Game.XSTARTLFT : Game.XSTARTRGT;
    y = Game.LANECOORDS[this.lane];
    return x, y;
  }
}
