// "Black on black"
function setup() {
  createCanvas(600, 600);
  background(10);
}

function draw() {
  let t = frameCount * 2
  background(255);
  let o = 20 + sin(radians(t)) * 20;
  background(o)
  let baseSize = 40;
  let totalSquigs =  width * 12;

  for (let i=0; i<totalSquigs; i++) {
    let theta = radians(i + t); 
    let w = (width/2 - baseSize/2) + sin(radians(frameCount))
    let x = cos(theta) * w;
    let y = ((i % height/2) * 4) % height - baseSize/2
    push()
      translate(w, 0, 0);
      drawSquig(x, y, baseSize, color(20), color(10)); 
    pop();
  }
}

function drawSquig(x, y, s, strokeClr, clr) {
  strokeWeight(1)
  stroke(strokeClr);
  fill(clr);
  rect(x, y, s, s, 8)
  stroke(clr)
  fill(clr)
  let h = 18

  let off = s/2-h/2;
  rect(x,y+off, s, h)
  rect(x+off, y, h, s)
}