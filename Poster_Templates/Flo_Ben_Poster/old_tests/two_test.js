//idea: continuous "zoom in"

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375
let transitionScale = 1;
let previousCounter = -1;

function preload() {  
  for (let i = 0; i < 10; i++) {
    // images[i] = loadImage(`/Poster_Templates/Flo_Ben_Poster/images/originals/${i}.png`);
    images[i] = loadImage(`/Poster_Templates/Flo_Ben_Poster/images/${i}.png`);
  }
}

function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  poster.setup(this, "models/movenet/model.json");
}

function draw() {
  //remove background for kinda cool effect too
  background(poster.getCounter() % 2 === 0 ? 255 : 0);  
  // background(50)

  if (poster.getCounter() !== previousCounter) {
    transitionScale = 0;
    previousCounter = poster.getCounter();
  }

  transitionScale += 0.03;

  push();
  imageMode(CENTER);

  let anchorX = width / 2 + dynamicOffsetX(poster.getCounter());
  let anchorY = height / 2 + dynamicOffsetY(poster.getCounter());
  translate(anchorX, anchorY);
  // translate(width/2, anchorY);
  // translate(width / 2, height / 2);

  let outgoingScale = 1 + transitionScale;
  let incomingScale = transitionScale;
  let outgoingIndex = (poster.getCounter() - 1 + 10) % 10; 

  //kinda cool weird effect?
  // let outgoingIndex = (poster.getCounter() % 10)

  // tests with outgoing image thing
  // if (outgoingIndex >= 0) {
  //   let outgoingImage = images[outgoingIndex];
  //   image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
  // }

  let incomingImage = images[poster.getCounter()];
  let outgoingImage = images[poster.getCounter() - 1]
  if (outgoingImage === undefined) {
    outgoingImage = images[9];
  }
  image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
  // image(outgoingImage, 0, 0, width * 0.2, (height / aspectRatio * 0.2) );
  image(outgoingImage, 0, -height/3, width * 0.2, (height / aspectRatio * 0.2) );


  pop();

  poster.posterTasks();
}

function windowScaled() { 
  textSize(10 * poster.vw);
}


function dynamicOffsetX(counter) {
  // let offsets = [0, 50, -50, 100, -100, 75, -75, 125, -125, 0];
  let offsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return offsets[counter % offsets.length];
}

function dynamicOffsetY(counter) {
  // let offsets = [0, -50, 50, -100, 100, -75, 75, -125, -125, 150];
  let offsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return offsets[counter % offsets.length];
}