class ModernSlotMachine {
  constructor() {
    this.slots = ['7', '7', '7'];
    this.symbols = ['🍒', '7', '💎', '🍀', '⭐', '🔔'];
    this.isSpinning = false;
    this.spinCost = 10;
    this.spinSpeed = 0;
    this.spinCount = 0;
    this.maxSpins = 20;
    this.colors = {
      background: color(31, 41, 55),
      machine: color(55, 65, 81),
      display: color(17, 24, 39),
      slot: color(255),
      button: color(220, 38, 38),
      buttonHover: color(185, 28, 28),
      text: color(255)
    };
  }

  setup() {
    // Create play button
    this.playButton = createButton(`Play for $${this.spinCost}`);
    this.playButton.position(width - 130, height - 120);
    this.playButton.mousePressed(() => this.startSpin());
    this.playButton.class('modern-button');
   
    // Add CSS for button styling
    let style = createElement('style');
    style.html(`
      .modern-button {
        background-color: #dc2626;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .modern-button:hover {
        background-color: #b91c1c;
      }
      .modern-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `);
  }

  draw() {
    background(this.colors.background);
    
    // Draw machine body
    this.drawMachineBody();
    
    // Draw money display
    this.drawMoneyDisplay();
    
    // Draw slots
    this.drawSlots();
    
    // Draw back button
    this.drawBackButton();
    
    // Update spin if active
    if (this.isSpinning) {
      this.updateSpin();
    }
  }

  drawBackButton() {
    // Similar to roulette.js implementation
    drawButton("Back to Casino", width / 6, height - 45, 200, 50);
    if (!mouseIsPressed || this.isSpinning) return;
    if (isButtonClicked(width / 6, height - 45, 200, 50)) {
      currentCasinoScreen = "landing";
      this.cleanup();
    }
  }

  drawMachineBody() {
    // Main body
    fill(this.colors.machine);
    rectMode(CENTER);
    rect(width/2, height/2, 500, 400, 20);
    
    // Top display
    fill(this.colors.display);
    rect(width/2, height/2 - 150, 450, 50, 10);
    
    // Bottom panel
    fill(this.colors.display);
    rect(width/2, height/2 + 150, 450, 50, 10);
    
    // Decorative circles
    fill(255, 204, 0);
    circle(width/2 - 100, height/2 + 150, 20);
    circle(width/2 + 100, height/2 + 150, 20);
  }

  drawMoneyDisplay() {
    fill(this.colors.text);
    textSize(24);
    textAlign(LEFT, TOP);
    text(`Money: $${money}`, 20, 20);
  }

  drawSlots() {
    const slotWidth = 100;
    const slotHeight = 150;
    const spacing = 120;
    const startX = width/2 - spacing;
    const y = height/2;
    
    for (let i = 0; i < 3; i++) {
      // Slot background
      fill(this.colors.slot);
      rectMode(CENTER);
      rect(startX + (i * spacing), y, slotWidth, slotHeight, 10);
      
      // Symbol
      fill(0);
      textSize(48);
      textAlign(CENTER, CENTER);
      text(this.slots[i], startX + (i * spacing), y);
    }
  }

  startSpin() {
    if (money < this.spinCost) {
      alert('Not enough money!');
      return;
    }
    
    if (!this.isSpinning) {
      money -= this.spinCost;
      this.isSpinning = true;
      this.spinCount = 0;
      this.spinSpeed = 10;
      this.playButton.attribute('disabled', '');
    }
  }

  updateSpin() {
    this.spinCount++;
    
    if (this.spinCount % 3 === 0) {
      // Update slots with random symbols
      this.slots = this.slots.map(() => 
        this.symbols[floor(random(this.symbols.length))]
      );
    }
    
    if (this.spinCount >= this.maxSpins) {
      this.finishSpin();
    }
  }

  finishSpin() {
    this.isSpinning = false;
    this.playButton.removeAttribute('disabled');
    
    // Check for win
    if (this.slots[0] === this.slots[1] && this.slots[1] === this.slots[2]) {
      const winAmount = 50;
      money += winAmount;
      alert(`Winner! You won $${winAmount}!`);
    }
  }

  cleanup() {
    if (this.playButton) {
      this.playButton.remove();
    }
  }
}

// P5.js interface functions
function preloadSlots() {
  slotMachine = new ModernSlotMachine();
}

function setupSlots() {
  slotMachine.setup();
}

function drawSlots() {
  slotMachine.draw();
}

function cleanupSlots() {
  if (slotMachine) {
    slotMachine.cleanup();
  }
}