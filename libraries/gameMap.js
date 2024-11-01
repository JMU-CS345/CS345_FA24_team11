
/** @todo @mfwolffe move me? */
const prob = (base, penalty) => ( { "base": base, "penalty": penalty } );

const ROWCOINSMAP = [8, 5, 3];
const MAXCOINSMAP = [42, 30, 20];
const PROBABILITYMAP = [
  prob(0.50, 0.80),
  prob(0.40, 0.10),
  prob(0.24, 0.12),
];


/**
 * Model for the game map internal representation
 *
 * @class GameMap
 * @typedef {GameMap}
 * @author Matt Wolffe @mfwolffe, ** ADD YOURSELF HERE IF YOU EDIT **
 * @classdesc
 */
class GameMap {
  #numCoins;
  #map = [...Array(Game.YBLOCKS)].map(() => Array(Game.XBLOCKS));
  
  /** @todo @mfwolffe consider just passing in difficulty? */
  constructor() {
    Object.defineProperty(GameMap, "MAXCOINS", {
      value: MAXCOINSMAP[Game.difficulty],
      ...WEC,
    });
    Object.defineProperty(GameMap, "ROWMAXCOINS", {
      value: ROWCOINSMAP[Game.difficulty],
      ...WEC,
    });
    Object.defineProperty(GameMap, "PROBABILITIES", {
      value: PROBABILITYMAP[Game.difficulty],
      ...WEC,
    });

    this.initMap();
    this.#numCoins = ROWCOINSMAP[Game.difficulty];
    this.populateCoins();
  }

  initMap() {
    for (let i = 0; i < Game.YBLOCKS; i++)
      for (let j = 0; j < Game.XBLOCKS; j++)
        this.#map[i][j] = new Block();
  }
  
  fetchMap() { return this.#map; }
  fetchBlock(i, j) { return this.#map[i][j]; }

  populateCoins() {
    while (this.#numCoins < GameMap.MAXCOINS) {
      let x = randIntLeftInclusiveRange(0, Game.XBLOCKS)
      let y = randIntLeftInclusiveRange(0, Game.YBLOCKS);
      
      this.#map[y][x].updateCoin(true);
      this.#numCoins++;
    }
  }
}


