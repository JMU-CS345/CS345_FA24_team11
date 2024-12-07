/** @todo @mfwolffe other fields */

/**
 * Game Block Model
 *
 * @class Block
 * @typedef {Block}
 * @author Matt Wolffe @mfwolffe, ** ADD YOURSELF HERE IF YOU EDIT ** 
 * @classdesc Smallest game 'unit'. Arbitrarily chosen to be 20x20.
 */
class Block {
  #hasCoin;
  #hazard;
  #type;

  /** @todo @mfwolffe write hazard class */
  constructor(hasCoin=false, hazard=null, xPos, yPos, type) {
    this.#hasCoin = Boolean(hasCoin);
    this.#hazard = JSON.parse(JSON.stringify(hazard));

    this.xPos = xPos;
    this.yPos = yPos;

    this.#type = type;
  }

  /**
   * Update this block's coin status
   * 
   * NOTE: The argument will be coerced to boolean.
   *
   * @param {*} change new value for coinPresent
   */
  updateCoin(change) { this.#hasCoin = Boolean(change); }

  
  /**
   * update this block's type of bg
   *
   * @param {*} change ensure it's an integer
   */
  updateType(change) { this.#type = change }

  /**
   * Update this block's hazard
   * 
   * NOTE: the deep clone of param hazard
   *
   * @param {*} hazard the specific hazard to place in this block
   */
  updateHazard(hazard) { this.#hazard = JSON.parse(JSON.stringify(hazard)); }

  
  /**
   * Check whether this block has a coin on it
   * 
   * @returns {boolean} whether this block has a coin on it
   */
  checkCoin() { return this.#hasCoin; }

  
  /**
   * Fetch this block's x coordinate on the game map
   *
   * @returns {*} a number, the block's horizontal
   *              coordinate
   */
  getXPos() { return this.xPos; }

  
  /**
   * Fetch this block's y coordinate on the game map
   *
   * @returns {*} a number, the block's vertical
   *              coordinate
   */
  getYPos() { return this.yPos; }

  
  /**
   * Fetch both of this block's coordinates
   * @todo @mfwolffe this is prob just cruft
   *
   * @returns {*}
   */
  getCoords() { return this.xPos, this.yPos; }
  

  
  /**
   * Fetch this block's type (hazard or not etc)
   *
   * @returns {*} integer repr of typ; @see combinedMap or just Map
   */
  getType() { return this.#type }
}
