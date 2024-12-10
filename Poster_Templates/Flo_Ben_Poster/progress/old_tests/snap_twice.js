let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375
let transitionScale = 1;
let previousCounter = -1;

let animationState = 0;
let stateTimer = 0;
let enterDuration = 45;
let exitDuration = 45;

function preload() {  
  for (let i = 0; i < 10; i++) {
    images[i] = loadImage(`/Poster_Templates/Flo_Ben_Poster/images/${i}.png`);
  }
}

function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  poster.setup(this, "models/movenet/model.json");
}

// function draw() {
//   background(poster.getCounter() % 2 === 0 ? 255 : 0);

//   if (poster.getCounter() !== previousCounter) {
//     transitionScale = 0;
//     previousCounter = poster.getCounter();
//   }

//   transitionScale += 0.03;

//   push();
//   imageMode(CENTER);

//   let anchorX = width / 2 + dynamicOffsetX(poster.getCounter());
//   let anchorY = height / 2 + dynamicOffsetY(poster.getCounter());
//   translate(anchorX, anchorY);

//   let incomingScale = transitionScale;

//   //kinda cool weird effect?
//   // let outgoingIndex = (poster.getCounter() % 10)
//   let incomingImage = images[poster.getCounter()];
//   image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
//   console.log(incomingImage.width, incomingImage.height)

//   pop();

//   poster.posterTasks();
// }

function draw() {
  background(poster.getCounter() % 2 === 0 ? 255 : 0);

  if (poster.getCounter() !== previousCounter) {
    animationState = 0;
    stateTimer = 0;
    previousCounter = poster.getCounter();
  }

stateTimer += 2 

    //enter animation
  if (animationState === 0) {
    transitionInScale = lerp(transitionInScale, 0.5, 0.5);
    if (stateTimer > enterDuration) {
      animationState = 1;
      stateTimer = 0;
    }
    //middle animation
  } else if (animationState === 1) {
    transitionInScale = 1;
    if (stateTimer > 15) { 
      animationState = 2;
      stateTimer = 0;
    }
    //exit animation
  } else if (animationState === 2) {
    transitionInScale = lerp(transitionInScale, 2, 0.5);
    if (stateTimer > exitDuration) {
      animationState = 0;
      stateTimer = 0;
      console.log('test')
    }
  }

  push();
  imageMode(CENTER);

  let anchorX = width / 2 + dynamicOffsetX(poster.getCounter());
  let anchorY = height / 2 + dynamicOffsetY(poster.getCounter());
  translate(anchorX, anchorY);

  let incomingImage = images[poster.getCounter()];
  image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);

  pop();

//   console.log(animationState, stateTimer)

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