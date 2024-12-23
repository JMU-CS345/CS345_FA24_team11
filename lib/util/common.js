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
const randIntFromInclusiveRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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
const randIntLeftInclusiveRange = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

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
const fastRandomIntegerFromRange = (min, max) =>
  (Math.random() * (max - min + 1)) << 0;

/**
 * Generate a random boolean
 *
 * @param   {*} prob the desired probability for `true`
 * @returns {boolean} a boolean with probability `prob` of being true
 */
const randomBoolean = (prob = 0.5) => Math.random() < prob;

/**
 * @see https://stackoverflow.com/a/54024653
 *
 * @author Kamil Kiełczewski (Stack Exchange)
 * @param {*} hue
 * @param {*} sat
 * @param {*} val
 * @returns {{}}
 */
const terseHSV2RGB = (hue, sat, val) => {
  const generator = (n, k = (n + hue / 60) % 6) =>
    val - val * sat * Math.max(Math.min(k, 4 - k, 1), 0);
  return generator(5), generator(3), generator(1);
};

/**
 * Description placeholder
 *
 * @param {*} h hue
 * @param {*} s saturation
 * @param {*} v value
 * @returns {{ r: any; g: any; b: any; }}
 */
function hsvToRgb(h, s, v) {
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

const fireObstacle = () => {
  if (hazardRows.length == 0)
    return;

  const frames = [[30 * 2, 30 * 4], [30 * 2, 30 * 2], [30, 30]]

  if (!(frameCount % randIntFromInclusiveRange(frames[Game.difficulty][0], frames[Game.difficulty][1]) == 0))
    return;

  const hzrd = hazardRows[selectHazard()];

  const type = hzrd.type;
  const yPos = hzrd.offset;

  let speed = randIntFromInclusiveRange(4, 10);

  const isTop = type == 0;
  if (isTop) speed = -speed;

  speed = 7;
  
  hazards.push({
    x: 0, 
    y: yPos, 
    sprite: selectCar(isTop), 
    move() { this.x += speed },
  });

  function selectHazard() {
    return randIntLeftInclusiveRange(0, hazardRows.length);
  }

  function selectCar(choice) {
    return cars[randIntLeftInclusiveRange(0, cars.length)][choice ? "left" : "right"];
  }
}

function checkCasinoEntry(player) {
  const row = Math.floor(player.yPos / Game.BLOCKSIZE);
  const col = Math.floor(player.xPos / Game.BLOCKSIZE);

  if (isCarpetTile(row, col)) {
      // Display prompt
      push();
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      stroke(0);
      strokeWeight(2);
      text("Press 'E' to enter Casino", width/2, height - 50);
      pop();
      
      // Check for 'E' key press
      if (keyIsDown(69)) { // 69 is keyCode for 'E'
          currentScreen = 'casino';
          currentCasinoScreen = 'landing';
      }
  }
}

const purgeObstacles = () => {
  hazards = hazards.filter((hzrd) => !(hzrd.x < -80 || hzrd.x > 1360));
}

const checkCoin = (player) => {
  const row = Math.floor(player.yPos / Game.BLOCKSIZE);
  const col = Math.floor(player.xPos / Game.BLOCKSIZE);

  const block = combinedMap[row][col];
  

  if (block.checkCoin()) {
    // console.log(`coin collide @ <${row}, ${col}>`);
    
    player.currency += Game.COINVALUE * Game.coinMultiplier;
    block.updateCoin(false);
  }; 
}

const checkCar = (player) => {
  const row = Math.floor(player.yPos / Game.BLOCKSIZE);
  const col = Math.floor(player.xPos / Game.BLOCKSIZE);

  let result = hazardRows.filter((obj) => obj.index == row);

  if (result.length == 0) return false;

  console.log("passed it");
  
  let carInRow = hazards.filter((car) => Math.floor(car.y / Game.BLOCKSIZE) == row);
  let carInCol  = carInRow.filter((car) => Math.floor(car.x / Game.BLOCKSIZE) == col);
  
  return carInCol.length > 0;
}

const drawMoneyCounter = () => {
  push();
  textAlign(RIGHT, TOP);
  textSize(40);
  // Draw shadow
  fill(0, 0, 0, 80);
  text("$" + Game.player.currency, width - 18, 22);
  // Draw text
  // fill(0);
  fill("white");
  text("$" + Game.player.currency, width - 20, 20);
  pop();
};

const drawMessage = () => {
  push();
  fill(0, 0, 0, 50);
  textSize(20);
  text(message, width / 2 + 2, height - 98);
  fill(0);
  text(message, width / 2, height - 100);
  messageTimer--;
  pop();
};

const drawScrollArrows = () => {
  fill(150);
  if (StoreMenu.scrollPosition > 0) {
    triangle(20, height / 2, 50, height / 2 - 30, 50, height / 2 + 30);
  }
  if (StoreMenu.scrollPosition < StoreMenu.getMaxScroll()) {
    triangle(
      width - 20,
      height / 2,
      width - 50,
      height / 2 - 30,
      width - 50,
      height / 2 + 30
    );
  }
};

const isButtonClicked = (x, y, w, h) => {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
};

const readableOverlay = () => {
  push();
  noStroke();
  fill(255, 255, 255, 30);
  rect(0, 0, width, height);
  pop();
};

const drawButton = (label, x, y, w, h) => {
  // Add button shadow for depth
  fill(0, 0, 0, 30);
  rect(x - w/2 + 4, y - h/2 + 4, w, h);

  // Draw button with new colors
  const buttonColor = color(220, 38, 38);      // Your button color
  const highlightColor = color(185, 28, 28);   // Your buttonHover color

  fill(buttonColor);
  if (mouseX > x - w/2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2) {
    fill(highlightColor);
  }

  rect(x - w/2, y - h/2, w, h);

  // Add slight inner shadow
  fill(0, 0, 0, 10);
 //rect(x - w/2, y - h/2, w, 5);

  // Draw text with shadow for better readability
  fill(0, 0, 0, 50);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(label, x + 2, y + 2);

  fill(255);  // Changed text color to white
  text(label, x, y);
};

function backToCasino() {
  let backButton = createButton("Back");
  backButton.position(90, 720);
  backButton.size(200, 50);
  backButton.style("background-color", "rgb(100, 200, 100)");
  backButton.style("color", "#fff");
  backButton.style("border", "none");
  backButton.style("font-size", "18px");
  // backButton.style("border-radius", "10px");
  backButton.mousePressed(() => {
    currentCasinoScreen = "landing";
    clear();
    removeRouletteElements();
    selectAll("input").forEach((input) => input.remove());
  });
}


