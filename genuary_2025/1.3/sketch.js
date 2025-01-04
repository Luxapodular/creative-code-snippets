// "Exactly 42 lines of code." (I'm not counting the comment.)
let xPos = 0; // position of the lines on the x axis
let borderW = 20; // sketch border
let sketchW = 400;
let sketchH = 500;
let lineW = sketchW-borderW*2;
let nLines = 14;
let spacing = (sketchH - borderW/2) / nLines; // spacing factor between lines
let h = 200; // baseHue for lines.
let s = 60;  // base saturation for lines.
let l = 40;  // base lightness for lines
let bgColor = clr = 0; 
let o = .1; // opacity factor used throughout sketch.
let w = 5; // width of shapes used to build lines.

function setup() {
  createCanvas(sketchW, sketchH);
  xPos = 0;
  colorMode(HSL)
  bgColor = clr = color(h, s, l, 1-o)
  background(color(20, 20, 95, 1));
  frameRate(60)
}

function draw() {
  let px = xPos % (lineW)
  
  if ((xPos+1) / (lineW) === 3) { noLoop() };
  
  if (xPos % (lineW) === 0) { clr = color(h + random(-20, 20), s + random(-20, 20), l+20) };

  for (let y = 0; y < nLines; y++) {
    let cx = px + borderW;
    let offset = map(noise((xPos + (y+200) * 100) * .005), 0, 1, -spacing/2.5, spacing/2.5)
    let cy = (borderW + (y*spacing)) + offset;
    fill(hue(clr), saturation(clr), lightness(clr) * (1.6 - (cy/height)), .4);
    noStroke()
    rect(cx - w/2, cy - w/2, w, w)
    fill(20, 20, 20, o)
    rect(cx - w/2, cy, w, w/2)
  }
  xPos += 1;
}