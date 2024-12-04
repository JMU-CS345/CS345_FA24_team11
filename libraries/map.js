// Every nine rows is an entire screen of the game
const mainMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],

  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

let tileTypes;

function setupTileTypes() {
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

function drawMap() {
  const rows = mainMap.length;
  const cols = mainMap[0].length;
  const tileWidth = Game.LANEWIDTH * 2;
  const tileHeight = Game.BLOCKSIZE * 4;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const tileType = mainMap[i][j];
      const tile = tileTypes[tileType];

      if (tile && tile.img) {
        image(tile.img, j * tileWidth, i * tileHeight, tileWidth, tileHeight);
      } else {
        noStroke();
        fill(200); // Default color if image is not available
        rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
      }
    }
  }
}

function adjustCamera(player) {
  let offsetX = width / 2 - player.xPos;
  let offsetY = height / 2 - player.yPos;

  // Keep camera within the map boundaries
  const maxOffsetX = 0;
  const maxOffsetY = 0;
  const minOffsetX = Math.min(0, width - mainMap[0].length * Game.LANEWIDTH);
  const minOffsetY = Math.min(0, height - mainMap.length * Game.BLOCKSIZE * 4);

  offsetX = constrain(offsetX, minOffsetX, maxOffsetX);
  offsetY = constrain(offsetY, minOffsetY, maxOffsetY);

  translate(offsetX, offsetY);
}

function isRoadTile(row, col) {
  return tileTypes[mainMap[row][col]].type === 'road';
}

function isSidewalkTile(row, col) {
  return tileTypes[mainMap[row][col]].type === 'sidewalk';
}

function isGrassTile(row, col) {
  return tileTypes[mainMap[row][col]].type === 'grass';
}

function isWaterTile(row, col) {
  return tileTypes[mainMap[row][col]].type === 'water';
}

function isCasinoTile(row, col) {
  return tileTypes[mainMap[row][col]].type === 'casino';
}

function isBridgeTile(row,col) {
  return tileTypes[mainMap[row][col]].type === 'bridge';
}
