
let numCoins;
let tileTypes;
let numScreens;
let aggregateTypes;

const combinedMap = [];
let currProb = 0.4;

const MAXSCREENSMAP = [3, 5, 7];

const setupTileTypes = () => {
  tileTypes = {
    0: { type: 'roadTop', color: [50, 50, 50], img: roadTopImg },
    1: { type: 'sidewalk', color: [169, 169, 169], img: sidewalkImg },
    2: { type: 'grass', color: [34, 139, 34], img: grassImg },
    3: { type: 'water', color: [70, 130, 180], img: waterImg },
    4: { type: 'redCarpet', color: [255, 215, 0], img: carpetImg },
    5: { type: 'roadBot', color: [50, 50, 50], img: roadBotImg },
  };
}

const setupAggregateTypes = () => {
  // aggregate
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

const decideType = () => { return randIntLeftInclusiveRange(0, Object.keys(tileTypes).length) }

const decideScreens = () => { numScreens = randIntFromInclusiveRange(1, MAXSCREENSMAP[Game.difficulty]); }

const initMap = () => {
  decideScreens();
  let currType, prevType;
  
  for (let i = 0; i < numScreens; i += 1)
    for (let j = 0; j < Game.YBLOCKS; j += 1) {
      combinedMap.push([]);

      currType = prevType == 0 ? 5 : decideType();

      if (currType == 5 && prevType != 0 || prevType == 3)
        currType = 2;

      for (let k = 0; k < Game.XBLOCKS; k += 1) {
        combinedMap[j + i * Game.YBLOCKS][k + i * Game.XBLOCKS] = new Block(
          decideCoin(),
          null,
          Game.BLOCKSIZE * k + i * Game.YBLOCKS,
          Game.BLOCKSIZE * j + i * Game.XBLOCKS,
          currType,
        )
      }

      prevType = currType;
    }
}

function drawMap() {
  const rows = combinedMap.length;      // TODO consider the constants
  const cols = combinedMap[0].length;   // TODO ""
  
  const tileWidth = Game.LANEWIDTH * 2;
  const tileHeight = Game.BLOCKSIZE * 4;

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      const tileType = combinedMap[i][j].getType();
      const tile = tileTypes[tileType];     // ha, we could prob do this less ..circularly if it was bothersome

      if (tile && tile.img) {
        image(tile.img, j * tileWidth, i * tileHeight, tileWidth, tileHeight);
      } else {
        noStroke();
        fill(200); // Default color if image is not available
        rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
      }
    }
}

function adjustCamera(player) {
  let offsetX = width / 2 - player.xPos;
  let offsetY = height / 2 - player.yPos;

  // Keep camera within the map boundaries
  const maxOffsetX = 0;
  const maxOffsetY = 0;
  const minOffsetX = Math.min(0, width - combinedMap[0].length * Game.LANEWIDTH);
  const minOffsetY = Math.min(0, height - combinedMap.length * Game.BLOCKSIZE * 4);

  offsetX = constrain(offsetX, minOffsetX, maxOffsetX);
  offsetY = constrain(offsetY, minOffsetY, maxOffsetY);

  translate(offsetX, offsetY);
}

const isRoadTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'road' }
const isGrassTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'grass' }
const isWaterTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'water' }
const isCasinoTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'casino' }
const isSidewalkTile = (row, col) => { return tileTypes[combinedMap[row][col]].type === 'sidewalk' }
