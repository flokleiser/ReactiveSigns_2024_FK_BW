//TODO: incomingimage 0 - 0.5, outgoingimage 0.5 - 1
//TODO: lerp in and out of incoming and outgoing image

let rotationHistory = [];
let images = [];
let font;
let aspectRatio = 1.375;

let previousCounter = -1;
let increment = 0.05;
let transitionOutIncrement = 0.09
let transitionFlag = true;

let incomingImage;
let outgoingImage;
let startInScale
let startOutScale

let anchorPoints = [
    // {x: -0.3, y: -0.15},
    // {x: -0.25, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    // {x: -0.25, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05},
    {x: -0.05, y: -0.05}
];

let currentOutgoingAnchor = { x: 0, y: 0 }; 
// let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 



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
    // incomingImage = images[(poster.getCounter() - 1 + images.length) % images.length];
    incomingImage = images[poster.getCounter() - 1];
    if (incomingImage === undefined) {
        incomingImage = images[9];
    }


    let targetOutgoingAnchor = anchorPoints[poster.getCounter()];

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.5;
        transitionInIncrement = 0.02;
        transitionOutIncrement = 0.07;

        incomingRotation = PI/2;
        currentOutgoingAnchor = { x: 0, y: 0 }

        previousCounter = poster.getCounter();
        if (poster.getCounter() === 0) {
            console.log('test 9')
        }
        if (poster.getCounter() === 1) {
            console.log('test 0')
        }
    }

    let targetInScale = 0.6;
    // let targetOutScale = 15;
    // let targetOutScale = 5;
    let targetOutScale = 3

    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*4);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement);

    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement);


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
        translate(
            width / 2 - (currentOutgoingAnchor.x) * width * transitionOutScale,
            height / 2 - (currentOutgoingAnchor.y) * height / aspectRatio * transitionOutScale
        );
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