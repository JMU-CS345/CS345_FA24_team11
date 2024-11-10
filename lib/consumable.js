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
