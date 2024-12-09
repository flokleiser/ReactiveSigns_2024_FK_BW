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
let transitionOutScale = 0.6;
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

let incomingAnchorPoints = [
    //0
    { x: 0, y: 0 },
    //1
    { x: 0, y: 0 },
    //2
    { x: 0, y: 0.035 },
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
    // // 0
    // { x: -0.34, y: 0 },
    // // 1
    // { x: 0.25, y: 0.2 },
    // // 2 
    // { x: -0.25, y: -0.1 },
    // // 3 
    // { x: -0.35, y: -0.29 },
    // // 4 
    // { x: 0.2, y: -0.3 },
    // // 5 
    // { x: 0.33, y: -0.325},
    // // 6 
    // { x: 0.22, y: -0.23},
    // // 7 
    // { x: -0.29, y: -0.29 },
    // // 8 
    // { x: 0.2, y: 0.2 },
    // // 9 
    // { x: -0.26, y: -0.25}

    //0
    { x: 0.2, y: 0.2 },
    //1
    { x: 0.45, y: -0.25 },
    //2
    { x: -0.25, y: -0.25 },
    //3
    { x: -0.25, y: -0.35 },
    //4
    { x: 0.1, y: -0.2 },
    //5
    { x: 0.25, y: -0.25 },
    //6
    { x: 0.25, y: -0.25 },
    //7
    { x: -0.2, y: -0.25 },
    //8
    { x: -0.2, y: -0.15 },
    //9
    { x: -0.2, y: 0.15 },
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

    viewerInteraction();


    blurAmount = poster.posNormal.x * 90 

    drawingContext.save();

    const centerStart = width / 3;
    const centerEnd = width / 1.5;

    if (mappedViewerX < centerStart) {
        //original value
        blurAmount = map(originalViewerX * width, 0, centerStart, 85, 0);
    } else if (originalViewerX * width > centerEnd) {
        //original value
        blurAmount = map(originalViewerX * width, centerEnd, width, 0, 85);
    } else {
        blurAmount = 0;
    }
    drawingContext.filter = `blur(${blurAmount}px)`;

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
        transitionOutScale = 0.6;
        transitionInIncrement = 0.03;
        transitionOutIncrement = 0.2;

        incomingRotation = PI / 2; 
        outgoingRotation = 0;
        currentOutgoingAnchor = { x: 0, y: 0};
        previousCounter = poster.getCounter();

        transitionInProgress = 0; 
        transitionOutProgress = 0; 
    }


    let targetInScale = 1.71;
    // let targetOutScale = 4.5;
    let targetOutScale = 9.5;
    // let targetOutScale = 6.5;

    //looks kinda cool
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*19.2);

    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*3.2);
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*4.2);
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement/10);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.35);

    console.log(transitionInScale)

    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement/2);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement/2);

    currentIncomingAnchor.x = lerp(currentIncomingAnchor.x, targetIncomingAnchor.x, transitionInIncrement*5);
    currentIncomingAnchor.y = lerp(currentIncomingAnchor.y, targetIncomingAnchor.y, transitionInIncrement*5);

    if (transitionInScale < targetInScale) {
        incomingRotation = lerp(incomingRotation, 0, 0.16);
    } else {
        incomingRotation = 0;
    }

    if (transitionOutScale < targetOutScale) {
        outgoingRotation = lerp(outgoingRotation, PI / 2, 0.13);
    } else {
        outgoingRotation = 0
    }

    console.log(outgoingRotation)

    push();
        imageMode(CENTER);
        translate(
            width / 2 - (currentOutgoingAnchor.x) * width * transitionOutScale,
            height / 2 - (currentOutgoingAnchor.y) * height / aspectRatio * transitionOutScale
        );
        // rotate(outgoingRotation);
        image(outgoingImage, 0, 0, width * transitionOutScale, (height / aspectRatio) * transitionOutScale);
    pop();
   
    push();
        imageMode(CENTER);
        // translate(width / 2, height / 2);
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