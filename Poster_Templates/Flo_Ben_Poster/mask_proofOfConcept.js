//TODO: higher quality png
//TODO: something with blur?
//drawingContext.filter = 'blur(10px)'; --> much faster than filter(BLUR)

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

let transitionInProgress
let transitionOutProgress

let mappedViewerX 
let mappedViewerY
let originalViewerY

let circleRadius

let sharpLayer, blurLayer; 
let blurAmount = 10;

let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 

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
    for (let i = 0; i < 10; i++) {
        images[i] = loadImage( `/Poster_Templates/Flo_Ben_Poster/images/${i}.png` );
    }
    // font = loadFont("/Poster_Templates/Flo_Ben_Poster/fonts/Fit_Variable.otf");
    // font = loadFont("/Poster_Templates/Flo_Ben_Poster/fonts/barlow_condensed.otf");
    font = loadFont("/Poster_Templates/Flo_Ben_Poster/fonts/impact.otf");
}

function setup() {
    createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
    poster.setup(this, "models/movenet/model.json");

    sharpLayer = createGraphics(width, height); // Layer for sharp content
    blurLayer = createGraphics(width, height);  // Layer for blurred content
    textFont(font);
}

function draw() {
    background(poster.getCounter() % 2 === 0 ? 255 : 0);


    // 1. Draw sharp content on the sharp layer
    sharpLayer.clear();
    sharpLayer.fill(255);
    sharpLayer.textSize(32);
    sharpLayer.textAlign(CENTER, CENTER);
    sharpLayer.text('Sharp Content', width / 2, height / 2);
    sharpLayer.fill(100);
    sharpLayer.ellipse(width / 2, height / 2, 300, 300);

    // 2. Draw blurred content on the blur layer
    blurLayer.clear();
    blurLayer.fill(255);
    blurLayer.textSize(32);
    blurLayer.textAlign(CENTER, CENTER);
    blurLayer.text('Blurred Content', width / 2, height / 2);
    blurLayer.fill(100);
    blurLayer.ellipse(width / 2, height / 2, 300, 300);

    // Apply blur filter to the blurred layer
    blurLayer.drawingContext.filter = `blur(${blurAmount}px)`;

    // 3. Draw layers with masking logic
    image(blurLayer, 0, 0); // Draw blurred content over everything

    // Draw the sharp content, but mask the inside of the circle
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(mouseX, mouseY, 200, 0, TWO_PI); // Dynamic mask position
    drawingContext.clip(); // Restrict drawing to this circle
    image(sharpLayer, 0, 0); // Draw sharp content
        drawingContext.restore();

    // displayNumbers()

    // let blurAmount = poster.posNormal.x * 100

    // drawingContext.save();
    //     drawingContext.beginPath();
    //     drawingContext.arc(mappedViewerX, height / 2, circleRadius / 2, 0, TWO_PI);
    //     drawingContext.clip();

    //     displayNumbers(); 
    //     displayText();
    // drawingContext.restore();

    // drawingContext.save();
    //     drawingContext.filter = `blur(${blurAmount}px)`;
    //     displayNumbers()
    //     displayText();
    // drawingContext.restore();

    // displayText();
    // viewerInteraction()

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}

function viewerInteraction() {

    originalViewerX = poster.posNormal.x
    originalViewerY = poster.posNormal.y

    mappedViewerX = map(poster.posNormal.x,0,1,0,width)
    mappedViewerY = map(poster.posNormal.y,0,1,0,height) 

    if (poster.posNormal.x < 0.5) {
        circleRadius = poster.posNormal.x * 2500 
    } else {
        circleRadius = (1 - poster.posNormal.x) * 2500 
    }

    push();
        blendMode(DIFFERENCE);
        fill(255)
        circle(mappedViewerX,height/2, circleRadius);
        blendMode(BLEND);
    pop();
}

function displayText() {
    push();
        blendMode(DIFFERENCE)
        fill(255)
        textSize(4.5*poster.vw);
        text("this number is poster.posNormal.x", width / 3.5, height / 25);
        textSize(20*poster.vw);
        text(`${poster.posNormal.x.toFixed(4)}`, width / 2.8, height / 7);
        textSize(12*poster.vw);
        text("top text", width / 1.87, height / 4.85);
        textSize(7*poster.vw);
        text("bottom text", width / 15, height / 1.2);
        text("me when the when", width / 15, height / 1.15);
        blendMode(BLEND);
    pop();


}

function displayNumbers() {
    let outgoingIndex = poster.getCounter();
    let incomingIndex = (poster.getCounter() - 1 + images.length) % images.length;

    outgoingImage = images[outgoingIndex];
    incomingImage = images[incomingIndex];

    let targetOutgoingAnchor = anchorPoints[outgoingIndex];

    if (poster.getCounter() !== previousCounter) {
        transitionInScale = 0;
        transitionOutScale = 0.6;
        transitionInIncrement = 0.03;
        transitionOutIncrement = 0.2;

        incomingRotation = PI / 2; 
        currentOutgoingAnchor = { x: 0, y: 0};
        previousCounter = poster.getCounter();

        transitionInProgress = 0; 
        transitionOutProgress = 0; 
    }

    let targetInScale = 0.6;
    let targetOutScale = 4.5

    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement*4);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement*0.35);

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
    pop();

    push();
        imageMode(CENTER);
        translate(width / 2, height / 2);
        rotate(-incomingRotation);
        image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    pop();
}