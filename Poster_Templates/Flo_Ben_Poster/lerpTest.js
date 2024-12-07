//TODO: incomingimage 0 - 0.5, outgoingimage 0.5 - 1
//TODO: lerp in and out of incoming and outgoing image

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;
let transitionOutScale = 0.5


let previousCounter = -1;
let increment = 0.05;
let transitionOutIncrement = 0.09
let transitionFlag = true;

let incomingImage;
let outgoingImage;

let incomingRotation
let targetRotation
let finalRotation

let startInScale
let startOutScale

// let transitionEndpoints = {
//     no1: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no2: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no3: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no4: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no5: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no6: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no7: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no8: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
//     no9: {endX: 0.5, endY: 0.5, endScale: 5.5, endRotation: 0.01},
// }

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
    background(50);

    outgoingImage = images[poster.getCounter()];
    incomingImage = images[poster.getCounter() - 1];
    if (incomingImage === undefined) {
        incomingImage = images[9];
    }

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.5;
        transitionInIncrement = 0.02;
        transitionOutIncrement = 0.09;

        incomingRotation = PI/2;
        previousCounter = poster.getCounter();
    }

    let targetInScale = 0.6;
    let targetOutScale = 3;

    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*4);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement);
    // transitionInScale = min(transitionInScale + transitionInIncrement, targetInScale);
    // transitionOutScale = min(transitionOutScale + transitionOutIncrement, targetOutScale);

    if (transitionInScale < targetInScale) {
        incomingRotation = lerp(incomingRotation, 0, 0.16);
    } else {
        incomingRotation = 0;
    }

    push();
    let incomingScale = transitionInScale;
    let outgoingScale = transitionOutScale;

    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
    pop();

    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    rotate(-incomingRotation);
    image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
    pop();

    pop();

    poster.posterTasks();
}


function windowScaled() {
    textSize(10 * poster.vw);
}