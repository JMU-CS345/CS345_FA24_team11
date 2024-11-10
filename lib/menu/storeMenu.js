
/** @todo @mfwolffe idk if inheritance is right for the menus */
class StoreMenu extends GameMenu {
  static drawMenu() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('BUY PRODUCTS!!!!! SPEND SPEND SPEND', width/2, 50);
    
    drawButton('Back', width/2, height - 45, 200, 50);
    drawButton('Cosmetics', width/4, height/2, 300, 100);
    drawButton('Power-ups', 3*width/4, height/2, 300, 100);
  }

  drawSubmenu(items) {
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


  handleInventoryClick() {
    if (isButtonClicked(width/2, height - 45, 200, 50)) {
      currentScreen = 'main';
    }
  }


  checkItemPurchase() {
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

  getMaxScroll() {
    let items = currentScreen === 'cosmetics' ? cosmetics : powerUps;
    return max(0, items.length * (itemWidth + itemSpacing) - width + 50);
  }

  drawInventory() {
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
}