function drawDifficultyMenu() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Select Difficulty', width/2, 50);

    // Easy button
    drawButton('Easy', width/2, height/2, 200, 80);

    // Medium button
    drawButton('Medium', width/2, height/2 + 100, 200, 80);

    // Hard button
    drawButton('Hard', width/2, height/2 + 200, 200, 80);

    // Back button
    drawButton('Back', width/2, height - 45, 200, 50);
}

function handleDifficultyClick() {
    if (isButtonClicked(width/2, height/2, 200, 80)) {
        Game.difficulty = 'easy';
        currentScreen = 'game';
    } else if (isButtonClicked(width/2, height/2 + 100, 200, 80)) {
        Game.difficulty = 'medium';
        currentScreen = 'game';
    } else if (isButtonClicked(width/2, height/2 + 200, 200, 80)) {
        Game.difficulty = 'hard';
        currentScreen = 'game';
    } else if (isButtonClicked(width/2, height - 45, 200, 50)) {
        currentScreen = 'main';
    }
}
