let nx = 0;
let ny = 0;
let border = 0;
let noodles = [];
let thetaBig = 0;
let tAdjust = 0.3;
let rBig = 0;
let rAdjust = 0.01;
let trails = 0;
let trail = true;
let endTheta = 0;

function setup() {
  createCanvas(1000, 1000);
  border = width/10;
  theta = random(0, 360);
}

function draw() {
  let o = frameCount/100
  // nx = border + (noise(o) * width-border*2);
  // ny = border + (noise(o+1000) * height-border*2);
  
  if (trail) {
     for(let i=0; i<100; i++) {
      nx = width/2 + rBig * cos(radians(thetaBig));
  ny = height/2 + rBig * sin(radians(thetaBig));
  thetaBig += tAdjust;
  rBig += rAdjust;
    makeNoodle();
    moveNoodles();
    drawNoodles();
    killNoodles();
  } 
  } else {
    nx = width/2 + rBig * cos(radians(thetaBig));
    ny = height/2 + rBig * sin(radians(thetaBig));
    thetaBig += tAdjust;
    fill(70);
    circle(nx, ny, 20)
    
    if ((thetaBig % 360) > ((endTheta + 360))
  }
}

function makeNoodle() {
  if (random() > .7) {
    return;
  }
  let theta =  random(0, 360); 
  let r = random(5,25);
  noodles.push({
    x: nx,
    y: ny,
    tx: nx + r * cos(radians(theta)),
    ty: ny + r * sin(radians(theta)),
    r,
    created: millis()
  })
}

function moveNoodle(noodle) {
  noodle.nx = lerp(noodle.x, noodle.tx, .1);
  noodle.nx = lerp(noodle.x, nx, .05);
  
  noodle.ny = lerp(noodle.y, noodle.ty, .1);
  noodle.ny = lerp(noodle.y, ny, .05);
  noodle.r = noodle.r*.9;
}

function moveNoodles() {
  noodles.forEach(n => {
    moveNoodle(n);
  });
}

function drawNoodles() {
  noodles.forEach(n => {
    stroke(255);
    strokeWeight(.3);
    fill(70);
    circle(n.nx, n.ny, n.r);
    trails += 1;
    if (trails > 1000000) {
      trail = false;
      endTheta = thetaBig;
    }
  })
}

function killNoodles() {
  if (noodles.length > 30) {
    noodles.shift();
  }
}