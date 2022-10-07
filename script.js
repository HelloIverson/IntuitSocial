let img;
let mainpg;
let abtpg;
let register;
function preload (){
  img = loadImage ("images/pjsk-logo.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate (60);
}

function draw() {
  rectMode (CENTER);
  background(100);
  fill (130, 135, 255);
  rect(width/2, 0, width, height*.3, 0, 0, 10, 10)
  image(img, width*.01, height*.01, 300, 91);
  fill (135, 140, 200);
  rect(width*.25, 50, 300, 100, 0, 0, 20, 20);
  rect(width*.45, 50, 300, 100, 0, 0, 20, 20);
  fill (0);
  text("mouseX" + mouseX + "mouseY" + mouseY, mouseX, mouseY);
  text("width" + width*.25 + "width" + width*.40, mouseX, mouseY+10);
  if (mouseX > 480-150 && mouseX < 480+150 && mouseY > 0 && mouseY < 100) {
    if (mouseIsPressed){
      text("ACTIVE", mouseX, mouseY+20);
    }
  }else {
    return;
  }
}
//this is what i have so far for a js code, idk if its what you guys need but here
