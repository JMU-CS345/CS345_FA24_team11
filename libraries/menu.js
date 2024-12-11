let casinoInterface;
let gameMap;
let currentScreen = 'main';
let money = 1000;
let scrollPosition = 0;
let message = '';
let messageTimer = 0;
// Add this variable at the top with your other variables
let raccoonImg, coinSprite;

let game, player;

let blackJackInit = false;

// Add preload function to load the image before setup
function preload() {
  coinSprite = loadImage('assets/coin.gif');
  raccoonImg = loadImage('libraries/raccoon.jpg'); // Update with your actual image path
}

const itemWidth = 200;
const itemHeight = 250;
const itemSpacing = 20;
// Add these variables at the top with your other variables
let hue = 0;
let backgroundColor = { r: 255, g: 0, b: 0 };
const rainbowSpeed = 0.5; // Adjust this to change color transition speed

// Add this function to convert HSV to RGB
function hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}


let cosmetics = [
  { name: 'Hat', price: 100, owned: false },
  { name: 'Glasses', price: 50, owned: false },
  { name: 'Shirt', price: 200, owned: false },
  { name: 'Shoes', price: 150, owned: false },
  { name: 'Gloves', price: 75, owned: false },
  { name: 'Scarf', price: 80, owned: false }
];

let powerUps = [
  { name: 'Speed Boost', price: 150, quantity: 0 },
  { name: 'Shield', price: 300, quantity: 0 },
  { name: 'Extra Life', price: 500, quantity: 0 },
  { name: 'Dash', price: 250, quantity: 0 },
  { name: 'Coin Multiplier', price: 500, quantity: 0 },
  { name: 'Invisibility', price: 400, quantity: 0 },
  { name: 'Fire Resistance', price: 350, quantity: 0 }
];

function setup() {
  game = new Game(0);
  player = new Player(100, 100, 10, 10, 20, 20);
  createCanvas(1280, 720);
  textAlign(CENTER, CENTER);
  setupCasinoUI(); // Initialize casino interface
}

function draw() {
  // Update the hue
  hue = (hue + rainbowSpeed * deltaTime/1000) % 1;
  backgroundColor = hsvToRgb(hue, 0.7, 0.95); // Saturation 0.7, Value 0.95 for pastel-like colors

  // Set the background using the calculated color
  // background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
  background("teal");

  // Add a semi-transparent overlay to ensure text readability
  if (currentScreen === 'main') {
      push();
      noStroke();
      fill(255, 255, 255, 30);
      rect(0, 0, width, height);
      pop();
  }

  // Draw money counter with improved contrast
  fill(0);

  // Draw current screen
  switch(currentScreen) {
      case 'main':
          drawMainMenu();
          break;
      case 'store':
          drawStoreMenu();
          break;
      case 'cosmetics':
      case 'powerups':
          drawSubmenu(currentScreen === 'cosmetics' ? cosmetics : powerUps);
          break;
      case 'inventory':
          drawInventory();
          break;
      case 'game':
          drawGame();
          break;
      case 'difficulty':
          drawDifficultyMenu();
          break;
      case 'casino':
          // if (!blackJackInit) {
          //   setupBlackJack()
          //   blackJackInit = true;
          // }
          // drawBlackJack();
          // break;
  }


  // SEEME moved below to bring to front
  drawMoneyCounter();



  // Draw message with improved contrast
  if (messageTimer > 0) {
      drawMessage();
  }
}


function drawMoneyCounter() {
  push();
  textAlign(RIGHT, TOP);
  textSize(24);
  // Draw shadow
  fill(0, 0, 0, 50);
  text('$' + Game.player.currency, width - 18, 22);
  // Draw text
  // fill(0);
  fill("white")
  text('$' + Game.player.currency, width - 20, 20);
  pop();
}

// Separate function for message drawing with improved visibility
function drawMessage() {
  push();
  fill(0, 0, 0, 50);
  textSize(20);
  text(message, width/2 + 2, height - 98);
  fill(0);
  text(message, width/2, height - 100);
  messageTimer--;
  pop();
}

function drawMainMenu() {
  textAlign(CENTER, CENTER);
  textSize(40);
  text('Raccoon Rush', width/2, 50);
  push();
  imageMode(CENTER);
  // Draw image with a size of 200x200 pixels at the top of the menu
  image(raccoonImg, width/2 +400, 300, 400, 300);

  // Add a subtle frame around the image
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(width/2 + 200, 150,400, 300);
  pop();


  // Store button
  drawButton('Casino', width/2, height/2 + 180 , 200, 80);

  // Store button
  drawButton('Store', width/2, height/2 - 60, 200, 80);

  // Inventory button
  drawButton('Inventory', width/2, height/2 + 60, 200, 80);

  drawButton('Play Game', width/2, height/2 - 180, 200, 80);

}


function drawGame() {
  if (!gameMap) {
    gameMap = new GameMap();
  }

  // Draw the game map
  const map = gameMap.fetchMap();
  for (let i = 0; i < Game.YBLOCKS; i++) {
    for (let j = 0; j < Game.XBLOCKS; j++) {
      const block = map[i][j];
      // Draw each block - implement your visualization here
      // This is a placeholder visualization
      fill("teal");
      rect(j * 40, i * 40, 35, 35);
    }
  }

  // Game.MAP.renderCoins();
  // renderCoins();
  player.drawPlayer();
  player.handlePlayerMovement();

  // // Back button
  // drawButton('Back', width/2, height - 45, 200, 50);
}

function drawStoreMenu() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text('BUY PRODUCTS!!!!! SPEND SPEND SPEND', width/2, 50);

  // Cosmetics button
  drawButton('Cosmetics', width/4, height/2, 300, 100);

  // Power-ups button
  drawButton('Power-ups', 3*width/4, height/2, 300, 100);

  // Back button
  drawButton('Back', width/2, height - 45, 200, 50);
}

function drawSubmenu(items) {
  text(currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1), width/2, 50);

  // Clip the drawing area for scrolling
  push();
  translate(-scrollPosition, 0);
  for (let i = 0; i < items.length; i++) {
    let x = 50 + i * (itemWidth + itemSpacing);
    if (x + itemWidth > scrollPosition && x < scrollPosition + width) {
      fill(200, 200, 100);
      rect(x, 100, itemWidth, itemHeight);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(24);
      text(items[i].name, x + itemWidth/2, 140);
      textSize(20);
      text('$' + items[i].price, x + itemWidth/2, 180);

      // Add a "Buy" button or "Owned" text
      if (currentScreen === 'cosmetics' && items[i].owned) {
        fill(150);
        textSize(20);
        text('Owned', x + itemWidth/2, 320);
      } else {
        drawButton('Buy', x + itemWidth/2, 320, itemWidth - 50, 40);
      }
    }
  }
  pop();

  // Draw scroll arrows
  drawScrollArrows();

  // Back button
  drawButton('Back', width/2, height - 45, 200, 50);
}

function drawButton(label, x, y, w, h) {
  // Add button shadow for depth
  fill(0, 0, 0, 30);
  rect(x - w/2 + 4, y - h/2 + 4, w, h);

  // Draw button with gradient effect
  const buttonColor = color(100, 200, 100);
  const highlightColor = color(120, 220, 120);

  fill(buttonColor);
  if (mouseX > x - w/2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2) {
      fill(highlightColor);
  }

  rect(x - w/2, y - h/2, w, h);

  // Add slight inner shadow
  fill(0, 0, 0, 10);
  rect(x - w/2, y - h/2, w, 5);

  // Draw text with shadow for better readability
  fill(0, 0, 0, 50);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(label, x + 2, y + 2);

  fill(0);
  text(label, x, y);
}

function drawInventory() {
  textSize(32);
  text('DESIGNER FASHION AND POWERUPS', width/2, 50);

  let y = 100;
  textSize(24);
  text('Owned Cosmetics:', width/3, y);
  text('Power-ups:', 3*width/4, y);

  y += 40;
  textSize(20);
  textAlign(LEFT, TOP);

  // List owned cosmetics
  let ownedCosmetics = cosmetics.filter(item => item.owned);
  for (let item of ownedCosmetics) {
    text(item.name, 50, y);
    y += 30;
  }

  // Reset y for power-ups
  y = 140;
  // List power-ups and quantities
  for (let item of powerUps) {
    text(`${item.name}: ${item.quantity}`, width/2 + 50, y);
    y += 30;
  }

  // Back button
  drawButton('Back', width/2, height - 45, 200, 50);
}


function drawScrollArrows() {
  fill(150);
  if (scrollPosition > 0) {
    triangle(20, height/2, 50, height/2 - 30, 50, height/2 + 30);
  }
  if (scrollPosition < getMaxScroll()) {
    triangle(width - 20, height/2, width - 50, height/2 - 30, width - 50, height/2 + 30);
  }
}

function getMaxScroll() {
  let items = currentScreen === 'cosmetics' ? cosmetics : powerUps;
  return max(0, items.length * (itemWidth + itemSpacing) - width + 50);
}

function mousePressed() {
  switch(currentScreen) {
    case 'main':
      handleMainMenuClick();
      break;
    case 'store':
      handleStoreMenuClick();
      break;
    case 'cosmetics':
    case 'powerups':
      handleSubmenuClick();
      break;
    case 'inventory':
      handleInventoryClick();
      break;
    case 'casino':
      handleCasinoMenuClick();
      break;
    case 'game':
      handleGameClick();
      break;
    }
  }
  function handleGameClick() {
    if (isButtonClicked(width/2, height - 45, 200, 50)) {
      currentScreen = 'main';
      gameMap = null; // Reset game map when leaving
    }
  }

  function keyReleased() {
    console.log("here");
    console.log(key, keyCode);

    if (currentScreen == 'casino') keyReleasedBlackJack();
  }

  function handleMainMenuClick() {
    if (isButtonClicked(width/2, height/2 - 180, 200, 80)) {  // Play Game button
      currentScreen = 'game';
    } else if (isButtonClicked(width/2, height/2 - 60, 200, 80)) {  // Store button
      currentScreen = 'store';
    } else if (isButtonClicked(width/2, height/2 + 60, 200, 80)) {  // Inventory button
      currentScreen = 'inventory';
    } else if (isButtonClicked(width/2, height/2 + 180, 200, 80)) {  // Casino button
      currentScreen = 'casino';
      // currentCasinoScreen = 'landing';
    }
  }

function handleStoreMenuClick() {
  if (isButtonClicked(width/4, height/2, 300, 100)) {
    currentScreen = 'cosmetics';
    scrollPosition = 0;
  } else if (isButtonClicked(3*width/4, height/2, 300, 100)) {
    currentScreen = 'powerups';
    scrollPosition = 0;
  } else if (isButtonClicked(width/2, height - 45, 200, 50)) {
    currentScreen = 'main';
  }
}

function handleSubmenuClick() {
  if (isButtonClicked(width/2, height - 45, 200, 50)) {
    currentScreen = 'store';
  } else if (mouseX < 50 && scrollPosition > 0) {
    scrollPosition = max(0, scrollPosition - (itemWidth + itemSpacing));
  } else if (mouseX > width - 50 && scrollPosition < getMaxScroll()) {
    scrollPosition = min(getMaxScroll(), scrollPosition + (itemWidth + itemSpacing));
  } else {
    checkItemPurchase();
  }
}

function handleInventoryClick() {
  if (isButtonClicked(width/2, height - 45, 200, 50)) {
    currentScreen = 'main';
  }
}


function isButtonClicked(x, y, w, h) {
  return mouseX > x - w/2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2;
}

function checkItemPurchase() {
  let items = currentScreen === 'cosmetics' ? cosmetics : powerUps;
  for (let i = 0; i < items.length; i++) {
    let x = 50 + i * (itemWidth + itemSpacing) - scrollPosition;
    if (isButtonClicked(x + itemWidth/2, 320, itemWidth - 50, 40)) {
      if (currentScreen === 'cosmetics' && items[i].owned) {
        setMessage('Product already owned');
      } else if (money >= items[i].price) {
        money -= items[i].price;
        if (currentScreen === 'cosmetics') {
          items[i].owned = true;
        } else {
          items[i].quantity++;
        }
        setMessage('Purchased ' + items[i].name);
      } else {
        setMessage('Not enough money to buy ' + items[i].name);
      }
      break;
    }
  }
}

function setMessage(msg) {
  message = msg;
  messageTimer = 180; // Display message for 3 seconds (assuming 60 fps)
}
