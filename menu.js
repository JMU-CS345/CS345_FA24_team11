let currentScreen = 'main';
let money = 1000;
let scrollPosition = 0;
let message = '';
let messageTimer = 0;

const itemWidth = 200;
const itemHeight = 250;
const itemSpacing = 20;

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
  { name: 'Double Jump', price: 250, quantity: 0 },
  { name: 'Invisibility', price: 400, quantity: 0 },
  { name: 'Fire Resistance', price: 350, quantity: 0 }
];

function setup() {
  createCanvas(1280, 720);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  
  // Draw money counter
  fill(0);
  textAlign(RIGHT, TOP);
  textSize(24);
  text('$' + money, width - 20, 20);
  
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
    case 'blackjack':
  }
  
  // Draw message
  if (messageTimer > 0) {
    fill(0);
    textSize(20);
    text(message, width/2, height - 100);
    messageTimer--;
  }
}

function drawMainMenu() {
  textAlign(CENTER, CENTER);
  textSize(40);
  text('Game Main Menu', width/2, 50);
    
  // Store button
    drawButton('Casino', width/2, height/2 + 180 , 200, 80);


  // Store button
  drawButton('Store', width/2, height/2 - 60, 200, 80);
  
  // Inventory button
  drawButton('Inventory', width/2, height/2 + 60, 200, 80);
}

function drawStoreMenu() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Store Menu', width/2, 50);
  
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
  fill(100, 200, 100);
  rect(x - w/2, y - h/2, w, h);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(label, x, y);
}

function drawInventory() {
  textSize(32);
  text('Inventory', width/2, 50);
  
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
  }
}

function handleMainMenuClick() {
  if (isButtonClicked(width/2, height/2 - 60, 200, 80)) {
    currentScreen = 'store';
  } else if (isButtonClicked(width/2, height/2 + 60, 200, 80)) {
    currentScreen = 'inventory';
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