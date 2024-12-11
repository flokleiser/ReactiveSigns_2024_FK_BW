//variables for the image array and image size
let images = [];
let aspectRatio = 1.375;

//variables for the transition effects
let previousCounter = -1;
let increment = 0.05;

let incomingImage;
let outgoingImage;

let startInScale
let startOutScale
let targetInScale = 1.7;
let targetOutScale = 4.6;

let transitionInScale = 0;
let transitionOutScale = 1.7;
let transitionInIncrement = 0.06;
let transitionOutIncrement = 0.09;

let incomingRotation = 0;

let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 
let currentIncomingAnchor = { x: 0, y: 0 }; 

//variables for the transition time
let totalDuration
let timePassed
let timePassed2

//variables for the mouseX (user input thing)
let mappedViewerX 
let mappedViewerY
let originalViewerX 
let originalViewerY

let blurAmount


//where the small image ends up, only needed for 2 since its slightly offset
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
    { x: 0, y: 0 },
]

//where the big image ends up
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

//loading all the images from the folder into one array
function preload() {
    for (let i = 0; i < 10; i++) {
        images[i] = loadImage( `/Poster_Templates/Flo_Ben_Poster/images/${i}.png` );
    }
}


function setup() {
    createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
    poster.setup(this, "models/movenet/model.json");

    //initializing the timing values
    totalDuration = 0.6
    timePassed = 0
}


function draw() {
    background(poster.getCounter() % 2 === 0 ? 255 : 0);

    //calculating the blur amount based on poster.posNormal.x
    viewerInteraction();

    //saving and restoring the context to only apply blur to the numbers
    drawingContext.save();
        drawingContext.filter = `blur(${blurAmount}px)`;
        //drawing the numbers
        displayNumbers(); 
    drawingContext.restore();

    //handling all the other poster tasks like the countdown etc
    poster.posterTasks();
}


function displayNumbers() {
    let outgoingIndex = poster.getCounter();
    let incomingIndex = (poster.getCounter() - 1 + images.length) % images.length;

    //assigning incoming & outgoing images to a variable based on
    //the current poster.getCounter() number and the one before it
    outgoingImage = images[outgoingIndex];
    incomingImage = images[incomingIndex];

    //set the position where the outgoingImage ends up by pairing 
    //the image index to the corresponding anchorPoints index
    let targetOutgoingAnchor = anchorPoints[outgoingIndex];

    //resetting everything if the counter changes, this is needed to
    //properly reinitialize the transition effects
    if (poster.getCounter() !== previousCounter) {

        //setting how big the images are gonna be
        transitionInScale = 0;
        transitionOutScale = 1.7;

        //setting how fast they scale
        transitionInIncrement = 0.03;
        transitionOutIncrement = 0.2;

        incomingRotation = PI/4; 

        //setting where they end up
        currentOutgoingAnchor.x = smallAnchorPoints[outgoingIndex].x;
        currentOutgoingAnchor.y = smallAnchorPoints[outgoingIndex].y

        timePassed = 0
        //shifting the counter so that it actually counts down
        previousCounter = poster.getCounter();
    }

    //setting how big the images SHOULD be
    targetInScale = 1.7;
    targetOutScale = 8.6;

    //incrementing timepassed (deltatime is in ms, so converting it to seconds)
    timePassed += deltaTime / 1000;

    //if less than 0.6 seconds passed since the last transition
    if (timePassed < totalDuration) {

        const t = timePassed / totalDuration;
        //initializing a new t for the incoming image with the slight delay
        let t2 = 0;

        //set delay so that the next one starts slightly later
        // let delay = 0.2
        let delay = 0.3

        //if less than 0.3 seconds passed since the last transition
        if (timePassed < delay) {
            transitionInScale = 0.000001; 
            t2 = 0.0;
            timePassed2 = 0;
        } else {
            //mapping t2 to delay & totalduration so it increases from 0 to 1 in the same time it takes the original 
            t2 = map(timePassed, delay, totalDuration, 0, 1);
            transitionInScale = lerp(transitionInScale, targetInScale, easeInCubic(t2));

            //rotating the image as it scales in, and setting to 0 just before it ends
            if (t2 <= 0.9) {
                // incomingRotation = lerp(incomingRotation, 0, 0.275);
                incomingRotation = lerp(incomingRotation, 0, easeInOutCubic(t2));
            } else {
                incomingRotation = 0;
            }
        }

        //lerping the scales and anchorpoints
        transitionOutScale = lerp(transitionOutScale, targetOutScale, easeInCubic(t));

        currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, easeInCubic(t));
        currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, easeInCubic(t));
    }

    //drawing the outgoing image and translating it to its calculated anchor point
    push();
        imageMode(CENTER);
            translate(
                width / 2 - (currentOutgoingAnchor.x) * width * transitionOutScale,
                height / 2 - (currentOutgoingAnchor.y) * height / aspectRatio * transitionOutScale
            );
        image(outgoingImage, 0, 0, width * transitionOutScale, (height / aspectRatio) * transitionOutScale);
    pop();


    //drawing the incoming image and rotating it as it scales in
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
}


//you can ignore this, its just for displaying text with the current counter and bluramount
function displayDebugInfo() {
    push();
        blendMode(DIFFERENCE)
        fill(255)
        textSize(4.5*poster.vw);
        text(`${(poster.getCounter() - 1 + images.length) % images.length}   |   Blur: ${blurAmount.toFixed(1)}`, width / 1.55, height / 19)
        blendMode(BLEND);
    pop();
}


function viewerInteraction() {
    //assigning the normalized poster.position to a variable so i dont get confused
    originalViewerX = poster.posNormal.x
    originalViewerY = poster.posNormal.y

    //i did not read the docs so i did not know poster.position.x etc was a thing, and now im too lazy to change it
    //mapping the normalized position to screenwidth and height
    mappedViewerX = map(poster.posNormal.x,0,1,0,width)
    mappedViewerY = map(poster.posNormal.y,0,1,0,height) 

    //declaring the area in the center where the image should be sharp (middle third)
    const centerStart = width / 3;
    const centerEnd = width / 1.5;

    //the max amount of blur with the realSense is about 85% of the max value
    //checking if the viewer is in the center area, and if not, blurring the image
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