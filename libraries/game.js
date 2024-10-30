/** @todo @mfwolffe finish this */
/** @todo @mfwolffe document as you go */
/** @todo @mfwolffe tie in others' code e.g., for like mapgen */

/** @todo @mfwolffe figure out what you want to do w/ these vars */
const LANESMAP = [4, 8, 12];
const COINSMAP = [];

// spread this in defineProperty calls
// to cut down on duplicate literals.
const WEC = {
  writable: false,
  enumerable: true,
  configurable: false,
}


/**
 * Game "Engine" for frogger clone
 *
 * @class Game
 * @typedef {Game}
 * @author Matt Wolffe @mfwolffe, ** ADD YOURSELF IF YOU EDIT **
 * @classdesc most properties are bound during runtime and are procedurally
 *            decided based on user-selected difficulty.
 *            A consequence of this is a lot of editors' intellisense or 
 *            whatever flavor of code completion you prefer will likely not
 *            pick up their existence and not suggest "`BLOCKSIZE`" while typing
 *            the below arbitrary line of code:
 *            `let thing = Game.BLOCKSIZE * 2`
 */
class Game {
  constructor(difficulty) {
    if (![0, 1, 2].includes(difficulty))
      throw new Error(`Invalid difficulty param to Game Constructor: ${difficulty}`);

    // SEEME  this approach allows for the
    //        emulation of static constants
    //        in es6 classes.
    // SEEME  for difficulty field, a game object must
    //        be instantiated before trying to access
    //        through class - this provides a quick check
    //        for uninstantiated game
    // 
    Object.defineProperty(Game, 'difficulty', {
      value: difficulty,
      ...WEC,
    });
    Object.defineProperty(Game, 'BLOCKSIZE', {
      value: 20,
      ...WEC,
    });

    // SEEME  These props need more consideration 
    Object.defineProperty(Game, 'LANEWIDTH', {
      value: Game.BLOCKSIZE * 2,
      ...WEC,
    });
    Object.defineProperty(Game, 'OBSLEN', {
      value: Game.BLOCKSIZE * 2,
      ...WEC,
    });
    Object.defineProperty(Game, "OBSHGT", {
      value: Game.BLOCKSIZE * 2,
      ...WEC,
    });
    Object.defineProperty(Game, 'PLAYERSIZE', {
      value: Game.BLOCKSIZE,
      ...WEC,
    });

    Object.defineProperty(Game, "NUMLANES", {
      value: LANESMAP[this.difficulty],
      ...WEC,
    });
    Object.defineProperty(Game, "MAXDMGS", {
      value: [3, 6, 9],
      ...WEC,
    });
    Object.defineProperty(Game, "MAXSPDS", {
      value: [4, 8, 16],
      ...WEC,
    });
    Object.defineProperty(Game, "XSTARTLFT", {
      value: -(Game.OBSLEN + 2),
      ...WEC,
    });
    Object.defineProperty(Game, "XSTARTRGT", {
      value: width + Game.OBSLEN + 2,
      ...WEC,
    });
    Object.defineProperty(Game, "CANVAS", {
      value: {
        "WIDTH": 720,
        "HEIGHT": 1280,
      },
      ...WEC,
    });

    // TODO need to consider if lane block offsets 
    //      should be randomized
    //      in addition to whether there should be 
    //      multiple blocks on higher difficulties
    // 
    Object.defineProperty(Game, "LANEOFFSET", {
      value: Game.CANVAS.HEIGHT / 4,
      ...WEC,
    });
    Object.defineProperty(Game, "LANECOORDS", {
      value:  [...Game.generateLaneCoords(Game.difficulty)],
      ...WEC,
    });

    Object.defineProperty(Game, "XBLOCKS", {
      value: Game.CANVAS.WIDTH / Game.BLOCKSIZE,
      ...WEC,
    });
    Object.defineProperty(Game, "YBLOCKS", {
      value: Game.CANVAS.HEIGHT / Game.BLOCKSIZE,
      ...WEC,
    });
    Object.defineProperty(Game, "MAP", {
      value: new GameMap(),
      ...WEC,
    });
  }

  static generateLaneCoords(difficulty) {
    return [];
  }
}
