let font;
function preload() {  
  // load the font
  font = loadFont('barlow_condensed.otf');
}
function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
 /*important!*/ poster.setup(this, "models/movenet/model.json");  // Don't remove this line. 
  textFont(font);
}

function draw() {
  background(0, 0, 0, 20);
  fill(255);
  wordEffect(poster.getCounter(), width / 2, height / 2);
/*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  textSize(10 * poster.vw);
}

function wordEffect(word, x, y) {
  push()
    textSize(120 * poster.vw);
    translate(x, y)
    let rotation = (-PI * 0.25) + (poster.posNormal.x * 0.5 * PI)
    rotate(rotation);
    // The textBounds function returns the bounding box of the text.
    // This can be very useful when you need to precisely position text.
    let bbox = font.textBounds(""+word, 0, 0,);
    translate((-(bbox.x)/2)-(bbox.w/2), +(bbox.h/2));
    // uncommment the following line to see the bounding box
    // rect(bbox.x, bbox.y, bbox.w, bbox.h);
    text(""+word, 0, 0)
  pop();
}






