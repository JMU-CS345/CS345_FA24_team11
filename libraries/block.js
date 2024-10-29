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
  #coinPresent = false;

  constructor(coinpresent) {
    this.#coinPresent = Boolean(coinpresent);
  }

  
  /**
   * Update this block's coin status
   * 
   * NOTE: The argument will be coerced to boolean.
   *
   * @param {*} change new value for coinPresent
   */
  updateCoin(change) { this.#coinPresent = Boolean(change); }
}
