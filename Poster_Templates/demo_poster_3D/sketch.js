let myFont;
let numbers = [];
function preload() {
  myFont = loadFont('barlow_condensed.otf');
  numbers[0] = loadModel('0.obj');
  numbers[1] = loadModel('1.obj');
  numbers[2] = loadModel('2.obj');
  numbers[3] = loadModel('3.obj');
  numbers[4] = loadModel('4.obj');
  numbers[5] = loadModel('5.obj');
  numbers[6] = loadModel('6.obj');
  numbers[7] = loadModel('7.obj');
  numbers[8] = loadModel('8.obj');
  numbers[9] = loadModel('9.obj');

}


function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight(), WEBGL); // Don't remove this line. 
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
  textFont(myFont); // impartant! WEBGL has no defualt font
  let cam = createCamera();
  console.log(cam)
}

function draw() {
  background(0,0,0);
  effect()
  /*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function effect() {
  console.log(poster.posNormal.x)
  //normalMaterial();
  pointLight(200, 200, 200, 0, 0, 50); // white light
  pointLight(200, 200, 200, 150, 200, 300); // white light
  noStroke();
  shininess(100);
  push();
  rotateZ(sin(frameCount * 0.01)*0.4); // light rotation animation 
  rotateX(-(PI/2) + (.5-poster.posNormal.x)); // interactive animation 
  scale(20, 20, 20);
  model(numbers[poster.getCounter()]);
  pop();
}

/**
 * Adjusts the rendering properties when the window is scaled.
 */
function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    }
}