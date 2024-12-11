class MenuRaccoon {
  constructor() {
    // Sprite and animation properties
    this.sprite = loadImage('assets/rSprite.png');
    this.spriteWidth = 32;  // Original sprite dimensions
    this.spriteHeight = 32;
    this.displayWidth = this.spriteWidth * 6;  // Larger display size for menu
    this.displayHeight = this.spriteHeight * 6;
    this.currentFrame = 0;
    this.frameCount = 0;
    this.animationSpeed = 15;  // Slower speed for menu animation
    
    // Animation frames mapping (using the idle animation)
    this.animation = {
      row: 7,        // Using the 'down' facing idle animation
      frames: 8,     // Number of frames in the animation
      startFrame: 0  // Starting frame index
    };
  }

  updateAnimation() {
    this.frameCount++;
    if (this.frameCount >= this.animationSpeed) {
      // Cycle through frames
      this.currentFrame = (this.currentFrame + 1) % this.animation.frames;
      this.frameCount = 0;
    }
  }

  draw() {
    try {
      // Calculate source rectangle from sprite sheet
      const sx = (this.currentFrame + this.animation.startFrame) * this.spriteWidth;
      const sy = this.animation.row * this.spriteHeight;

      push();  // Save current rendering state
      noSmooth();  // Ensure pixel-perfect rendering
      imageMode(CENTER);  // Center the image on position

      // Draw the current frame
      image(
        this.sprite,
        width * 0.7,  // Calculate position each frame
        height * 0.5,
        this.displayWidth,
        this.displayHeight,
        sx,
        sy,
        this.spriteWidth,
        this.spriteHeight
      );

      pop();  // Restore previous rendering state
    } catch (error) {
      // Fallback to simple rectangle if sprite fails to load
      fill("blue");
      rect(width * 0.7, height * 0.5, this.displayWidth, this.displayHeight);
      console.error('Error drawing menu raccoon:', error);
    }
  }
}