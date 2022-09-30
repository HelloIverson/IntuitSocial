console.log("Start");
function setup() {
  createCanvas(400, 400);
}
console.log("Setup complete");
function draw() {
  background(220);
  noStroke();
  fill(255, 0, 0);
  ellipse(120, 60, 60, 30);
  rect(90, 60, 60, 100);
  fill(220);
  rect(110, 120, 20, 40);
  strokeWeight(2);
  stroke(0);
  fill(255);
  ellipse(100, 75, 50, 25);
}
console.log("Done!");
