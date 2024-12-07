let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375
let transitionScale = 0;
let previousCounter = -1;
let increment = 0.05;
// let transitionFlag = false;
let transitionFlag = true;

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
    // if outcomingimage gets drawn first, the background needs to be reversed
    background(poster.getCounter() % 2 === 0 ? 0: 255);

//   background(poster.getCounter() % 2 === 0 ? 255 : 0);

  if (poster.getCounter() !== previousCounter) {
    transitionInScale = 0;
    previousCounter = poster.getCounter();
  }

  transitionInScale += transitionInIncrement
  if (transitionInScale < 1) {
    transitionInIncrement = 0.08
    transitionFlag = true;
  } else {
    transitionInIncrement = 0
    // increment = 1
  }

  push();
  imageMode(CENTER);

  let anchorX = width / 2 + dynamicOffsetX(poster.getCounter());
  let anchorY = height / 2 + dynamicOffsetY(poster.getCounter());
  translate(anchorX, anchorY);

  let incomingScale = transitionInScale;
  let incomingImage = images[poster.getCounter()];

  let outgoingImage = images[poster.getCounter() - 1]
  if (outgoingImage === undefined) {
    outgoingImage = images[9];
  }

//   image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
//   image(outgoingImage, 0, -height/3, width * 0.2, (height / aspectRatio * 0.2) );
image(outgoingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
// image(incomingImage, 0, -height/3, width * 0.2, (height / aspectRatio * 0.2) );


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