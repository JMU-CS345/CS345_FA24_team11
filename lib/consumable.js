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

    this.setMessage('2x Coins Activated!');
  }

  fetchMultiplier() { return this.#multiplier }
  updateMultiplier(multiplier) { this.#multiplier = multiplier }

  static handleCoinKeyPress(key) {
    if (key === 'q') {
      Game.player.useCoinMultiplier();
      Game.coinMultiplier = 2;
    }
  }

  // Displays when coin mult is activated
  setMessage(msg) {
    const messageElement = document.createElement('div');
    Object.assign(messageElement.style, {
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 1000
    });
    messageElement.innerText = msg;
    document.body.appendChild(messageElement);

    // Remove the message after 3 seconds
    setTimeout(() => document.body.removeChild(messageElement), 3000);
  }
}

class DashPowerUp extends PowerUp {
  constructor() {
    super('Dash', 200, 1, () => this.applyEffect());
  }

  applyEffect() {
    const player = Game.player;
    const dashDistance = Game.BLOCKSIZE * 8;
    const duration = 0.1;
    const startTime = millis();
    const startX = player.xPos;
    const startY = player.yPos;
    let targetX = startX;
    let targetY = startY;

    switch (player.facing) {
      case 'up':
        targetY = max(0, startY - dashDistance);
        break;
      case 'down':
        targetY = min(Game.CANVAS.HEIGHT - Game.PLAYERSIZE, startY + dashDistance);
        break;
      case 'left':
        targetX = max(0, startX - dashDistance);
        break;
      case 'right':
        targetX = min(Game.CANVAS.WIDTH - Game.PLAYERSIZE, startX + dashDistance);
        break;
    }

    const updatePosition = () => {
      const elapsedTime = (millis() - startTime) / 1000;
      const t = min(elapsedTime / duration, 1); // Ensure t does not exceed 1
      player.xPos = lerp(startX, targetX, t);
      player.yPos = lerp(startY, targetY, t);

      if (t < 1) {
        requestAnimationFrame(updatePosition);
      }
    };

    updatePosition();
  }

  static handleDashKeyPress(key) {
    if (key === ' ') {
      Game.player.useDashPowerUp();
    }
  }
}

class ShieldPowerUp extends PowerUp {
  constructor() {
    super('Shield', 300, 1, () => this.applyEffect());
  }

  applyEffect() {
    Game.player.shield = true;
    this.setMessage('Shield Activated!');

    setTimeout(() => {
      Game.player.shield = false;
    }, 8000);

  }

  setMessage(msg) {
    const messageElement = document.createElement('div');
    Object.assign(messageElement.style, {
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 1000
    });
    messageElement.innerText = msg;
    document.body.appendChild(messageElement);

    // Remove the message after 3 seconds
    setTimeout(() => document.body.removeChild(messageElement), 3000);
  }

  static handleShieldKeyPress(key) {
    if (key === 'e') {
      Game.player.useShieldPowerUp();
    }
  }
}
