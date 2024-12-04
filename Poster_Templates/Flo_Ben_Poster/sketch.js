let rotationHistory = [];
let font;
function preload() {  
  font = loadFont('/Poster_Templates/Flo_Ben_Poster/Fit_Variable.otf');
  image1 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/1.png');
  image2 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/2.png');
  image3 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/3.png');
  image4 = loadImage('/Poster_Templates/Flo_Ben_Poster/images/4.png');
}
function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight());
  /*important!*/ poster.setup(this, "models/movenet/model.json");
  textFont(font);
}

function draw() {
  background(poster.getCounter() %  2 === 0 ? 0 : 255);
  wordEffect(poster.getCounter(), width / 2, height / 2);

  switch(poster.getCounter()) {
    case 0:
      console.log('0')
      break;

    case 1:
      console.log('1')
      break;

    case 2: 
      console.log('2')
      break;

    case 3: 
    console.log('3')
      break;

    case 4: 
    console.log('4')
      break;

    case 5: 
    console.log('5')
      break;

    case 6: 
    console.log('6')
      break;

    case 7: 
    console.log('7')
      break;

    case 8: 
    console.log('8')
      break;

    case 9: 
    console.log('9')
      break;
    }

/*important!*/ poster.posterTasks();
}

function windowScaled() { 
  textSize(10 * poster.vw);
}

function wordEffect(word, x, y) {
  let size = 1;
  push()
  translate(x, y)

  let maxSteps = 40;
  let minSize = 80 * poster.vw
  textSize(minSize);

  pop();
  noFill();

}






