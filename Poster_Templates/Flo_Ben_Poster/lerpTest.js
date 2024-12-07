//TODO: incomingimage 0 - 0.5, outgoingimage 0.5 - 1
//TODO: lerp in and out of incoming and outgoing image

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;
let transitionScale = 0;
let transitionOutScale = 0.5


let previousCounter = -1;
let increment = 0.05;
let transitionOutIncrement = 0.09
let transitionFlag = true;

let incomingImage;
let outgoingImage;

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

    // incomingImage = images[0];
    // outgoingImage = images[1]
}

function draw() {
    // background(poster.getCounter() % 2 === 0 ? 0 : 255);
    // background(poster.getCounter() % 2 === 0 ? 255 : 0);
     background(50)

     // first assigning the images
     incomingImage = images[poster.getCounter()];
     outgoingImage = images[poster.getCounter() - 1];
     if (outgoingImage === undefined) {
         outgoingImage = images[9];
     }




    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.5
        //this stupid thing fixes the size increase
        transitionInIncrement = 0.02;
        transitionOutIncrement = 0.09;
        previousCounter = poster.getCounter();
    }

    let targetInScale = 0.6
    let targetOutScale = 3 

    transitionInScale += transitionInIncrement;
    transitionOutScale += transitionOutIncrement

    // if (transitionScale < 0.6) {
    //     increment = 0.05;
    //     transitionOutIncrement = 0.1
    // } else {
    //     increment = 0;
    //     transitionOutIncrement = 0
    // }
    if (transitionInScale < targetInScale) {
        lerp(transitionInScale, targetInScale, 0.05)
    }
    else {
        transitionInScale = targetInScale;
    }


    if (transitionOutScale < targetOutScale) {
        lerp(transitionOutScale, targetOutScale, 0.05)
    }
    else {
        transitionOutScale = targetOutScale
    }


    push();
        imageMode(CENTER);
        // let anchorX = width / 2
        // let anchorY = height / 2
        // translate(anchorX, anchorY);
        translate(width / 2, height / 2);
        let outgoingScale = transitionInScale;
        let incomingScale= transitionOutScale
        image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
        image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
    pop();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}