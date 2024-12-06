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
        transitionScale = 0;
        previousCounter = poster.getCounter();
    }

    transitionScale += increment;

    if (transitionScale < 0.5) {
        increment = 0.05;
    } else {
        increment = 0;
        // increment = 1
    }

    push();
    imageMode(CENTER);

    let anchorX = width / 2 
    let anchorY = height / 2
    translate(anchorX, anchorY);

    let outgoingScale = 2*transitionScale;
    let incomingScale= transitionScale

    // let incomingImage = images[poster.getCounter()];
    let incomingImage = images[poster.getCounter() - 1];
    if (incomingImage === undefined) {
        incomingImage = images[9];
    }
    let outgoingImage = images[poster.getCounter()];
    // if (outgoingImage === undefined) {
    //     outgoingImage = images[9];
    // }

    image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
    image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
    

    pop();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}