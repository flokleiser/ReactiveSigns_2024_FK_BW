let maxIncomingScale = 1.5; // Maximum scale for incoming image
let maxOutgoingScale = 0.6; // Maximum scale for outgoing image
if (transitionScale < maxOutgoingScale) {
    transitionScale += increment;
} else {
    transitionScale = maxOutgoingScale;
}

if (transitionOutScale < maxIncomingScale) {
    transitionOutScale += increment;
} else {
    transitionOutScale = maxIncomingScale;
}
let outgoingScale = transitionScale;
let incomingScale = transitionOutScale;

if (outgoingScale > maxOutgoingScale) outgoingScale = maxOutgoingScale;
if (incomingScale > maxIncomingScale) incomingScale = maxIncomingScale;

image(incomingImage, 0, 0, width * incomingScale, (height / aspectRatio) * incomingScale);
image(outgoingImage, 0, 0, width * outgoingScale, (height / aspectRatio) * outgoingScale);
