class Carryable {
  #name;
  #price;


  constructor(name, price) {
    this.updateName(name);
    this.updatePrice(price);
  }

  fetchName() { return this.#name }
  fetchPrice()  { return this.#price }

  updateName(name) { this.#name = name }
  updatePrice(price) { this.#price = price }
}


class PowerUp extends Carryable {
  #effect;    // callback fn
  #quantity;

  constructor(name, price, quantity, effect) {
    super(name, price, quantity);
    this.updateQuantity(quantity);
    this.#effect = effect;
  }

  fetchQuantity() { return this.#quantity }
  updateQuantity(quantity) { this.#quantity = quantity }
}

class Cosmetic extends Carryable {
  #owned;

  constructor(name, price, owned) {
    super(name, price);
    /** @todo @mfwolffe throw?? */
    this.#owned = Boolean(owned);
  }
}

class CoinMultiplier extends PowerUp {
  #multiplier;

  constructor() {
    super('Coin Multiplier', 500, 1, () => this.applyEffect());
    this.updateMultiplier(2);
  }

  applyEffect() {
    const player = Game.player;
    player.coinMultiplier = this.fetchMultiplier();
    player.coinMultiplierTimer = 30; // Set timer to 30 seconds

    // Set a message to indicate the coin multiplier is activated
    Game.setMessage('Coin Multiplier Activated!');

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

  static handleCoinKeyPress(key) {
    if (key === 'q') {
      Game.player.useCoinMultiplier();
    }
  }
}

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

  static handleDashKeyPress(key) {
    if (key === ' ') {
      Game.player.useDashPowerUp();
    }
  }
}
