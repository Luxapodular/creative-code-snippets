// Only vertical or horizontal lines.
let lines = [];
let nLines = 0;
let bgColor = 0;

function setup() {
  colorMode(HSB)
  createCanvas(400, 400);
  // nLines = round(random(8000, 14000));
  for (let i=0; i<nLines; i++) {
    makeLine();
  }

  bgColor = color(random(220, 240), random(40, 50), 15);
  frameRate(60);
}

function makeLine() {
  lines.push({
    x: random(width),
    y: random(5, height-15),
    length: round(random(5,9)),
    thick: round(random(1,5)),
    clr: color(random(30, 90)),
    timing: random(1000),
    speed: random(2,6),
    vis: 0,
  })
}

function moveLine(d) {
  d.timing += .002 * d.speed
}

function drawLine(d) {
    d.clr.setAlpha(d.vis)
    stroke(d.clr)
    strokeWeight(d.thick)
    
    ny = d.y + sin(d.timing) * 10
    line(d.x, ny, d.x, ny + d.length)
    d.vis += .003;
}

function draw() {

  background(bgColor);
  
  lines.forEach(d => {
    moveLine(d);
    drawLine(d);
  });
  
  checkTime()
}

lastTime = 0;
function checkTime() {
  let t = millis()
  if (t - lastTime > 40) {
    makeLine();
    lastTime = t;
  }
}