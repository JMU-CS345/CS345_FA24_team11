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
    this.len = randIntFromInclusiveRange(1, 3);
    this.lane = randIntLeftInclusiveRange(0, Game.NUMLANES);
    this.speed = randIntFromInclusiveRange(1, Game.MAXSPDS[Game.difficulty]);
    this.damage = randIntFromInclusiveRange(1, Game.MAXDMGS[Game.difficulty]);

    this.xPos, this.yPos = this.initCoords();
  }

  updateXPos(change) { this.xPos = change };
  updateYPos(change) { this.yPos = change };
}