let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;

let previousCounter = -1;
let increment = 0.05;
let transitionFlag = true;

let incomingImage;
let outgoingImage;
let startInScale
let startOutScale

let transitionInScale = 0;
let transitionOutScale = 0.6;
let transitionInIncrement = 0.06;
let transitionOutIncrement = 0.09;
let incomingRotation = 0;
let outgoingRotation = 0;

let transitionInProgress
let transitionOutProgress

let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 
let currentIncomingAnchor

let anchorPoints = [
    // 0
    { x: 0.4, y: 0.23 },
    // 1
    { x: -0.1, y: -0.2 },
    // 2 
    { x: -0.4, y: -0.4 },
    // 3 
    { x: -0.4, y: -0.4 },
    // 4 
    { x: 0.4, y: 0.15},
    // 5 
    { x: 0.4, y: 0.23},
    // 6 
    { x: 0.3, y: 0.23},
    // 7 
    { x: -0.05, y: -0.4 },
    // 8 
    { x: 0.35, y: 0.15 },
    // 9 
    { x: -0.35, y: -0.2}
];

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
    background(poster.getCounter() % 2 === 0 ? 255 : 0);
    // background(50)

    let outgoingIndex = poster.getCounter();
    let incomingIndex = (poster.getCounter() - 1 + images.length) % images.length;

    outgoingImage = images[outgoingIndex];
    incomingImage = images[incomingIndex];

    let currentIncomingAnchor = anchorPoints[incomingIndex - 1];
    let targetOutgoingAnchor = anchorPoints[outgoingIndex];
    let targetIncomingAnchor = anchorPoints[incomingIndex];

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.6;
        transitionInIncrement = 0.016;
        transitionOutIncrement = 0.18;

        incomingRotation = PI / 2; 
        outgoingRotation = 0;
        currentOutgoingAnchor = { x: 0, y: 0};
        previousCounter = poster.getCounter();

        transitionInProgress = 0; 
        transitionOutProgress = 0; 
    }

    let targetInScale = 0.6;
    // let targetOutScale = 2.5
    let targetOutScale = 4.5

    //--------------- SCALE EASING -------------------

    //fast speed
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*4);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.35);

    //middle speed
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*3);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.3);

    //slow speed
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*1.55);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.25);

    let transitionProgress = 0.026
    
    //out easing tests
    transitionInProgress += transitionProgress * 1.683
    transitionInProgress = constrain(transitionInProgress, 0, 3);
    transitionInScale = transitionInProgress * transitionInProgress * targetInScale/8;

    transitionOutProgress += transitionProgress;
    transitionOutProgress = constrain(transitionOutProgress, 1, 3);
    transitionOutScale = transitionOutProgress * transitionOutProgress * targetOutScale/8;

    //------------------------------------------------


    //-------------- ANCHORPOINT EASING --------------

    // works with lerp
    // currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement);
    // currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement);

    // works with other easing
    // currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement/5);
    // currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement/5);
    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement/10);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement/10);


    //------------------------------------------------

    if (transitionInScale < targetInScale) {
        incomingRotation = lerp(incomingRotation, 0, 0.16);
    } else {
        incomingRotation = 0;
    }

    if (transitionOutScale < targetOutScale) {
        outgoingRotation = lerp(outgoingRotation, PI / 2, 0.16);
    } else {
        outgoingRotation = 0
    }

    push();
        imageMode(CENTER);
        translate(
            width / 2 - (currentOutgoingAnchor.x) * width * transitionOutScale,
            height / 2 - (currentOutgoingAnchor.y) * height / aspectRatio * transitionOutScale
        );
        image(outgoingImage, 0, 0, width * transitionOutScale, (height / aspectRatio) * transitionOutScale);
    pop();

    push();
        imageMode(CENTER);
        translate(width / 2, height / 2);
        // translate(
        //     width / 2 - (currentIncomingAnchor.x) * width * transitionOutScale,
        //     height / 2 - (currentIncomingAnchor.y) * height / aspectRatio * transitionOutScale
        // );
        image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    pop();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}

// function normalizeAnchors() {
//     let normalizedIncomingAnchor = floor(currentIncomingAnchor)
//     let normalizedOutgoingAnchor = floor(currentOutgoingAnchor)
//     return normalizedIncomingAnchor, normalizedOutgoingAnchor
// }