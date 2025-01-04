// "Layers upon layers upon layers."

let characters = []
let cClr = 0
function setup() {
  colorMode(HSL)
  createCanvas(800, 400);
  drawBackground();
  frameRate(60)
  cClr =random(140, 340)
  for(let i=0; i<3; i++) {
    makeCharacter();
  }
}

function draw() {
  characters.forEach(c => {
    moveCharacter(c);
    drawCharacter(c);
  })
}

function drawBackground() {
  ballWidth = 15;
  for(let x=3; x< width-1; x += 2) {
    for (let y=0; y<height; y+= ballWidth - 1) {
      noStroke()
      fill(180, 50, 5, .4)
      circle(x, y, ballWidth)
    }
  }
}

function makeCharacter() {
  

  characters.push(
    {
      cx: random(width),
      cy: random(height),
      xOff: random(0, 1000),
      yOff: random(0, 1000),
      speed: random(2, 3),
      step: random(1, 3),
      r: random(20, 30),
      rOff: random(0, 1000),
      rxAdjust: random(0, 1000),
      ryAdjust: random(0, 1000),
      exaggeration: random(2, 4),
      clr: color(random(cClr-5, cClr+5), 50, 40, .3),
    }
  )
}

function moveCharacter(c) {
  // squigglyness of the character
  c.rxAdjust += .1;
  c.ryAdjust += .1;
  c.rOff += .01;
  
  totalW = width
  totalH = height
  cx = width/2
  cy = height/2
  
  c.cx = map(noise(c.xOff), 0, 1, cx - totalW/2, cx + totalW/2)
  c.cy = map(noise(c.yOff), 0, 1, cy - totalH/2, cy + totalH/2)
  
  c.xOff += (.0004 * c.step * c.speed);
  c.yOff += (.0004 * c.step * c.speed);
}

function drawCharacter(c) {
  sClr = color(hue(c.clr), saturation(c.clr), lightness(c.clr) *.3, .1)
  stroke(sClr)
  strokeWeight(3)
  fill(c.clr)  
  beginShape()
  let radius = c.r + noise(c.rOff) * 5
  for (let theta = 0; theta < 360; theta += 2) {
    t = radians(theta)
    r = radius + noise(c.rxAdjust + theta * 1000) * c.exaggeration
    px = c.cx + r * cos(t);
    py = c.cy + r * sin(t);
    curveVertex(px, py)
    point(px, py)
  }
  
  endShape(CLOSE)
}