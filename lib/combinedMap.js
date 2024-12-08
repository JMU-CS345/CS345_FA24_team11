/** @todo @mfwolffe flag the map init. so prototype fns can be used the for loops are getting silly & risky */


let currProb;
let maxCoins;
let tileTypes;
let numScreens;
let aggregateTypes;

let numCoins = 0;
const combinedMap = [];


const MAXSCREENSMAP = [3, 5, 7];

const setupTileTypes = () => {
  tileTypes = {
    0: { type: 'roadTop', color: [50, 50, 50], img: roadTopImg },
    1: { type: 'sidewalk', color: [169, 169, 169], img: sidewalkImg },
    2: { type: 'grass', color: [34, 139, 34], img: grassImg },
    3: { type: 'water', color: [70, 130, 180], img: waterImg },
    4: { type: 'redCarpet', color: [255, 215, 0], img: carpetImg },
    5: { type: 'roadBot', color: [50, 50, 50], img: roadBotImg },
    6: { type: 'bridge', color: [50, 50, 50], img: bridgeImg },
  };
}

const setupAggregateTypes = () => {
  aggregateTypes = {
    0: { type: 'twoLane',             layout: [0, 5],    },
    1: { type: 'twoLaneWaterTop',     layout: [3, 0, 5], },
    2: { type: 'twoLaneSwalkTop',     layout: [1, 0, 5], },
    3: { type: 'twoLaneSwalkBottom',  layout: [0, 5, 1], },
    4: { type: 'twoLaneWaterBottom',  layout: [0, 5, 3], },
  }
}

/**
 * temporary new coingen
 *
 * @author @mfwolffe
 * @returns {boolean} true on coingen, false otherwise
 */
const decideCoin = () => {
  if (Math.random() < currProb) {
    currProb = 0;
    return true;
  }

  currProb += 0.05;
  return false;
}


/**
 * Calculate number of coins for this map
 * 
 * functinonally equivalent to:
 *  f(n, d) = ceil(e^(0.8x n + d))
 *
 * @param {*} n number of screens
 * @param {*} d difficulty (0, 1, 2)
 * @returns {*} integer number of coins
 */
const decideMaxCoins = (n, d) => { maxCoins = Math.ceil(Math.pow(Math.E, 0.8 * n + d)); }


/**
 * Calculate interval for coin placement
 * (tweak to reduce clustering)
 * 
 */
const decideCoinInterval = (k=1) => { return Math.ceil(Math.sqrt(k/0.5 * Game.XBLOCKS * Game.YBLOCKS / maxCoins)) }

const decideIfAggregate = () => { return randIntLeftInclusiveRange(0, 100) < 50 ; }
const checkAggregateSpace = (row, rowMax, span) => { return !(row + span > rowMax); }
const decideType = () => { return randIntLeftInclusiveRange(0, Object.keys(tileTypes).length) }
const decideScreens = () => { numScreens = randIntFromInclusiveRange(1, MAXSCREENSMAP[Game.difficulty]); }
const decideAggregateType = () => { return randIntLeftInclusiveRange(0, Object.keys(aggregateTypes).length); }

function populateCoins() {
  let cols = Game.XBLOCKS;
  let rows = Game.YBLOCKS * numScreens;

  let interval = decideCoinInterval(Game.difficulty);

  console.log(`rows: ${rows}, cols: ${cols}`);
  console.log(`coin stats: crnt: number: ${numCoins}, max: ${maxCoins}, interval ${interval}, dfc: ${Game.difficulty}`);
  console.log(`prob going in ${currProb}`);
  

  combinedMap.forEach((row, i) => {
    row.forEach((blk, j) => {
      if (numCoins < maxCoins && Math.random() < currProb) {
        blk.updateCoin(true);
        numCoins++;
        currProb = (maxCoins - numCoins) / ((Game.XBLOCKS * Game.YBLOCKS) - (i * rows + j + 1))
      }
    })
  })
}

function renderCoins() {
  combinedMap.forEach((row) => {
    row.forEach((blk) => {
      if (blk.checkCoin()) {
        image(coinSprite, 
          blk.getXPos(),
          blk.getYPos(),
          Game.BLOCKSIZE,
          Game.BLOCKSIZE,
        );
      }
    })
  })
}

const initMap = () => {
  decideScreens();
  decideMaxCoins(numScreens, Game.difficulty);
  currProb = maxCoins / (Game.XBLOCKS * Game.YBLOCKS);
  decideCoinInterval();

  let ag = false;
  let currType = -1;
  let thisAg = null;
  let thisType = null;
  let cols = Game.XBLOCKS;
  let rows = Game.YBLOCKS * numScreens;

  for (let i = 0; i < rows; i++) {
    combinedMap.push([]);
    for (let j = 0; j < cols; j++)
      combinedMap[i].push(new Block(false, false, Game.BLOCKSIZE * i, Game.BLOCKSIZE * j, 2))
  }

  /** @todo @mfwolffe marinara for this spaghetti?
   * (to anyone reading this code is my own;
   *  the spaghetti is mine and mine alone) 
   * */
  for (let i = 0; i < rows; i++) {
    if ((ag = decideIfAggregate())) {
      currType = decideAggregateType();
      thisAg = aggregateTypes[currType];
      if (!checkAggregateSpace(i, rows, thisAg.layout.length)) {
        currType = decideType();
        ag = false;
        thisType = tileTypes[currType];
      }
    }
    else {
      currType = decideType();
      thisType = tileTypes[currType];
    }

    if (ag) {
      for (let j = 0; j < thisAg.layout.length; j++, i++)
        for (let k = 0; k < cols; k++) {

          /** @todo @mfwolffe consider just updating props */
          combinedMap[i][k] = new Block(
            false,
            false,
            Game.BLOCKSIZE * k,
            Game.BLOCKSIZE * i,
            thisAg.layout[j],
          )
        }
    } else {
      for (let k = 0; k < cols; k++)
        /** @todo @mfwolffe consider just updating props */
        combinedMap[i][k] = new Block(
          false,
          false,
          Game.BLOCKSIZE * k,
          Game.BLOCKSIZE * i,
          thisType,
        )
    }
  }

  populateCoins();
  console.log('post-populate', combinedMap);
}


function drawMap() {
  const rows = combinedMap.length;      // TODO consider the constants
  const cols = Game.XBLOCKS;            // TODO ""

  const tileWidth = Game.LANEWIDTH * 2;
  const tileHeight = Game.BLOCKSIZE * 4;

  combinedMap.forEach((row, i) => {
    row.forEach((blk, j) => {
      const tileType = blk.getType();
      const tile = tileTypes[tileType];     // ha, we could prob do this less ..circularly if it was bothersome

      if (tile && tile.img) image(tile.img, j * tileWidth, i * tileHeight, tileWidth, tileHeight);
      else {
        noStroke();
        fill(200); // Default color if image is not available
        rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
      }
    })
  })
}

/** @todo @mfwolffe or anyone I believe this is next to be fixed */
function adjustCamera(player) {
  // Keep horizontal offset fixed
  const offsetX = 0;

  // Calculate vertical offset based on player's position
  let offsetY = height / 2 - player.yPos;

  // Keep camera within the map boundaries vertically
  const maxOffsetY = 0;
  const minOffsetY = Math.min(0, height - combinedMap.length * Game.BLOCKSIZE * 4);

  offsetY = constrain(offsetY, minOffsetY, maxOffsetY);

  translate(offsetX, offsetY);
}


const isRoadTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'road' }
const isGrassTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'grass' }
const isWaterTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'water' }
const isCasinoTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'casino' }
const isSidewalkTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'sidewalk' }
const checkArbitraryTile = (row, col, type) => { return tileTypes[combinedMap][row][col].type === type }
