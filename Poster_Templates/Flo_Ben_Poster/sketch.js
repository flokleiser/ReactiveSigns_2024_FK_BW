
let rotationHistory = [];
let font;
function preload() {  
  // font = loadFont('/Poster_Templates/Flo_Ben_Poster/barlow_condensed.otf');  
  font = loadFont('/Poster_Templates/Flo_Ben_Poster/Fit_Variable.otf');
  image1 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/1.png');
}
function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
 /*important!*/ poster.setup(this, "models/movenet/model.json");  // Don't remove this line. 
  textFont(font);
}

function draw() {
  // background(0);
  background(poster.getCounter %  2 === 0 ? 0 : 255);
 console.log(width, height);
  fill(255);
  wordEffect(poster.getCounter(), width / 2, height / 2);
  
  arc()


  //loading the images
  if (poster.getCounter() === 0) {
    // image(image1, 0, 0, width, height);
    console.log('test')
  }

/*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(10 * poster.vw);
}

function wordEffect(word, x, y) {
  let size = 1;
  push()
  translate(x, y)
  let rotation = (-PI * 0.25) + (poster.posNormal.x * 0.5 * PI)

  // find the center point of the textObject
  let maxSteps = 40;
  let maxSize = 600 * poster.vw
  let minSize = 80 * poster.vw
  let stepSize = abs(maxSize- minSize) / maxSteps;
  let colorStep = (255 / maxSteps);
  textSize(minSize);
 // translate((-(bbox.x)/2)-(bbox.w/2), (-(bbox.y)/2)+(bbox.h/2));

  // the background letters 
  for (let i = 0; i < rotationHistory.length; i++) {
    fill(colorStep*i);
    push()  
    
    // rotate(rotationHistory[i].rotation);
    size = maxSize-(stepSize*(i)) + Math.min(maxSize,minSize);
    textSize(size);
    let bbox = font.textBounds(rotationHistory[i].char, 0, 0);
    translate((-(bbox.x)/2)-(bbox.w/2), +(bbox.h/2));
    text(rotationHistory[i].char, 0, 0)
    pop();
  }

  historyObject = {rotation: rotation, char: ""+word}
  rotationHistory.push(historyObject);
  pop();
  if (rotationHistory.length > maxSteps) {
    rotationHistory.shift();
  }
  noFill();

}






