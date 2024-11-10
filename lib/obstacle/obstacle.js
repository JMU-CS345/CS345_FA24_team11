/** @todo @mfwolffe finish documenting */
/** @todo @mfwolffe bind at runtime? */


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
  constructor(xPos=null, yPos=null) {
    if (!xPos && !yPos)
      // TODO generate random coords
      pass;
    else {
      this.xPos = xPos;
      this.yPos = yPos;
    }
  }

  updateXPos(change) { this.xPos = change };
  updateYPos(change) { this.yPos = change };
}
