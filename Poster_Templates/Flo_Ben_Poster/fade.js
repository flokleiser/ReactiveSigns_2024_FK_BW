let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;
let transitionScale = 1;
let previousCounter = -1;
let fadeAlpha = 0;
let fadingOut = false;

function preload() {
  for (let i = 0; i < 10; i++) {
    images[i] = loadImage(`/Poster_Templates/Flo_Ben_Poster/images/${i}.png`);
  }
}

function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  poster.setup(this, "models/movenet/model.json");
}

function draw() {
  background(poster.getCounter() % 2 === 0 ? 255 : 0);

  if (poster.getCounter() !== previousCounter) {
    transitionScale = 0;
    previousCounter = poster.getCounter();
  }

  transitionScale += 0.03;

  if (fadingOut) {
    fadeAlpha += 10;
    if (fadeAlpha >= 255) {
      fadeAlpha = 255;
      fadingOut = false;
      transitionScale = 0;
      previousCounter = poster.getCounter();
    }
  } else if (fadeAlpha > 0) {
    fadeAlpha -= 5; 
    if (fadeAlpha < 0) fadeAlpha = 0;
  }

  if (!fadingOut) {
    transitionScale += 0.03;

    push();
    imageMode(CENTER);

    let anchorX = width / 2 + dynamicOffsetX(poster.getCounter());
    let anchorY = height / 2 + dynamicOffsetY(poster.getCounter());
    translate(anchorX, anchorY);

    let incomingImage = images[poster.getCounter()];
    image( incomingImage, 0, 0, width * transitionScale, (height / aspectRatio) * transitionScale );

    pop();
  }

  push();
  noStroke();
  fill(poster.getCounter() % 2 === 0 ? 255 : 0, fadeAlpha); 
  rect(0, 0, width, height);
  pop();

  if (poster.getCounter() !== previousCounter && fadeAlpha === 0) {
    fadingOut = true;
  }

  poster.posterTasks();
}

function windowScaled() {
  textSize(10 * poster.vw);
}

function dynamicOffsetX(counter) {
  let offsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return offsets[counter % offsets.length];
}

function dynamicOffsetY(counter) {
  let offsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return offsets[counter % offsets.length];
}
