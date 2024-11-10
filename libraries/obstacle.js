/** @todo @mfwolffe bind at runtime */
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
  #xPos;
  #yPos;

  // TODO some kind of assignment to xPos
  //      and yPos based on lane assignment
  // 
  constructor(xPos=null, yPos=null) {
    this.lane = randIntLeftInclusiveRange(0, Game.NUMLANES);

    /** @see new Vehicle class */
    // this.speed = randIntFromInclusiveRange(1, Game.MAXSPDS[Game.difficulty]);
    // this.damage = randIntFromInclusiveRange(1, Game.MAXDMGS[Game.difficulty]);

    if (!xPos && !yPos)
      this.#xPos, this.#yPos = this.initCoords();
    else {
      this.#xPos = xPos;
      this.#yPos = yPos;
    }
  }
}
