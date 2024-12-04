
/** @todo @mfwolffe idk if inheritance is right for the menus */
class StoreMenu {
  static scrollPosition = 0;
  static equippedCosmetic = "default"; // Track currently equipped cosmetic

  static powerUps = [
    { name: "Shield", price: 300, quantity: 0 },
    { name: "Dash", price: 250, quantity: 0 },
    { name: 'Coin Multiplier', price: 500, quantity: 0 },
    // { name: "Speed Boost", price: 150, quantity: 0 },
    // { name: "Extra Life", price: 500, quantity: 0 },
    // { name: "Invisibility", price: 400, quantity: 0 },
    // { name: "Fire Resistance", price: 350, quantity: 0 },
  ];

  static cosmetics = [
    { name: "orange", price: 100, owned: false, spriteFile: 'orangeR.png', equipped: false },
    { name: "puple", price: 500, owned: false, spriteFile: 'purpleR.png', equipped: false },
    { name: "blue", price: 200, owned: false, spriteFile: 'blueR.png', equipped: false },
  ];

  static drawStoreMenu() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Store", width / 2, 50);

    drawButton("Back", width / 2, height - 45, 200, 50);
    drawButton("Cosmetics", width / 4, height / 2, 300, 100);
    drawButton("Power-ups", (3 * width) / 4, height / 2, 300, 100);
  }

  static drawSubmenu(items) {
    text(currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1), width / 2, 50);

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

        if (currentScreen === "cosmetics") {
          if (items[i].owned) {
            if (items[i].equipped) {
              fill(100, 200, 100);
              text("Equipped", x + Game.ITEMWIDTH / 2, 280);
              drawButton("Unequip", x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40);
            } else {
              fill(150);
              text("Owned", x + Game.ITEMWIDTH / 2, 280);
              drawButton("Equip", x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40);
            }
          } else {
            drawButton("Buy", x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40);
          }
        } else {
          drawButton("Buy", x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40);
        }
      }
    }
    pop();

    drawScrollArrows();
    drawButton("Back", width / 2, height - 45, 200, 50);
  }

  static equipCosmetic(cosmeticName) {
    // Unequip all cosmetics first
    StoreMenu.cosmetics.forEach(item => item.equipped = false);

    // Find and equip the selected cosmetic
    const cosmetic = StoreMenu.cosmetics.find(item => item.name === cosmeticName);
    if (cosmetic && cosmetic.owned) {
      cosmetic.equipped = true;
      // Update player sprite
      Game.player.sprite = loadImage(`assets/${cosmetic.spriteFile}`);
      GameMenu.setMessage(`Equipped ${cosmeticName} cosmetic`);
    }
  }

  static unequipCosmetic() {
    // Unequip all cosmetics and revert to default sprite
    StoreMenu.cosmetics.forEach(item => item.equipped = false);
    Game.player.sprite = loadImage('assets/rSprite.png');
    GameMenu.setMessage("Reverted to default appearance");
  }

  static checkItemPurchase() {
    let items = currentScreen === "cosmetics" ? StoreMenu.cosmetics : StoreMenu.powerUps;

    for (let i = 0; i < items.length; i++) {
      let x = 50 + i * (Game.ITEMWIDTH + Game.ITEMGAP) - StoreMenu.scrollPosition;
      if (isButtonClicked(x + Game.ITEMWIDTH / 2, 320, Game.ITEMWIDTH - 50, 40)) {
        if (currentScreen === "cosmetics") {
          if (items[i].owned) {
            if (items[i].equipped) {
              StoreMenu.unequipCosmetic();
            } else {
              StoreMenu.equipCosmetic(items[i].name);
            }
          } else if (money >= items[i].price) {
            money -= items[i].price;
            items[i].owned = true;
            GameMenu.setMessage("Purchased " + items[i].name);
          } else {
            GameMenu.setMessage("Not enough money to buy " + items[i].name);
          }
        } else {
          if (money >= items[i].price) {
            money -= items[i].price;
            items[i].quantity++;
            StoreMenu.addPowerUpToInventory(items[i].name);
            GameMenu.setMessage("Purchased " + items[i].name);
          } else {
            GameMenu.setMessage("Not enough money to buy " + items[i].name);
          }
        }
        break;
      }
    }
  }


  static handleInventoryClick() {
    if (isButtonClicked(width / 2, height - 45, 200, 50)) {
      currentScreen = "main";
    }
  }

  static addPowerUpToInventory(powerUpName) {
    let powerUp;
    if (powerUpName === "Coin Multiplier") {
      powerUp = new CoinMultiplier();
    } else if (powerUpName === "Dash") {
      powerUp = new DashPowerUp();
    } else if (powerUpName === "Shield") {
      powerUp = new ShieldPowerUp();
    }

    if (powerUp) {
      Game.player.inventory.push(powerUp);
      console.log(`${powerUpName} added to inventory`);
    }
  }



  static getMaxScroll() {
    let items = currentScreen === "cosmetics" ? StoreMenu.cosmetics : StoreMenu.powerUps;
    return max(0, items.length * (Game.ITEMWIDTH + Game.ITEMGAP) - width + 50);
  }

  static drawInventory() {
    textSize(32);
    text("Colors and Powerups", width / 2, 50);

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
