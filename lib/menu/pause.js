
function drawPauseMenu() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Paused', width / 2, height / 2 - 100);

  drawButton('Resume', width / 2, height / 2, 200, 80);

  drawButton('Exit to Main Menu', width / 2, height / 2 + 100, 200, 80);
}

function handlePauseClick() {
  if (isButtonClicked(width / 2, height / 2, 200, 80)) {
      currentScreen = 'game';
  } else if (isButtonClicked(width / 2, height / 2 + 100, 200, 80)) {
      currentScreen = 'main';
  }
}
