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
  background(poster.getCounter() % 2 === 0 ? 255 : 0);

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

  let incomingScale = transitionScale;

  //kinda cool weird effect?
  // let outgoingIndex = (poster.getCounter() % 10)
  let incomingImage = images[poster.getCounter()];
  image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
  console.log(incomingImage.width, incomingImage.height)

  pop();

  poster.posterTasks();
}



//old draw function
// function draw() {
//   background(poster.getCounter() %  2 === 0 ? 255 : 0);

//   /////// *lerp test ////////
//   // background(poster.getCounter() % 2 === 0 ? 255 : 0);
//   // targetColor = poster.getCounter() % 2 === 0 ? 0 : 255;
//   // backgroundColor = lerp(backgroundColor, targetBackgroundColor, 0.1);
//   // if (abs(backgroundColor - targetBackgroundColor) < 0.5) {
//   //   colorDirection *= -1;
//   //   targetBackgroundColor = colorDirection === 1 ? 255 : 0;
//   // }
//   // background(backgroundColor);



//   if (poster.getCounter() !== previousCounter) {
//     transitionScale = 1;
//     previousCounter = poster.getCounter();
//     console.log('test')
//   }

//   transitionScale += 0.01;




//   push()
//   translate(0,poster.getWindowWidth()/4)

//   transitionScale += 0.01

//   switch(poster.getCounter()) {
//     case 0:
//       image(image0, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       // console.log(transitionScale)
//       break;
//     case 1:
//       image(image1, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 2: 
//       image(image2, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 3: 
//       image(image3, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 4: 
//       image(image4, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 5: 
//       image(image5, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 6: 
//       image(image6, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 7: 
//       image(image7, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 8: 
//       resetFlag = true
//       image(image8, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     case 9: 
//       resetFlag = true
//       image(image9, 0, 0, width * transitionScale, (height/aspectRatio) * transitionScale);
//       break;
//     }

//     pop()

//   poster.posterTasks();
// }


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