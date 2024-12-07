let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;
let transitionScale = 1;
let previousCounter = -1;
let imageX = 0;
let rotationAngle
let animationProgress = 0;

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
  // background(60)

  if (poster.getCounter() !== previousCounter) {
    transitionInScale = 0;
    rotationAngle = -HALF_PI; 
    animationProgress = 0;   
    previousCounter = poster.getCounter();
  }

  animationProgress = min(animationProgress + 0.03, 1);
  rotationAngle = lerp(-HALF_PI, 0, animationProgress); 
  transitionInScale += 0.03;

  let imgWidth = width * transitionInScale;
  let imgHeight = (height / aspectRatio) * transitionInScale;

  push();

  if (poster.getCounter() % 2 === 0) {
      anchorX = 0; 
      anchorY = 0;
      translate(anchorX, anchorY);
  }
  else {
      anchorX = width;
      anchorY = height;
      translate(anchorX, anchorY);
  }

    rotate(rotationAngle);

    if (poster.getCounter() % 2 != 0) {
      translate(-imgWidth, -imgHeight);
    }
    // let imgWidth = width * transitionScale;
    // let imgHeight = (height / aspectRatio) * transitionScale;

    let incomingImage = images[poster.getCounter()];

    imageMode(CORNER);
    image(incomingImage, 0, 0, imgWidth, imgHeight);

  pop();

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