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

  /** @todo @mfwolffe write hazard class */
  constructor(hasCoin=false, hazard=null) {
    this.#hasCoin = Boolean(hasCoin);
    this.#hazard = JSON.parse(JSON.stringify(hazard));
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
  
}
