/** @todo @mfwolffe pre-commit? */
/** @todo @mfwolffe constants???? */
/** @todo @everyone come to consensus on style things */
/** @todo @mfwolffe submenu as own class?? */

let messageTimer = 0;


class GameMenu {
  static drawMenu() {
    colors = {
      background: color(31, 41, 55),
     machine: color(55, 65, 81),
     display: color(17, 24, 39),
     button: color(220, 38, 38),
     buttonHover: color(185, 28, 28),
     text: color(255)
    }
    clear();
    background(colors.background);

    readableOverlay();

    textAlign(CENTER, CENTER);
    textSize(60);
    push();
    textSize(80);
   textAlign(CENTER, CENTER);
   textStyle(BOLD);
   fill(17, 24, 39);
   text('RACCOON RUSH', width/2 + 4, 86);
   fill(255);
   text('RACCOON RUSH', width/2, 80);
   pop();


    push();
    imageMode(CENTER);
    noFill();
    pop();


    push()
    drawButton('Store', width/5, height/2 - 20, 200, 80);
    drawButton('Casino', width/5, height/2 + 220 , 200, 80);
    drawButton('Inventory', width/5, height/2 + 100, 200, 80);
    drawButton('Play Game', width/5, height/2 - 140, 200, 80);
    pop();

    fill(0);
    drawMoneyCounter();

    // Draw message with improved contrast
    if (messageTimer > 0) {
      drawMessage();
    }
  }

  static handleMainMenuClick() {
    if (isButtonClicked(width/5, height/2 - 140 , 200, 80)) {  // Play Game button
      currentScreen = 'difficulty';
    } else if (isButtonClicked(width/5, height/2 - 20, 200, 80)) {  // Store button
      currentScreen = 'store';
    } else if (isButtonClicked(width/5, height/2 + 100, 200, 80)) {  // Inventory button
      currentScreen = 'inventory';
    } else if (isButtonClicked(width/5, height/2 + 220 , 200, 80)) {  // Casino button
      currentScreen = 'casino';
      // currentCasinoScreen = 'landing';
    }
  }

  static setMessage(msg) {
    message = msg;
    messageTimer = 180; // Display message for 3 seconds (assuming 60 fps)
  }
}
