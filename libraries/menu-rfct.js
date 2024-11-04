

/**
 * Description placeholder 
 * 
 * @class ClassName 
 * @typedef {ClassName} 
 * @author  Matt Wolffe
            this is refactoring and 
            integration of Will Stroud's code)
 * @classdesc 
 */
class Menu {
  #message;
  #powerUps;
  #cosmetics;
  #messageTimer;
  #currentScreen;
  #scrollPosition;

  constructor(hueSpeed=0.25) {
    /** @todo @mfwolffe I think I want static non constant on these */
    this.hue = 0;
    this.hueSpeed = hueSpeed;
    // this.bgColor = { r: 255, g: 0, b: 0 };

    this.#cosmetics = [
      { name: 'Hat', price: 100, owned: false },
      { name: 'Glasses', price: 50, owned: false },
      { name: 'Shirt', price: 200, owned: false },
      { name: 'Shoes', price: 150, owned: false },
      { name: 'Gloves', price: 75, owned: false },
      { name: 'Scarf', price: 80, owned: false }
    ];

    this.#powerUps = [
      { name: 'Speed Boost', price: 150, quantity: 0 },
      { name: 'Shield', price: 300, quantity: 0 },
      { name: 'Extra Life', price: 500, quantity: 0 },
      { name: 'Double Jump', price: 250, quantity: 0 },
      { name: 'Invisibility', price: 400, quantity: 0 },
      { name: 'Fire Resistance', price: 350, quantity: 0 }
    ];
  }

  updateHue() { this.hue = (this.hue + this.hueSpeed * deltaTime/1000) % 1 }

  colorizeBackground() {
    colorMode(RGB);

    this.updateHue();
    const bg = hsvToRgb(this.hue, 0.7, 0.95);
    background(bg.r, bg.g, bg.b);
  }
}