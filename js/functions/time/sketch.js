function setup() {
  createCanvas(400,400);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 50, 50);
}

function mousePressed(){
  clear();
  background(122);

}