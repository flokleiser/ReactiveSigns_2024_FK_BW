//TODO: higher quality png

let images = [];
let aspectRatio = 1.375;

let previousCounter = -1;


let incomingImage;
let outgoingImage;

//variable for where the small image starts (scale 0)
let transitionInScale = 0;
//variable for where the big image starts (scale 0.6, since the small image goes to 0.6)
let transitionOutScale = 0.6;

//the speed of the scaling, its different for the small and big image because the big image needs to scale more so it fills up the screen
let transitionInIncrement = 0.06;
let transitionOutIncrement = 0.09;

let incomingRotation = 0;

//you can ignore this, it is for an easing test that we wont use
let transitionInProgress
let transitionOutProgress

// the default position of the small number in the center, values are normalized from 0 to 1 so widht/2 height/2 is 0.5 0.5
let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 

// the anchor points (or positions) for the big "exit" number, so that it scales to a part where its black/white so it doesnt look bad
// they are stored in an array so i can easily access them with the index of the currently displayed image (with poster.getCounter())
let anchorPoints = [
    // 0
    { x: -0.34, y: 0 },
    // 1
    { x: 0.25, y: 0.2 },
    // 2 
    { x: -0.25, y: -0.1 },
    // 3 
    { x: -0.32, y: -0.33 },
    // 4 
    { x: 0.2, y: -0.3 },
    // 5 
    { x: 0.32, y: -0.32},
    // 6 
    { x: 0.22, y: -0.23},
    // 7 
    { x: -0.29, y: -0.29 },
    // 8 
    { x: 0.2, y: 0.2 },
    // 9 
    { x: -0.25, y: -0.25}
];

function preload() {
    //here we load all the pngs into an array called images[], so each time we want to access an image we can just call images[some number]
    //this is nice so we dont have to do "let image1", "let image2", "let image3" etc
    for (let i = 0; i < 10; i++) {
        images[i] = loadImage( `/Poster_Templates/Flo_Ben_Poster/images/${i}.png` );
    }
}

function setup() {
    createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
    poster.setup(this, "models/movenet/model.json");
}

function draw() {
    //makes the background black for every second number
    background(poster.getCounter() % 2 === 0 ? 255 : 0);

    //the index for the small number in the center
    let outgoingIndex = poster.getCounter();
    //the index for the big number that is scaling out, so always the number which was small before)
    let incomingIndex = (poster.getCounter() - 1 + images.length) % images.length;

    //here we assign the current outgoing and incoming image to variables so i can reuse them without getting confused
    outgoingImage = images[outgoingIndex];
    incomingImage = images[incomingIndex];

    //assigning the anchor point (or the position where the big number ends up at) 
    //we pair the images with their respective anchorpoint from our initial anchorpoint array, using the index
    let targetOutgoingAnchor = anchorPoints[outgoingIndex];

    //we check if the current number is different from the previous number, which happens every second when the number changes
    //with this if statement we reset every variable when the number changes
    //this is important so things like the number scale and number rotation dont just keep increasing, but start from the initial values each time
    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.6;
        transitionInIncrement = 0.03;
        transitionOutIncrement = 0.2;

        incomingRotation = PI / 2; 
        currentOutgoingAnchor = { x: 0, y: 0};
        //here we set the previousCounter to the current counter so it actually counts down
        previousCounter = poster.getCounter();

        transitionInProgress = 0; 
        transitionOutProgress = 0; 
    }

    //these are the "end" sizes for the small and big numbers
    //i like to use "currentScale" and "targetScale" so its less confusing in the lerp function 
    //the lerp function takes 3 parameters, the current value, the end value (or target value), and the amount it should move towards the end value
    //by always calling them something with "current" and "target" i can remember how the lerp function works
    let targetInScale = 0.6;
    let targetOutScale = 4.5


    //--------------- SCALE EASING ------------------- 
    //this is so the images scale with an ease in/out thing, instead of just stopping
    //there are some different speeds that work kinda well

    //fast speed
    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*4);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.35);

    //middle speed
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*3);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.3);

    //slow speed
    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*1.55);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.25);
    
    //easing test using constant values
    // transitionOutProgress += 0.04;
    // transitionOutProgress = constrain(transitionOutProgress, 1, 3);
    // transitionOutScale = transitionOutProgress * transitionOutProgress * targetOutScale/8;

    //------------------------------------------------


    //-------------- ANCHORPOINT EASING --------------
    //same thing as the scale easing but for the point where the big image ends up when its fully scaled up

    // works with lerp
    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement);

    // works with other easing because it is much slower, but otherwise looks kinda bad
    // currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement/3);
    // currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement/3);

    //------------------------------------------------

    //this part checks if the small number is scaling in, and if it is still scaling in it sets the rotation from -90 degeres to 0
    //it creates the roll in effect
    if (transitionInScale < targetInScale) {
        incomingRotation = lerp(incomingRotation, 0, 0.16);
    } else {
        incomingRotation = 0;
    }


    //here we draw the numbers, i put them each in a push() and pop() because otherwise lukes fps display and stuff rotates too
    //big number (smallnumber - 1)
    //we draw this first so that the small number gets drawn over it
    push();
        imageMode(CENTER);
        translate(
            width / 2 - (currentOutgoingAnchor.x) * width * transitionOutScale,
            height / 2 - (currentOutgoingAnchor.y) * height / aspectRatio * transitionOutScale
        );
        image(outgoingImage, 0, 0, width * transitionOutScale, (height / aspectRatio) * transitionOutScale);
    pop();

    //small number 
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