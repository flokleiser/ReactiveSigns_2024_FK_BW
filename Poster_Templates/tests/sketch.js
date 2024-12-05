let rotationHistory = [];
let font;
let image0, image1, image2, image3, image4, image5, image6, image7, image8, image9;
let aspectRatio = 1.4
let number


function preload() {  
  image0 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/0.png');
  image1 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/1.png');
  image2 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/2.png');
  image3 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/3.png');
  image4 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/4.png');
  image5 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/5.png');
  image6 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/6.png');
  image7 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/7.png');
  image8 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/8.png');
  image9 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/9.png');
}

function setup() {
  createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  poster.setup(this, "models/movenet/model.json");
}

function draw() {
  background(number %  2 === 0 ? 255 : 0);

  push()
  translate(0,poster.getWindowWidth()/4)

  switch(number){
    case 0:
      image(image0, 0, 0, width, height/aspectRatio);
      break;
    case 1:
      image(image1, 0, 0, width, height/aspectRatio);
      break;
    case 2: 
      image(image2, 0, 0, width, height/aspectRatio);
      break;
    case 3: 
      image(image3, 0, 0, width, height/aspectRatio);
      break;
    case 4: 
      image(image4, 0, 0, width, height/aspectRatio);
      break;
    case 5: 
      image(image5, 0, 0, width, height/aspectRatio);
      break;
    case 6: 
      image(image6, 0, 0, width, height/aspectRatio);
      break;
    case 7: 
      image(image7, 0, 0, width, height/aspectRatio);
      break;
    case 8: 
      image(image8, 0, 0, width, height/aspectRatio);
      break;
    case 9: 
      image(image9, 0, 0, width, height/aspectRatio);
      break;
    }

    pop()

  poster.posterTasks();
}

function keyPressed() {
  number++
  console.log(number)
}

function transitionNumbers() {

}


function windowScaled() { 
  textSize(10 * poster.vw);
}



