let myFont;
function preload() {
  myFont = loadFont('barlow_condensed.otf');
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
  //normalMaterial();
  pointLight(200, 200, 200, 0, 0, 50); // white light
  pointLight(200, 200, 200, 150, 200, 300); // white light
  noStroke();
  shininess(100);
  push();
  translate(-width/4,0,0);
  rotateZ(frameCount * 0.001);
  rotateX(-poster.posNormal.x*2);
  cylinder(poster.screens[0].w/4, poster.vh*30, 30, 1);
  pop();
  push();
  translate(width/4,0,0);
  rotateZ(frameCount * 0.001);
  rotateX(poster.posNormal.x*2);
  rotateY(frameCount * 0.001);
  torus(poster.vh*10, poster.vh*5);
  pop();
}

function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    }
}