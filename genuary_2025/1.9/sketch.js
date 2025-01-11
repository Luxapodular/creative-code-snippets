// The patterns of public transit.

let colors = []
  
function setup() {
  createCanvas(400, 400);
  colorMode(HSL);
  colors = [color(220, 80, 70), color(310, 80, 70), color(40, 80, 70)]
  
  for (let i=0; i<60; i++) {
    drawIteration();
  }
}

function drawLine(x) {
  for (let i=0; i<width; i+=10) {
    chairTexture(i + x, i, 4, color(0, 0, 20, .8), color(0, 0, 80, .1), 3, 2);
  }
}

function drawIteration() {
  for (let i=0; i<25; i++) {
    let cx = random(width);
    let cy = random(height);
    let R = 30;
    chairTexture(cx, cy, R, random(colors), color(30, 30, 30, 20), 4, 40);
  }
  
}

function chairTexture(cx, cy, R, clr, sClr, d, n) {
  for (let i=0; i<n; i++) {
    pt = randomPointInCircle(cx, cy, R);
    noStroke();
    fill(clr);
    circle(pt.x, pt.y, d);
    fill(sClr);
    circle(pt.x + 1, pt.y + 1, d-1);
  }

}

function makeCurve() {
  stroke(20);
  strokeWeight(4); 
  let centerX = random(width);
  let centerY = random(height);
  let R = 40;
  
  noFill();
  beginShape();
  for (let i=0; i<6; i++) {
    //curveVertex(x + noise((i + millis()) / 1000)*10, y + noise(100 + (i + millis()) * 10));
    let pt = randomPointInCircle(centerX, centerY, R);
    curveVertex(pt.x, pt.y)
  }
  endShape(OPEN);
}

function randomPointInCircle(cx, cy, R) {
    r = R * sqrt(random())
    theta = random() * 2 * PI
    x = cx + r * cos(theta)
    y = cy + r * sin(theta)
    return {x,y};
}