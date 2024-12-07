//TODO: incomingimage 0 - 0.5, outgoingimage 0.5 - 1
//TODO: lerp in and out of incoming and outgoing image

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;

let previousCounter = -1;
let increment = 0.05;
// let transitionOutIncrement = 0.09
let transitionFlag = true;

let incomingImage;
let outgoingImage;
let startInScale
let startOutScale

let transitionInScale = 0;
let transitionOutScale = 0.6;
let transitionInIncrement = 0.02;
let transitionOutIncrement = 0.09;
let incomingRotation = 0;

let transitionInProgress
let transitionOutProgress

let anchorPoints = [
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 },
    // { x: 0.5, y: 0.5 }

    { x: -0.3, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: -0.4, y: 0 }
];

let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 



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

    let outgoingIndex = poster.getCounter();
    let incomingIndex = (poster.getCounter() - 1 + images.length) % images.length;

    outgoingImage = images[outgoingIndex];
    incomingImage = images[incomingIndex];

    let targetOutgoingAnchor = anchorPoints[outgoingIndex];

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.6;
        transitionInIncrement = 0.02;
        transitionOutIncrement = 0.09;

        incomingRotation = PI / 2; 
        currentOutgoingAnchor = { x: 0, y: 0};
        previousCounter = poster.getCounter();

        transitionInProgress = 0; 
        transitionOutProgress = 0; 
    }

    let targetInScale = 0.6;
    // let targetOutScale = 3;
    let targetOutScale = 1.5

    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement * 4);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement);
    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*1.5);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.9);

    // other easing tests
    // transitionInProgress += 0.04;
    // transitionInProgress = constrain(transitionInProgress, 0, 1);
    // transitionInScale = transitionInProgress * transitionInProgress * targetInScale;
    // transitionOutProgress += 0.05;
    // transitionOutProgress = constrain(transitionOutProgress, 1, 2);
    // transitionOutScale = transitionOutProgress * transitionOutProgress * targetInScale;


    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement);

    if (transitionInScale < targetInScale) {
        incomingRotation = lerp(incomingRotation, 0, 0.16);
    } else {
        incomingRotation = 0;
    }

    push();
    imageMode(CENTER);
    translate(
        width / 2 - (currentOutgoingAnchor.x) * width * transitionOutScale,
        height / 2 - (currentOutgoingAnchor.y) * height / aspectRatio * transitionOutScale
    );
 
    image(outgoingImage, 0, 0, width * transitionOutScale, (height / aspectRatio) * transitionOutScale);
    console.log("in: ", incomingIndex, "out: ", outgoingIndex);
    pop();

    push();
        imageMode(CENTER);
        translate(width / 2, height / 2);
        rotate(-incomingRotation);
        image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    pop();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}