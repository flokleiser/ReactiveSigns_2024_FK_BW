
// depthData : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the data array
// depthH: The vertical resolution of the data array


function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json", true);  // Don't remove this line. 
}

function draw() {
  background(0);
  //lineEffect()
  pixelEffect()
 /*important!*/ poster.posterTasks(); // do not remove this last line!
 
}

function pixelEffect() {
  fill(255);
  noStroke();
  let spaceX = width/poster.depthW;
  let spaceY = height/poster.depthH;
  	// loop through all the pixels in the depth image
  for (let i = 0; i<poster.depthH; i+=2) {
    for (let j = 0; j<poster.depthW; j+=2) {
      let index = (i*poster.depthW)+j;
        if (poster.depthData[index] > 0.0) {
        fill(int(poster.depthData[index]))
        rect(spaceX*j, spaceY*i, 5, 5);
      }
    }
  }
}


function lineEffect() {
  push();
  let spaceX = width/poster.depthW;
  let spaceY = height/poster.depthH;
  spaceX += poster.vw*0.1;
  spaceY += poster.vh*0.1;
  stroke(255);
	strokeWeight(2);
  noFill();
	// loop through all the pixels in the depth image
  translate(-poster.vw*3,0)
  for (let y = 0; y<poster.depthH; y+=3) {
		beginShape();
		for (let x = 0; x < poster.depthW; x+=3) {
      let index = (y*poster.depthW)+x;
			let h = poster.depthData[index]*poster.vh*0.05; 
			curveVertex(x*spaceX, (y*spaceY)-h);
		}
		endShape();
	}
  pop();
}





