let font;
function preload() {  
  font = loadFont('/Poster_Templates/Numbers_Test/barlow_condensed.otf');  
  image1 = loadImage('/Poster_Templates/Numbers_Test/images/1.png');
}
function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  textFont(font);
}

function draw() {
  background(poster.getCounter %  2 === 0 ? 0 : 255);
  fill(255);
  
}

function windowScaled() {
  textSize(10 * poster.vw);
}




