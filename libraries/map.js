const mainMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
];

const tileTypes = {0: 'road', 1: 'sidewalk', 2: 'grass', 3: 'river', 4: 'casino'};

const rows = mainMap.length;
const cols = mainMap[0].length;
const tileWidth = 1280 / cols;
const tileHeight = 720 / rows;

function setup() {
  createCanvas(1280, tileHeight * rows);
}

function draw() {
  background(220);
  drawMap();
}

/**
 * Placeholder for drawing the map using colors
 */
function drawMap() {
  for (let row = rows - 1; row >= 0; row--) { // Start from the bottom row
    for (let col = 0; col < cols; col++) {
      let tileType = tileTypes[mainMap[row][col]];
      if (tileType === 'road') {
        fill(50, 50, 50);
      } else if (tileType === 'sidewalk') {
        fill(200, 200, 200);
      } else if (tileType === 'grass') {
        fill(0, 100, 0);
      } else if (tileType === 'river') {
        fill(0, 0, 255);
      } else if (tileType === 'casino') {
        fill(255, 215, 0); // Casino color
      }
      noStroke();
      rect(col * tileWidth, (rows - 1 - row) * tileHeight, tileWidth, tileHeight); // Adjust the y-coordinate
    }
  }
}

function isRoadTile(row, col) {
  return tileTypes[mainMap[row][col]] === 'road';
}
