// this is mainly AI 😜😜😜
class CoinMultiplier extends PowerUp {
    #multiplier;

    constructor() {
      super('Coin Multiplier', 500, 1, () => this.applyEffect());
      this.updateMultiplier(2); // Default multiplier value
    }

    applyEffect() {
      const player = Game.player;
      player.coinMultiplier = this.fetchMultiplier();
      player.coinMultiplierTimer = 30; // Set timer to 30 seconds

      // Set a timer to reset the multiplier after a certain duration
      const intervalId = setInterval(() => {
        player.coinMultiplierTimer -= 1;
        if (player.coinMultiplierTimer <= 0) {
          player.coinMultiplier = 1; // Reset to default multiplier
          clearInterval(intervalId);
        }
      }, 1000); // Update every second
    }

    fetchMultiplier() { return this.#multiplier }
    updateMultiplier(multiplier) { this.#multiplier = multiplier }

    static handleKeyPress(key) {
      if (key === 'm') {
        Game.player.useCoinMultiplier();
      }
    }
  }
