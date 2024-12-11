/** @todo @mfwolffe flag the map init. so prototype fns can be used the for loops are getting silly & risky */

let currProb;
let maxCoins;
let tileTypes;
let numScreens;
let aggregateTypes;

let numCoins = 0;

let hazards = [];
const topRow = [];
const bottomRow = [];
const hazardRows = [];
const combinedMap = [];
const MAXSCREENSMAP = [3, 5, 7];

const setupTileTypes = () => {
  tileTypes = {
    2: { type: "grass", color: [34, 139, 34], img: grassImg },
    3: { type: "water", color: [70, 130, 180], img: waterImg },
    6: { type: "bridge", color: [50, 50, 50], img: bridgeImg },
    4: { type: "redCarpet", color: [255, 215, 0], img: carpetImg },
    5: { type: "roadBot", color: [50, 50, 50], img: roadBotImg },
    0: { type: "roadTop", color: [50, 50, 50], img: roadTopImg },
    1: { type: "sidewalk", color: [169, 169, 169], img: sidewalkImg },
  };
};

const setupAggregateTypes = () => {
  aggregateTypes = {
    5: { type: "grass", layout: [2] },
    6: { type: "water", layout: [3] },
    0: { type: "twoLane", layout: [0, 5] },
    1: { type: "twoLaneWaterTop", layout: [3, 0, 5] },
    2: { type: "twoLaneSwalkTop", layout: [1, 0, 5] },
    3: { type: "twoLaneSwalkBottom", layout: [0, 5, 1] },
    4: { type: "twoLaneWaterBottom", layout: [0, 5, 3] },
  };
};

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
const decideMaxCoins = (n, d) => {
  maxCoins = Math.ceil(Math.pow(Math.E, 0.8 * n + d));
};

/**
 * Calculate interval for coin placement
 * (tweak to reduce clustering)
 *
 */
const decideCoinInterval = (k = 1.5) => {
  return Math.floor(2.4 * maxCoins);
};

const decideIfAggregate = () => {
  return randIntLeftInclusiveRange(0, 100) < 50;
};
const checkAggregateSpace = (row, rowMax, span) => {
  return !(row + span > rowMax);
};
const decideType = () => {
  return randIntLeftInclusiveRange(0, Object.keys(tileTypes).length);
};
const decideScreens = () => {
  numScreens = randIntFromInclusiveRange(1, MAXSCREENSMAP[Game.difficulty]);
};
const decideAggregateType = () => {
  return randIntLeftInclusiveRange(0, Object.keys(aggregateTypes).length);
};

const placeBridges = (row) => {
  let placeTwo = true;
  if (Game.difficulty === 3) placeTwo = randomBoolean(0.33);

  let placement = randIntLeftInclusiveRange(0, Game.XBLOCKS);
  combinedMap[row][placement].updateType(6);

  if (!placeTwo) return; // note the early exit

  let dist = Game.XBLOCKS / 2 + randIntFromInclusiveRange(-5, 5);

  placement += dist;
  placement %= Game.XBLOCKS;

  combinedMap[row][placement].updateType(6);
};

const populateCoins = () => {
  const modifier = Game.difficulty + 1;
  maxCoins = randIntFromInclusiveRange(6, 12 * modifier) * numScreens;

  let placed = 0;
  while (placed < maxCoins) {
    const row = randIntLeftInclusiveRange(0, Game.YBLOCKS * numScreens);
    const col = randIntLeftInclusiveRange(0, Game.XBLOCKS);
    combinedMap[row][col].updateCoin(true);
    placed++;
  }
};

function renderCoins() {
  combinedMap.forEach((row, i) => {
    row.forEach((blk, j) => {
      if (blk.checkCoin()) {
        image(coinSprite, Game.BLOCKSIZE * j, Game.BLOCKSIZE * i, Game.BLOCKSIZE, Game.BLOCKSIZE);
      }
    });
  });
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
    for (let j = 0; j < cols; j++) combinedMap[i].push(new Block(false, false, Game.BLOCKSIZE * j, Game.BLOCKSIZE * i, 2));
  }

  // first 2 rows are static
  for (let i = 2; i < rows; i++) {
    currType = decideAggregateType();
    thisAg = aggregateTypes[currType];

    while (!checkAggregateSpace(i, rows, thisAg.layout.length)) {
      currType = decideAggregateType();
      thisAg = aggregateTypes[currType];
    }

    for (let j = 0; j < thisAg.layout.length; j++, i++) {
      let thisTile = thisAg.layout[j];

      if (thisTile == 5 || thisTile == 0) hazardRows.push({ index: i, type: thisTile, offset: Game.BLOCKSIZE * i });

      for (let k = 0; k < cols; k++) {
        combinedMap[i][k] = new Block(false, false, Game.BLOCKSIZE * k, Game.BLOCKSIZE * i, thisTile);
      }
    }
  }

  combinedMap.forEach((row, i) => {
    if (row[0].getType() === 3) placeBridges(i);
  });

  for (let i = 0; i < cols; i++) {
    combinedMap[0][i] = new Block(false, false, i * Game.BLOCKSIZE, 0, 2);
    combinedMap[1][i] = new Block(false, false, i * Game.BLOCKSIZE, Game.BLOCKSIZE, 1);
  }

  // place casino entrance
  combinedMap[0][randomBoolean() ? 0 : 15].updateType(4);

  populateCoins();
  console.log("post-populate", combinedMap);
};

function drawMap() {
  combinedMap.forEach((row, i) => {
    row.forEach((blk, j) => {
      const tileType = blk.getType();
      const tile = tileTypes[tileType]; // ha, we could prob do this less ..circularly if it was bothersome

      if (tile && tile.img) image(tile.img, j * Game.BLOCKSIZE, i * Game.BLOCKSIZE, Game.BLOCKSIZE, Game.BLOCKSIZE);
      else {
        noStroke();
        fill(200); // Default color if image is not available
        rect(j * Game.BLOCKSIZE, i * Game.BLOCKSIZE, Game.BLOCKSIZE, Game.BLOCKSIZE);
      }
    });
  });
  renderCoins();
}

function adjustCamera(player) {
  // Keep horizontal offset fixed
  const offsetX = 0;

  // Calculate vertical offset based on player's position
  offsetY = height / 2 - player.yPos;

  // Keep camera within the map boundaries vertically
  const maxOffsetY = 0;
  const minOffsetY = Math.min(0, height - combinedMap.length * Game.BLOCKSIZE * 4);

  offsetY = constrain(offsetY, minOffsetY, maxOffsetY);

  translate(offsetX, offsetY);
}



const isRoadTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === "road"; };
const isGrassTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === "grass"; };
const isWaterTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === "water"; };
const isCasinoTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === "casino"; };
const isCarpetTile = (row, col) => { return combinedMap[row][col].getType() ==  4 };
const isSidewalkTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === "sidewalk"; };
const checkArbitraryTile = (row, col, type) => { return tileTypes[combinedMap][row][col].type === type; };
