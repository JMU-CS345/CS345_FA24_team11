const mainMap = [];

const tileTypes = {0: 'road', 1: 'sidewalk'};

const rows = mainMap.length;
const cols = mainMap[0].length;
const tileWidth = GAME.LANEWIDTH;
const tileHeight = 720 / rows;

function setup() {
  createCanvas(720, 1280);
}

function draw() {
  background(220);
  drawMap();
}

/**
 * Placeholder for drawing the map using colors
 */
function drawMap() {
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          let tileType = tileTypes[mainMap[row][col]];
          if (tileType === 'road') {
              fill(50, 50, 50);
          } else if (tileType === 'sidewalk') {
              fill(200, 200, 200);
          }
          noStroke();
          rect(col * tileWidth, row * tileHeight, tileWidth, tileHeight);
      }
  }
}

function isRoadTile(row, col) {
  return tileTypes[map[row][col]] === 'road';
}

function isSidewalkTile(row, col) {
  return tileTypes[map[row][col]] === 'sidewalk';
}