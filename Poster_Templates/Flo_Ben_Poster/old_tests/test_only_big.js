//todo: incomingimage 0 - 0.5, outgoingimage 0.5 - 1

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;
let transitionScale = 0;
let previousCounter = -1;
let increment = 0.05;
let transitionOutIncrement = 0.1
let transitionFlag = true;
// let outTransitionScale
let transitionOutScale 

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
    // background(poster.getCounter() % 2 === 0 ? 0 : 255);
    background(poster.getCounter() % 2 === 0 ? 255 : 0);
    // background(50)

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        previousCounter = poster.getCounter();
    }

    transitionInScale += transitionInIncrement;
    transitionOutScale += transitionOutIncrement;

    if (transitionInScale < 0.6) {
        transitionInIncrement = 0.05;
        // transitionOutIncrement = 0.01
        
    } else {
        transitionInIncrement = 0;
        transitionOutIncrement = 0 
    }



    push();
    imageMode(CENTER);

    let anchorX = width / 2 
    let anchorY = height / 2
    translate(anchorX, anchorY);

    let outgoingScale = transitionInScale;
    // let incomingScale= transitionScale + 0.6 
    let incomingScale= transitionOutIncrement
    

    let incomingImage = images[poster.getCounter()];
    let outgoingImage= images[poster.getCounter() - 1];
    if (outgoingImage === undefined) {
        outgoingImage = images[9];
    }

    image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
    image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
    

    pop();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}