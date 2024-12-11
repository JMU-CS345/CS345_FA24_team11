

function drawGameOverScreen() {
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2 - 50);

  // Back to Main Menu button
  drawButton('Back to Main Menu', width / 2, height / 2 + 50, 250, 80);
}

function handleGameOverClick() {
  if (isButtonClicked(width / 2, height / 2 + 50, 250, 80)) {
      currentScreen = 'main';
  }
}
