
/** @todo @mfwolffe idk if inheritance is right for the menus */
class StoreMenu {
  static scrollPosition = 0;

  static powerUps = [
    { name: "Speed Boost", price: 150, quantity: 0 },
    { name: "Shield", price: 300, quantity: 0 },
    { name: "Extra Life", price: 500, quantity: 0 },
    { name: "Dash", price: 250, quantity: 0 },
    { name: '2x Coins', price: 500, quantity: 0 },
    { name: "Invisibility", price: 400, quantity: 0 },
    { name: "Fire Resistance", price: 350, quantity: 0 },
  ];

  static cosmetics = [
    { name: "Hat", price: 100, owned: false },
    { name: "Glasses", price: 50, owned: false },
    { name: "Shirt", price: 200, owned: false },
    { name: "Shoes", price: 150, owned: false },
    { name: "Gloves", price: 75, owned: false },
    { name: "Scarf", price: 80, owned: false },
  ];

  static drawStoreMenu() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("BUY PRODUCTS!!!!! SPEND SPEND SPEND", width / 2, 50);

    drawButton("Back", width / 2, height - 45, 200, 50);
    drawButton("Cosmetics", width / 4, height / 2, 300, 100);
    drawButton("Power-ups", (3 * width) / 4, height / 2, 300, 100);
  }


  static drawSubmenu(items) {
    text(currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1), width / 2, 50);

    // Clip the drawing area for scrolling
    push();
    translate(-StoreMenu.scrollPosition, 0);
    for (let i = 0; i < items.length; i++) {
      let x = 50 + i * (Game.ITEMWIDTH + Game.ITEMGAP);
      if (x + Game.ITEMWIDTH > StoreMenu.scrollPosition && x < StoreMenu.scrollPosition + width) {
        fill(200, 200, 100);
        rect(x, 100, Game.ITEMWIDTH, Game.ITEMHEIGHT);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(items[i].name, x + Game.ITEMWIDTH / 2, 140);
        textSize(20);
        text("$" + items[i].price, x + Game.ITEMWIDTH / 2, 180);

        // Add a "Buy" button or "Owned" text
        if (currentScreen === "cosmetics" && items[i].owned) {
          fill(150);
          textSize(20);
          text("Owned", x + Game.ITEMWIDTH / 2, 320);
        } else {
          drawButton("Buy", x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40);
        }
      }
    }
    pop();

    // Draw scroll arrows
    drawScrollArrows();

    drawButton("Back", width / 2, height - 45, 200, 50);
  }

  static handleInventoryClick() {
    if (isButtonClicked(width / 2, height - 45, 200, 50)) {
      currentScreen = "main";
    }
  }

  static checkItemPurchase() {
    let items = currentScreen === "cosmetics" ? StoreMenu.cosmetics : StoreMenu.powerUps;

    for (let i = 0; i < items.length; i++) {
      let x = 50 + i * (Game.ITEMWIDTH + Game.ITEMGAP) - StoreMenu.scrollPosition;
      if (isButtonClicked(x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40)) {
        if (currentScreen === "cosmetics" && items[i].owned) {
          GameMenu.setMessage("Product already owned");
        } else if (money >= items[i].price) {
          money -= items[i].price;
          if (currentScreen === "cosmetics") {
            items[i].owned = true;
          } else {
            items[i].quantity++;
          }
          GameMenu.setMessage("Purchased " + items[i].name);
        } else {
          GameMenu.setMessage("Not enough money to buy " + items[i].name);
        }
        break;
      }
    }
  }

  static getMaxScroll() {
    let items = currentScreen === "cosmetics" ? StoreMenu.cosmetics : StoreMenu.powerUps;
    return max(0, items.length * (Game.ITEMWIDTH + Game.ITEMGAP) - width + 50);
  }

  static drawInventory() {
    textSize(32);
    text("DESIGNER FASHION AND POWERUPS", width / 2, 50);

    let y = 100;
    textSize(24);
    text("Owned Cosmetics:", width / 3, y);
    text("Power-ups:", (3 * width) / 4, y);

    y += 40;
    textSize(20);
    textAlign(LEFT, TOP);

    // List owned cosmetics
    let ownedCosmetics = StoreMenu.cosmetics.filter((item) => item.owned);
    for (let item of ownedCosmetics) {
      text(item.name, 50, y);
      y += 30;
    }

    // Reset y for power-ups
    y = 140;

    // List power-ups and quantities
    for (let item of StoreMenu.powerUps) {
      text(`${item.name}: ${item.quantity}`, width / 2 + 50, y);
      y += 30;
    }

    drawButton("Back", width / 2, height - 45, 200, 50);
  }

  static handleStoreMenuClick() {
    if (isButtonClicked(width/4, height/2, 300, 100)) {
      currentScreen = 'cosmetics';
      StoreMenu.scrollPosition = 0;
    } else if (isButtonClicked(3*width/4, height/2, 300, 100)) {
      currentScreen = 'powerups';
      StoreMenu.scrollPosition = 0;
    } else if (isButtonClicked(width/2, height - 45, 200, 50)) {
      currentScreen = 'main';
    }
  }

  static handleSubmenuClick() {
    if (isButtonClicked(width/2, height - 45, 200, 50)) {
      currentScreen = 'store';
    } else if (mouseX < 50 && StoreMenu.scrollPosition > 0) {
      StoreMenu.scrollPosition = max(0, StoreMenu.scrollPosition - (Game.ITEMWIDTH + Game.ITEMGAP));
    } else if (mouseX > width - 50 && StoreMenu.scrollPosition < StoreMenu.getMaxScroll()) {
      StoreMenu.scrollPosition = min(StoreMenu.getMaxScroll(), StoreMenu.scrollPosition + (Game.ITEMWIDTH + Game.ITEMGAP));
    } else {
      StoreMenu.checkItemPurchase();
    }
  }
}
