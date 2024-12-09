let game, menu;
/* ADD SPRITE VARIABLES HERE */
let coinSprite;
let raccoonImg;
let racoonSprite;
let roadBotImg, roadTopImg, sidewalkImg, grassImg, waterImg, carpetImg;

function preload() {
    /* LOAD SPRITES HERE */
    coinSprite = loadImage('assets/coin.gif');
    raccoonImg = loadImage('assets/raccoon.jpg');
    racoonSprite = loadImage('assets/raccoon.jpg');
    grassImg = loadImage('assets/mapGraphics/grass.png');
    waterImg = loadImage('assets/mapGraphics/water2.png');
    bridgeImg = loadImage('assets/mapGraphics/bridge.png');
    roadBotImg = loadImage('assets/mapGraphics/roadBot.png');
    roadTopImg = loadImage('assets/mapGraphics/roadTop.png');
    carpetImg = loadImage('assets/mapGraphics/redCarpet.png');
    sidewalkImg = loadImage('assets/mapGraphics/sidewalk2.png');
    // casinoImg = loadImage('assets/mapGraphics/casino.png');
    preloadCasino();
    preloadSlots();
    
    // Initialize menu sprite
    GameMenu.initializeSprite();
}

  function setup() {
    /** @todo @mfwolffe don't forget about difficulty */
    game = new Game(1, 1280, 720);
    menu = new Menu(0.5);

    // if you see the error thrown below
    // in console, you are likely just
    // missing an instance of a game.
    if (!Game.difficulty) throw new Error("Game not initialized");

    /* ADD STUFF THAT DEPENDS ON `Game` BELOW HERE AS NEEDED */
    createCanvas(Game.CANVAS.WIDTH, Game.CANVAS.HEIGHT);
    textAlign(CENTER, CENTER);

    setupTileTypes();
    setupAggregateTypes();
    initMap();
}

function mousePressed() {
    switch(currentScreen) {
        case 'main': GameMenu.handleMainMenuClick(); break;
        case 'store': StoreMenu.handleStoreMenuClick(); break;
        case 'cosmetics':
        case 'powerups': StoreMenu.handleSubmenuClick(); break;
        case 'inventory': StoreMenu.handleInventoryClick(); break;
        case 'casino': handleCasinoMenuClick(); break;
        case 'game': Game.handleGameClick(); break;
        case 'difficulty': handleDifficultyClick(); break;
    }
}

function keyReleased() {
    if (currentScreen == 'game') {
        Game.player.keyReleased();
    }
}

function keyPressed() {
    if (currentScreen == 'game') {
        CoinMultiplier.handleCoinKeyPress(key);
        DashPowerUp.handleDashKeyPress(key);
    }
    if (currentCasinoScreen == 'blackjack') keyPressedBlackJack(keyCode);
    if (currentScreen === 'main' && key === ' ') Game.describeGame();
}

function draw() {
    /** @todo @mfwolffe don't call this here */
    colors = {
      background: color(31, 41, 55),
     machine: color(55, 65, 81),
     display: color(17, 24, 39),
     button: color(220, 38, 38),
     buttonHover: color(185, 28, 28),
     text: color(255)
    }
    background(colors.background);
    switch(currentScreen) {
        case 'game': Game.drawGame(); break;
        case 'difficulty': drawDifficultyMenu(); break;
        case 'main': GameMenu.drawMenu(); break;
        case 'store': StoreMenu.drawStoreMenu(); break;
        case 'casino': setupCasinoUI(); drawCasino(); break;
        case 'inventory': StoreMenu.drawInventory(); break;
        case 'powerups': /** @todo @mfwolffe don't do below like that, inject it */
        case 'cosmetics': StoreMenu.drawSubmenu(currentScreen === 'cosmetics' ? StoreMenu.cosmetics : StoreMenu.powerUps);
            break;
        default:
            console.log("BAD SCENE");
            break;
    }
}