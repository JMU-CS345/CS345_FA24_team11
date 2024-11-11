/** @todo @mfwolffe finish this */
/** @todo @mfwolffe document as you go */
/** @todo @mfwolffe tie in others' code e.g., for like mapgen */

/** @todo @mfwolffe figure out what you want to do w/ these vars */
const LANESMAP = [4, 8, 12];
const COINSMAP = [];

// spread this in defineProperty calls
// to cut down on duplicate literals.
const WEC = {
  writable: false,
  enumerable: true,
  configurable: false,
}

let currentScreen = 'main';
let blackJackInit = false;

/**
 * Game "Engine" for frogger clone
 *
 * @class Game
 * @typedef {Game}
 * @author Matt Wolffe @mfwolffe, ** ADD YOURSELF IF YOU EDIT **
 * @classdesc most properties are bound during runtime and are procedurally
 *            decided based on user-selected difficulty.
 *            A consequence of this is a lot of editors' intellisense or 
 *            whatever flavor of code completion you prefer will likely not
 *            pick up their existence and not suggest "`BLOCKSIZE`" while typing
 *            the below arbitrary line of code:
 *            `let thing = Game.BLOCKSIZE * 2`
 */
class Game {

  static player;
  static currentScene;

  constructor(difficulty, width=null, height=null) {
    if (![0, 1, 2].includes(difficulty))
      throw new Error(`Invalid difficulty param to Game Constructor: ${difficulty}`);

    // SEEME  this approach allows for the
    //        emulation of static constants
    //        in es6 classes.
    // SEEME  for difficulty field, a game object must
    //        be instantiated before trying to access
    //        through class - this provides a quick check
    //        for uninstantiated game
    // 
    Object.defineProperty(Game, 'difficulty', {
      value: difficulty,
      ...WEC,
    });
    Object.defineProperty(Game, 'BLOCKSIZE', {
      value: 20,
      ...WEC,
    });

    // SEEME  These props need more consideration 
    Object.defineProperty(Game, 'LANEWIDTH', {
      value: Game.BLOCKSIZE * 2,
      ...WEC,
    });
    Object.defineProperty(Game, 'OBSLEN', {
      value: Game.BLOCKSIZE * 2,
      ...WEC,
    });
    Object.defineProperty(Game, "OBSHGT", {
      value: Game.BLOCKSIZE * 2,
      ...WEC,
    });
    Object.defineProperty(Game, 'PLAYERSIZE', {
      value: Game.BLOCKSIZE,
      ...WEC,
    });

    Object.defineProperty(Game, "NUMLANES", {
      value: LANESMAP[this.difficulty],
      ...WEC,
    });
    Object.defineProperty(Game, "MAXDMGS", {
      value: [3, 6, 9],
      ...WEC,
    });
    Object.defineProperty(Game, "MAXSPDS", {
      value: [4, 8, 16],
      ...WEC,
    });
    Object.defineProperty(Game, "XSTARTLFT", {
      value: -(Game.OBSLEN + 2),
      ...WEC,
    });
    Object.defineProperty(Game, "XSTARTRGT", {
      value: width + Game.OBSLEN + 2,
      ...WEC,
    });
    Object.defineProperty(Game, "CANVAS", {
      value: {
        "WIDTH": width ?? 720,
        "HEIGHT": height ?? 1280,
      },
      ...WEC,
    });

    // TODO need to consider if lane block offsets 
    //      should be randomized
    //      in addition to whether there should be 
    //      multiple blocks on higher difficulties
    // 
    Object.defineProperty(Game, "LANEOFFSET", {
      value: Game.CANVAS.HEIGHT / 4,
      ...WEC,
    });
    // Object.defineProperty(Game, "LANECOORDS", {
    //   value:  [...Game.generateLaneCoords(Game.difficulty)],
    //   ...WEC,
    // });

    Object.defineProperty(Game, "XBLOCKS", {
      value: Game.CANVAS.WIDTH / Game.BLOCKSIZE,
      ...WEC,
    });
    Object.defineProperty(Game, "YBLOCKS", {
      value: Game.CANVAS.HEIGHT / Game.BLOCKSIZE,
      ...WEC,
    });
    Object.defineProperty(Game, "MAP", {
      value: new GameMap(),
      ...WEC,
    });

    Object.defineProperty(Game, "MAINMENU", {
      value: new GameMenu(),
      ...WEC,
    });

    Object.defineProperty(Game, "STARTX", {
      // value: width / 2 - Game.BLOCKSIZE / 2,
      value: 0, 
      ...WEC,
    });
    Object.defineProperty(Game, "STARTY", {
      // value: height -  (Game.BLOCKSIZE * 2),
      value: 0,
      ...WEC,
    });

    Object.defineProperty(Game, "ITEMWIDTH", {
      value: Game.BLOCKSIZE * 10,
      ...WEC,
    });
    Object.defineProperty(Game, "ITEMHEIGHT", {
      value: Game.ITEMWIDTH * 1.5,
      ...WEC,
    });
    Object.defineProperty(Game, "ITEMGAP", {
      value: Game.BLOCKSIZE,
      ...WEC,
    });



    Game.currentScene = "MAIN";

    Game.player = new Player(
      Game.STARTX,
      Game.STARTY,
      DEFAULTSPEED,
      DEFAULTSPEED,
      DEFAULTHEALTH,
      DEFAULTCURRENCY
    );
  }

  static drawGame() {
    if (!Game.MAP)
      alert("bad state; game not initialized by time of drawGame call");

    Game.renderGrid();
    Game.MAP.renderCoins();
    Game.player.drawPlayer();
    Game.player.handlePlayerMovement();
    
    drawButton('Back', width/2, height - 45, 200, 50);

    const bill = () => { console.log("bill") }


    checkSquares({x: Game.player.xPos, y: Game.player.yPos, w: Game.BLOCKSIZE, h: Game.BLOCKSIZE}, {x: 20, y: 0, w: Game.BLOCKSIZE, h: Game.BLOCKSIZE}) && bill();


  }

  static startGame() {
    GameMenu.drawMenu();
  }

  static handleGameClick() {
    console.log(Game.MAP.fetchMap());
    if (isButtonClicked(width/2, height - 45, 200, 50)) {
      currentScreen = 'main';
      
      Game.MAP.clearCoins();
      Game.MAP.populateCoins();
      
    }
  }

  static renderGrid() {
    for (let i = 0; i < Game.YBLOCKS; i++) {
      for (let j = 0; j < Game.XBLOCKS; j++) {
        fill("teal");
        rect(j * Game.BLOCKSIZE, i * Game.BLOCKSIZE, Game.BLOCKSIZE, Game.BLOCKSIZE);
      }
    }
  }
}
