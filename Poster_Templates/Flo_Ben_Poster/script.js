// - [x] Proper eases           
// - [ ] ADJUST ANCHORPOINTS    
// - [x] Replace PNGs           
// - [x] Fix outgoing animation 
// - [ ] Other variation of interaction 
//      - [ ] try out Halftones --> https://editor.p5js.org/chrsgrbr/sketches/mLNDLCYys
//      - [ ] multiple circles, more with graytones --> 3D effec


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
let timePassed2

//where the small image ends up
let smallAnchorPoints = [
    //0
    { x: 0, y: 0 },
    //1
    { x: 0, y: 0 },
    //2
    { x: 0, y: 0.04 },
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
    { x: -0, y: 0 },
]

//where the bigimage ends up
let anchorPoints = [
    //0
    { x: 0.2, y: 0.3 },
    //1
    { x: -0.3, y:0 },
    //2
    { x: -0.2, y: 0 },
    //3
    { x: 0, y: -0.3 },    
    // { x: 0.15, y: 0.3 },    
    // { x: 0.35, y: 0.1 },    
    //4
    // { x: 0, y: 0 },
    { x: 0, y: -0.1 },    
    //5
    // { x: 0, y: 0.4 },    
    { x: 0.35, y: 0.2 },
    // { x: 0.35, y: 0.1},
    // { x: 0.1, y: -0.3 },
    //6
    { x: 0.25, y: 0.2 },
    //7
    { x: -0.1, y: 0.35 },
    //8
    { x: 0.25, y: 0.2 },
    //9
    { x: -0.25, y: 0.2 },
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
    background(poster.getCounter() % 2 === 0 ? 255 : 0);
    // background(50)

    viewerInteraction();
    blurAmount = poster.posNormal.x * 100 

    drawingContext.save();

    const centerStart = width / 3;
    const centerEnd = width / 1.5;

    if (mappedViewerX < centerStart) {
        // blurAmount = map(originalViewerX * width, 0, centerStart, 50, 0);
        blurAmount = map(originalViewerX * width, 0, centerStart, 100, 0);
    } else if (originalViewerX * width > centerEnd) {
        // blurAmount = map(originalViewerX * width, centerEnd, width, 0, 50);
        blurAmount = map(originalViewerX * width, centerEnd, width, 0, 100);
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

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 1.7;
        transitionInIncrement = 0.03;
        transitionOutIncrement = 0.2;

        incomingRotation = PI*1.5; 
        // incomingRotation = PI*5.5; 
        // incomingRotation = PI*2; 
        currentOutgoingAnchor.x = smallAnchorPoints[outgoingIndex].x;
        currentOutgoingAnchor.y = smallAnchorPoints[outgoingIndex].y

        timePassed = 0
        previousCounter = poster.getCounter();
    }

    targetInScale = 1.7;
    targetOutScale = 8.6;
    timePassed += deltaTime / 1000;


    // if (timePassed === 0) {
    //     transitionInScale = 0; 

    // } else 
    if (timePassed < totalDuration) {
        const t = timePassed / totalDuration;
        let t2 = 0;

        if (timePassed < 0.3) {
            transitionInScale = 0.000001; 
            t2 = 0.0;
            timePassed2 = 0;
        } else {
            t2 = map(timePassed, 0.3, totalDuration, 0, 1);
            // t2 = constrain(t2, 0, 1);
            transitionInScale = lerp(transitionInScale, targetInScale, easeInCubic(t2));

            if (t2 <= 0.9) {
                incomingRotation = lerp(incomingRotation, 0, 0.275);
            } else {
                incomingRotation = 0;
            }
        }

        transitionOutScale = lerp(transitionOutScale, targetOutScale, easeInCubic(t));

        currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, easeInCubic(t));
        currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, easeInCubic(t));
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
        //this is very hacky but i dont care
        if (outgoingIndex === 3) {
           translate(width/2, height/2 - 5*poster.vh) 
        } else {
            translate(width/2, height/2)
        }
        rotate(-incomingRotation);
        image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    pop();
}

//calculations for the x postitions etc
function viewerInteraction() {
    originalViewerX = poster.posNormal.x
    originalViewerY = poster.posNormal.y

    mappedViewerX = map(poster.posNormal.x,0,1,0,width)
    mappedViewerY = map(poster.posNormal.y,0,1,0,height) 
}

//easing tests
function easeInCubic(t) {
    return t * t * t;
}
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}   
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}