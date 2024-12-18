//todo: incomingimage 0 - 0.5, outgoingimage 0.5 - 1

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;
let transitionScale = 0;
let previousCounter = -1;
let increment = 0.05;
let transitionFlag = true;

function preload() {
    for (let i = 0; i < 10; i++) {
        images[i] = loadImage( `/Poster_Templates/Flo_Ben_Poster/images/${i}.png` );
    }
}

function setup() {
    createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
    poster.setup(this, "models/movenet/model.json");
}

function draw() {
    // if outcomingimage gets drawn first, the background needs to be reversed
    // background(poster.getCounter() % 2 === 0 ? 0 : 255);

    //   background(poster.getCounter() % 2 === 0 ? 255 : 0);
      background(50)

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        previousCounter = poster.getCounter();
    }

    transitionInScale += transitionInIncrement;

    if (transitionInScale < 0.5) {
        transitionInIncrement = 0.05;
    } else {
        transitionInIncrement = 0;
        // increment = 1
    }

    push();
    imageMode(CENTER);

    let anchorX = width / 2 
    let anchorY = height / 2
    translate(anchorX, anchorY);

    let outgoingScale = transitionInScale;
    let incomingScale= transitionInScale + 1

    // let incomingImage = images[poster.getCounter()];
    let incomingImage = images[poster.getCounter() - 1];
    if (incomingImage === undefined) {
        incomingImage = images[9];
    }
    let outgoingImage = images[poster.getCounter()];

    image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
    image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
    

    pop();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}