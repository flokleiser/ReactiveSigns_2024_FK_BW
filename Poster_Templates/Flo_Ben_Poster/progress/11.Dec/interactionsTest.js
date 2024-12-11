// - [ ] Question for Luke --> make realsense osc "lerp" less, or be less slow
//
// - [ ] Other variation of interaction 
//      - ChatGPT suggestions:
//
//         7. Dynamic Shadow Play
//         Add dynamic shadows or lighting effects that follow poster.posNormal to create the illusion of a moving light source.
//         Implementation Idea:
//         Use drawingContext.shadowOffsetX, shadowOffsetY, and shadowBlur in sync with poster.posNormal.
//
//         8. Perspective Shift
//         Alter the perspective of the image slightly based on poster.posNormal to simulate depth.
//         Implementation Idea:
//         Apply skew transformations to image() coordinates using quad() to mimic perspective changes.
//
//         9. Edge Ripple Effect
//         Create a rippling distortion effect along the edges of the canvas, growing stronger as poster.posNormal approaches the edges.
//         Implementation Idea:
//         Apply a sine wave distortion to edge pixels or use filter(POSTERIZE) with varying levels.
//
//         10. Interactive Text Reveals
//         Introduce hidden text or shapes that reveal themselves as poster.posNormal moves across certain areas of the screen.
//         Implementation Idea:
//         Use masking techniques or transparency levels tied to poster.posNormal.


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
    //4
    { x: 0, y: -0.1 },    
    //5
    { x: 0.35, y: 0.2 },
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
    // background(poster.getCounter() % 2 === 0 ? 255 : 0);
    background(50)

    //blur logic
    // viewerInteraction();
    // drawingContext.save();
    //     drawingContext.filter = `blur(${blurAmount}px)`;
        displayNumbers(); 
    // drawingContext.restore();


    //ripple effect, i dont know
    // let rippleIntensity = map(
    //     dist(poster.posNormal.x, poster.posNormal.y, 0.5, 0.5),
    //     0, 0.7, 0, 10, true
    // );
    // drawingContext.save();
    // displayNumbers();
    // for (let y = 0; y < height; y += 10) {
    //     let offset = sin(frameCount * 0.05 + y * 0.1) * rippleIntensity;
    //     copy(0, y, width, 10, offset, y, width, 10);
    // }
    // drawingContext.restore();
    // viewerInteraction();
    // displayDebugInfo();
    


    //disable this
    displayDebugInfo();

    poster.posterTasks();
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

        // incomingRotation = PI*1.5; 
        incomingRotation = PI/4; 
        currentOutgoingAnchor.x = smallAnchorPoints[outgoingIndex].x;
        currentOutgoingAnchor.y = smallAnchorPoints[outgoingIndex].y

        timePassed = 0
        previousCounter = poster.getCounter();
    }

    targetInScale = 1.7;
    targetOutScale = 8.6;
    timePassed += deltaTime / 1000;

    if (timePassed < totalDuration) {
        const t = timePassed / totalDuration;
        let t2 = 0;
        // let delay = 0.2
        let delay = 0.3

        if (timePassed < delay) {
            transitionInScale = 0.000001; 
            t2 = 0.0;
            timePassed2 = 0;
        } else {
            t2 = map(timePassed, delay, totalDuration, 0, 1);
            transitionInScale = lerp(transitionInScale, targetInScale, easeInCubic(t2));

            if (t2 <= 0.9) {
                // incomingRotation = lerp(incomingRotation, 0, 0.275);
                incomingRotation = lerp(incomingRotation, 0, easeInOutCubic(t2));
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
        //this is a very hacky way to display the "2" slightly more up, but i dont care
        if (outgoingIndex === 3) {
           translate(width/2, height/2 - 5*poster.vh) 
        } else {
            translate(width/2, height/2)
        }
        rotate(-incomingRotation);
        image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    pop();

    for (let y = 0; y < height; y++) {
        let waveOffset = sin((y + frameCount * 5) * 0.02 + poster.posNormal.x * 10) * 10;
        copy(outgoingImage, 0, y, width, 1, waveOffset, y, width, 1);
    }

}


// function displayNumbers() {
//     let numTiles = 10;
//     let tileWidth = width / numTiles;
//     let tileHeight = height / numTiles;

//     let offset = map(dist(poster.posNormal.x, poster.posNormal.y, 0.5, 0.5), 0, 0.7, 0, 100);

//     for (let x = 0; x < numTiles; x++) {
//         for (let y = 0; y < numTiles; y++) {
//             let posX = x * tileWidth + offset * (poster.posNormal.x - 0.5);
//             let posY = y * tileHeight + offset * (poster.posNormal.y - 0.5);
//             image(
//                 outgoingImage,
//                 posX, posY, tileWidth, tileHeight,
//                 x * (outgoingImage.width / numTiles), y * (outgoingImage.height / numTiles),
//                 outgoingImage.width / numTiles, outgoingImage.height / numTiles
//             );
//         }
//     }
// }




function displayDebugInfo() {
    push();
        blendMode(DIFFERENCE)
        fill(255)
        textSize(4.5*poster.vw);
        // text(`${(poster.getCounter() - 1 + images.length) % images.length}   |   Blur: ${blurAmount.toFixed(1)}`, width / 1.55, height / 19)
        text(`${(poster.getCounter() - 1 + images.length) % images.length}`, width / 1.55, height / 19)
        blendMode(BLEND);
    pop();
}

function viewerInteraction() {
    originalViewerX = poster.posNormal.x
    originalViewerY = poster.posNormal.y

    //i did not read the docs so i did not know poster.position.x etc was a thing, and now im too lazy to change it
    mappedViewerX = map(poster.posNormal.x,0,1,0,width)
    mappedViewerY = map(poster.posNormal.y,0,1,0,height) 

    const centerStart = width / 3;
    const centerEnd = width / 1.5;
    //the max amount of blur with the realSense is about 85% of the max value
    if (mappedViewerX < centerStart) {
        blurAmount = map(originalViewerX * width, 0, centerStart, 150, 0);
    } else if (originalViewerX * width > centerEnd) {
        blurAmount = map(originalViewerX * width, centerEnd, width, 0, 150);
    } else {
        blurAmount = 0;
    }
}


//random easing functions to test out
function easeInCubic(t) {
    return t * t * t;
}
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}   
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
}
function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}