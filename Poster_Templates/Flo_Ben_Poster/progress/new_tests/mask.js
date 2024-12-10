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
let circleRadius

let currentOutgoingAnchor = { x: 0.5, y: 0.5 }; 

let sharpLayer, blurLayer;
let blurAmount = 50

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
    sharpLayer = createGraphics(width, height);
    blurLayer = createGraphics(width, height);
    poster.setup(this, "models/movenet/model.json");
    textFont(font);
}

function draw() {
    background(poster.getCounter() % 2 === 0 ? 255 : 0);
    sharpLayer.clear();
    blurLayer.clear();

    sharpLayer.push();
    sharpLayer.textFont(font);
    sharpLayer.fill(255);
    displayNumbers(sharpLayer);
    displayText(sharpLayer);
    sharpLayer.pop();

    blurLayer.push();
    blurLayer.textFont(font);
    blurLayer.fill(255);
    blurLayer.drawingContext.filter = `blur(${blurAmount}px)`;
    displayNumbers(blurLayer);
    displayText(blurLayer);
    blurLayer.pop();

    blendLayers();

    viewerInteraction();

    poster.posterTasks();
}

function windowScaled() {
    textSize(10 * poster.vw);
}

function blendLayers() {
    image(blurLayer, 0, 0);

    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(mappedViewerX, mappedViewerY, circleRadius, 0, TWO_PI);
    drawingContext.clip();
    image(sharpLayer, 0, 0);
    drawingContext.restore();
}

function viewerInteraction() {
    mappedViewerX = map(poster.posNormal.x, 0, 1, 0, width);
    mappedViewerY = map(poster.posNormal.y, 0, 1, 0, height);

    if (poster.posNormal.x < 0.5) {
        circleRadius = poster.posNormal.x * 2500;
    } else {
        circleRadius = (1 - poster.posNormal.x) * 2500;
    }
}

function displayNumbers(layer) {
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
        currentOutgoingAnchor = { x: 0, y: 0 };
        previousCounter = poster.getCounter();

        transitionInProgress = 0;
        transitionOutProgress = 0;
    }

    let targetInScale = 0.6;
    let targetOutScale = 4.5;

    // transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement * 4);
    // transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement * 0.35);
    transitionInScale = lerp(transitionInScale, targetInScale, transitionInIncrement * 2);
    transitionOutScale = lerp(transitionOutScale, targetOutScale, transitionOutIncrement * 0.15);

    currentOutgoingAnchor.x = lerp(currentOutgoingAnchor.x, targetOutgoingAnchor.x, transitionOutIncrement);
    currentOutgoingAnchor.y = lerp(currentOutgoingAnchor.y, targetOutgoingAnchor.y, transitionOutIncrement);

    if (transitionInScale < targetInScale) {
        incomingRotation = lerp(incomingRotation, 0, 0.16);
    } else {
        incomingRotation = 0;
    }

    layer.push();
    layer.imageMode(CENTER);
    layer.translate(
        width / 2 - currentOutgoingAnchor.x * width * transitionOutScale,
        height / 2 - currentOutgoingAnchor.y * height / aspectRatio * transitionOutScale
    );
    layer.image(outgoingImage, 0, 0, width * transitionOutScale, (height / aspectRatio) * transitionOutScale);
    layer.pop();

    layer.push();
    layer.imageMode(CENTER);
    layer.translate(width / 2, height / 2);
    layer.rotate(-incomingRotation);
    layer.image(incomingImage, 0, 0, width * transitionInScale, (height / aspectRatio) * transitionInScale);
    layer.pop();
}

function displayText(layer) {
    layer.push();
    layer.blendMode(DIFFERENCE);
    layer.fill(255);
    layer.textSize(4.5 * poster.vw);
    layer.text("this number is poster.posNormal.x", width / 3.5, height / 25);
    layer.textSize(20 * poster.vw);
    layer.text(`${poster.posNormal.x.toFixed(4)}`, width / 2.8, height / 7);
    layer.textSize(12 * poster.vw);
    layer.text("top text", width / 1.87, height / 4.85);
    layer.textSize(7 * poster.vw);
    layer.text("bottom text", width / 15, height / 1.2);
    layer.text("me when the when", width / 15, height / 1.15);
    layer.blendMode(BLEND);
    layer.pop();
}
