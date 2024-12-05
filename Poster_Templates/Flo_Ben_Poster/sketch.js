let rotationHistory = [];
let font;
let image0, image1, image2, image3, image4, image5, image6, image7, image8, image9;
let aspectRatio = 1.375

let backgroundColor = 0;
let targetBackgroundColor = 255;
let colorDirection = 1; 

let resetFlag = false

let angle = 0
let yCoord = 0

let transitionScale = 1;
let previousCounter = -1;



function preload() {  
  image0 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/0.png');
  image1 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/1.png');
  image2 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/2.png');
  image3 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/3.png');
  image4 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/4.png');
  image5 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/5.png');
  image6 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/6.png');
  image7 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/7.png');
  image8 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/8.png');
  image9 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/9.png');
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

  transitionScale += 0.01;

  push();
  imageMode(CENTER);
  translate(width / 2, height / 2);

  let outgoingScale = 1 + transitionScale;
  let incomingScale = transitionScale;

  if (previousCounter > 0) {
    let outgoingImage = eval(`image${(previousCounter - 1) % 10}`);
    image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
  }

  let incomingImage = eval(`image${poster.getCounter()}`);
  image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);

  pop();

  poster.posterTasks();
}



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

function resetScale() {
    transitionScale = 1
}

// function transitionBackground() {
//   background(poster.getCounter() %  2 === 0 ? 255 : 0);

//   if (backgroundColor === targetBackgroundColor) {
//     targetBackgroundColor = random(255);
//   }
//   backgroundColor = lerp(backgroundColor, targetBackgroundColor, 0.1);
//   background(backgroundColor);

// }

// function transitionNumbers() {
//   console.log(transitionScale)
//   transitionScale += 0.06
//   if (transitionScale >= 2) {
//     transitionScale = 1
//   }
// }


function windowScaled() { 
  textSize(10 * poster.vw);
}

