let img;
let slotImgs = []; // Stores powerup images for the wheel
let slotSpeed = 10; // Speed of the wheel rotation
let slot1, slot2, slot3; // Wheel positions
let isSpinning = false; // Indicates if the wheel is spinning
let startButton;
let money = 1000;

function preloadSlots() {
  // Load powerup images
  slotImgs.push(loadImage('assets/double_jump_powerup_transparent.png'));
  slotImgs.push(loadImage('assets/extra_life_powerup_transparent.png'));
  slotImgs.push(loadImage('assets/fire_resistance_powerup_transparent.png'));
  slotImgs.push(loadImage('assets/invisibility_powerup_transparent.png'));
  slotImgs.push(loadImage('assets/shield_powerup_transparent.png'));
  slotImgs.push(loadImage('assets/speed_boost_powerup_transparent.png'));

  // Load slot machine background image
  img = loadImage('assets/transparent_slot_machine_converted.png');
}

function setupSlots() {

  // Create start button
  startButton = createButton('START');
  startButton.position(1150, 600);
  startButton.mousePressed(startGame);

  // Initialize wheel positions
  slot1 = floor(random(slotImgs.length));
  slot2 = floor(random(slotImgs.length));
  slot3 = floor(random(slotImgs.length));
}

function drawSlots() {
  background(220);
  image(img, 0, 0);

  // Display wheel
  displaySlot(slot1, width / 4);
  displaySlot(slot2, width / 2);
  displaySlot(slot3, width * 3 / 4);
  
  if (isSpinning) {
    spinSlots();
  }
}

function displaySlot(index, x) {
  image(slotImgs[index], x - 40, height - 100, 80, 80);
}

function spinSlots() {
  if (slotSpeed > 0) {
    slotSpeed -= 0.1;
  } else {
    if (slotSpeed < 0) {
      slotSpeed = 0;
    }
    if (slotSpeed === 0) {
      if (slot1 === slot2 && slot2 === slot3) {
        alert("You win!");
      }
      isSpinning = false;
    }
  }

  // Update wheel positions
  slot1 = (slot1 + 1) % slotImgs.length;
  slot2 = (slot2 + 1) % slotImgs.length;
  slot3 = (slot3 + 1) % slotImgs.length;
}

function startGame() {
  isSpinning = true;
  slotSpeed = 10;
}
