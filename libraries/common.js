/**
 * @file  common utils/helpers that I constantly
 *        find myself having to rewrite when working
 *        in js. Add any helpers you may need here
 *        as long as there are no namespace problems
 * 
 * @author  Matt Wolffe @mfwolffe, and random people 
 *          around the web for certain functions that 
 *          are lost to time since I fill most of these
 *          in from custom VSCode snippets. 
 *          lmk if you want that snippet file
 */


/**
 * Slightly more reliable check on ability to parse
 * a number from a string that doesn't require an ugly
 * regex 
 * 
 * @param {*} str candidate string 
 * @returns true if the string can be interpreted as a number,
 *          false otherwise
 */
const isNumber = (str) => Number.isFinite(+str);


/**
 * Generates random integer in the range [min, max]
 * 
 * NOTE: this is not typesafe, that is, if you pass it some obj 
 *       it will try to coerce said obj to a number.
 *       In addition, if you pass it floating point values I believe
 *       the distribution will not be uniform due to rounding bias
 * 
 * @param {*} min minimum possible value to generate (inclusive)
 * @param {*} max maximum possible value to generate (inclusive)
 * @returns a random integer between min and max, inclusive
 */
const randIntFromInclusiveRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


/**
 * Generates random integer in the range [min, max)
 * 
 * NOTE: this is not typesafe, that is, if you pass it some obj 
 *       it will try to coerce said obj to a number.
 *       In addition, if you pass it floating point values I believe
 *       the distribution will not be uniform due to rounding bias
 * 
 * @param {*} min minimum possible value to generate (inclusive)
 * @param {*} max maximum possible value to generate (exclusive)
 * @returns a random integer between min (inclusive) and max (exclusive)
 */
const randIntLeftInclusiveRange = (min, max) => Math.random() * (max - min) + min;

/**
 * This is essentially the same as randIntFromInclusiveRange, 
 * but is more performant.
 * 
 * CAUTION: in using a bit shift (the `<< 0`), the operands are
 *          treated as 32 bit 2's comp during computation, but 
 *          the resulting value is not necessarily returned as such.
 *          Use this if for some very bizarre reason one of the other
 *          RNGs is slow.
 *          Note that this applies for all bitwise/binary operators
 * 
 * @param {*} min minimum possible value to generate (inclusive)
 * @param {*} max maximum possible value to generate (inclusive)
 * @returns a random integer in the range [min, max || 2^32-1]
 */
const fastRandomIntegerFromRange = (min, max) => (Math.random() * (max - min + 1)) << 0;
