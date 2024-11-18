/** @todo @mfwolffe pre-commit? */
/** @todo @mfwolffe constants???? */
/** @todo @everyone come to consensus on style things */
/** @todo @mfwolffe submenu as own class?? */

let messageTimer = 0;


class GameMenu {
  static drawMenu() {
    // let rainbowSpeed = 0.8;
    // let hue = (0.5 + rainbowSpeed * deltaTime/1000) % 1;
    // let backgroundColor = hsvToRgb(hue, 0.7, 0.95);

    clear();
    background("teal");

    readableOverlay();

    textAlign(CENTER, CENTER);
    textSize(40);
    text('Raccoon Rush', width/2, 50);


    push();
    imageMode(CENTER);
    image(raccoonImg, width/2 +400, 300, 400, 300);
    noFill();
    stroke(255);
    strokeWeight(3);
    rect(width/2 + 200, 150,400, 300);
    pop();


    push()
    drawButton('Store', width/2, height/2 - 60, 200, 80);
    drawButton('Casino', width/2, height/2 + 180 , 200, 80);
    drawButton('Inventory', width/2, height/2 + 60, 200, 80);
    drawButton('Play Game', width/2, height/2 - 180, 200, 80);
    pop();

    fill(0);
    drawMoneyCounter();

    // Draw message with improved contrast
    if (messageTimer > 0) {
      drawMessage();
    }
  }

  static handleMainMenuClick() {
    if (isButtonClicked(width/2, height/2 - 180, 200, 80)) {  // Play Game button
      currentScreen = 'difficulty';
    } else if (isButtonClicked(width/2, height/2 - 60, 200, 80)) {  // Store button
      currentScreen = 'store';
    } else if (isButtonClicked(width/2, height/2 + 60, 200, 80)) {  // Inventory button
      currentScreen = 'inventory';
    } else if (isButtonClicked(width/2, height/2 + 180, 200, 80)) {  // Casino button
      currentScreen = 'casino';
      // currentCasinoScreen = 'landing';
    }
  }

  static setMessage(msg) {
    message = msg;
    messageTimer = 180; // Display message for 3 seconds (assuming 60 fps)
  }
}
