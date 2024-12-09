//TODO: Proper eases
//TODO: ADJUST ANCHORPOINTS
//TODO: Replace PNGs
//TODO: Fix outgoing animation 

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
let transitionOutScale = 1.7;

let targetInScale = 1.7;
let targetOutScale = 4.6;

let transitionInIncrement = 0.06;
let transitionOutIncrement = 0.09;
let incomingRotation = 0;

let mappedViewerX 
let mappedViewerY
let originalViewerX 
let originalViewerY

let blurAmount

let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 
let currentIncomingAnchor = { x: 0, y: 0 }; 

let totalDuration
let timePassed

let incomingAnchorPoints = [
    //0
    { x: 0, y: 0 },
    //1
    { x: 0, y: 0 },
    //2
    // { x: 0, y: 0.035 },
    { x: 0, y: 0 },
    //3
    { x: 0, y: 0 },
    //4
    { x: 0, y: 0 },
    //5
    { x: 0, y: 0 },
    //6
    { x: 0, y: 0 },
    //7
    { x: 0, y: 0 },
    //8
    { x: 0, y: 0 },
    //9
    { x: 0, y: 0 },
]

let anchorPoints = [
    //0
    { x: 0, y: 0 },
    //1
    { x: 0, y: 0 },
    //2
    // { x: 0, y: 0.035 },
    { x: 0, y: 0 },
    //3
    { x: 0, y: 0 },
    //4
    { x: 0, y: 0 },
    //5
    { x: 0, y: 0 },
    //6
    { x: 0, y: 0 },
    //7
    { x: 0, y: 0 },
    //8
    { x: 0, y: 0 },
    //9
    { x: 0, y: 0 },
];

function preload() {
    for (let i = 0; i < 10; i++) {
        images[i] = loadImage( `/Poster_Templates/Flo_Ben_Poster/images/${i}.png` );
    }
}

function setup() {
    createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
    poster.setup(this, "models/movenet/model.json");

    totalDuration = 0.6
    timePassed = 0
}

function draw() {
    // background(poster.getCounter() % 2 === 0 ? 255 : 0);
    background(50)

    viewerInteraction();


    blurAmount = poster.posNormal.x * 90 

    drawingContext.save();

    const centerStart = width / 3;
    const centerEnd = width / 1.5;

    if (mappedViewerX < centerStart) {
        blurAmount = map(originalViewerX * width, 0, centerStart, 85, 0);
    } else if (originalViewerX * width > centerEnd) {
        blurAmount = map(originalViewerX * width, centerEnd, width, 0, 85);
    } else {
        blurAmount = 0;
    }


    // drawingContext.filter = `blur(${blurAmount}px)`;

    displayNumbers(); 
    drawingContext.restore();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}

function displayNumbers() {
    let outgoingIndex = poster.getCounter();
    let incomingIndex = (poster.getCounter() - 1 + images.length) % images.length;

    outgoingImage = images[outgoingIndex];
    incomingImage = images[incomingIndex];

    let targetOutgoingAnchor = anchorPoints[outgoingIndex];
    let targetIncomingAnchor = incomingAnchorPoints[incomingIndex];

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 1.7;
        transitionInIncrement = 0.03;
        transitionOutIncrement = 0.2;

        incomingRotation = PI*1.5; 
        currentIncomingAnchor = { x: 0, y: 0};
        currentOutgoingAnchor = { x: 0, y: 0};

        transitionInProgress = 0; 
        transitionOutProgress = 0; 

        timePassed = 0

        previousCounter = poster.getCounter();
    }

    targetInScale = 1.7;
    targetOutScale = 8.6;
    timePassed += deltaTime / 1000;

    if (timePassed === 0) {
        transitionInScale = 0; 
    } else if (timePassed < totalDuration) {
        const t = timePassed / totalDuration;
        transitionInScale = lerp(transitionInScale, targetInScale, easeInCubic(t));
        transitionOutScale = lerp(transitionOutScale, targetOutScale, easeInCubic(t));
    }

    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement);

    currentIncomingAnchor.x = lerp(currentIncomingAnchor.x, targetIncomingAnchor.x, transitionInIncrement*5);
    currentIncomingAnchor.y = lerp(currentIncomingAnchor.y, targetIncomingAnchor.y, transitionInIncrement*5);

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
    pop();

    push();
        imageMode(CENTER);
        translate(
            width / 2 - (currentIncomingAnchor.x) * width * transitionInScale,
            height / 2 - (currentIncomingAnchor.y) * height / aspectRatio * transitionInScale
        );
        rotate(-incomingRotation);
        image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    pop();
}

function viewerInteraction() {
    originalViewerX = poster.posNormal.x
    originalViewerY = poster.posNormal.y

    mappedViewerX = map(poster.posNormal.x,0,1,0,width)
    mappedViewerY = map(poster.posNormal.y,0,1,0,height) 
}

function easeInCubic(t) {
    return t * t * t;
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}   

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}