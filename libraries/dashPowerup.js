class DashPowerUp extends PowerUp {
    constructor() {
      super('Dash', 200, 1, () => this.applyEffect());
    }

    applyEffect() {
      const player = Game.player;
      const dashDistance = Game.BLOCKSIZE * 2;

      switch (player.facing) {
        case 'up':
          player.updatePlayerYPos(-dashDistance);
          break;
        case 'down':
          player.updatePlayerYPos(dashDistance);
          break;
        case 'left':
          player.updatePlayerXPos(-dashDistance);
          break;
        case 'right':
          player.updatePlayerXPos(dashDistance);
          break;
      }
    }

    static handleKeyPress(key) {
      if (key === ' ') {
        Game.player.useDashPowerUp();
      }
    }
  }
