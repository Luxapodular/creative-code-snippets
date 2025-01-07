
lSize = 10;
cSize = 3;
xRot = 180;
yRot = 150;
gSize = 70;

mx = cSize*1.5;
h = cSize * 1.5;
cWidth = mx*2;
cHeight = h*2;
tiles =[]
const tileTypes = [
  "dirt",
  "grass",
  "sand",
  "water",
  "stone",
  "clay"
];
tileColors = []


function setup() {
  createCanvas(gSize*mx*2, gSize*h);
tileColors = {
  dirt: color(120, 100, 80),     // Cool, muted brown
  grass: color(100, 130, 90),    // Deep, desaturated green
  sand: color(180, 160, 120),    // Soft tan with cooler undertones
  water: color(90, 120, 160),    // Cool blue with gray hints
  stone: color(110, 120, 130),   // Cool slate gray
  lava: color(170, 80, 60),      // Deep brick red
  snow: color(220, 220, 225),    // Cool, pale gray
  forest: color(85, 110, 75),    // Dark, cool forest green
  clay: color(150, 110, 90),     // Muted reddish-brown
}
  generateBaseTiles();
  floodFillTile(floor(random(0, gSize)), floor(random(0,gSize)))
  frameRate(20)
}

function draw() {
  background(40);
  drawCubes(); 
  
  for (let row=0; row<tiles.length; row++) {
    tileRow = tiles[row]
    tileRow.shift();
    tileRow.push({
      type1: undefined,
      type2: undefined,
    });
  }
  
//   console.log("filling");
  floodFillTile(0, tiles[0].length-1)
}

function generateBaseTiles() {
  tileDetails = [];
  
  for (let row=0; row<=gSize; row++) {
    let row = [];
    tiles.push(row)
    for (let col=0; col<=gSize; col++) {
      row.push({
        type1: undefined,
        type2: undefined,
      });
     }
  }
}

function validTile(row, col) {
  return ! (col < 0 || row < 0 || col >gSize || row > gSize);
}

function floodFillTile(row, col) {
  if (!validTile(row, col)) {
    // invalid tile
    return;
  }
  
  let tile = tiles[row][col];
  
  if (tile.type1 || tile.type2) {
    // tile already filled
    return;
  }
  
  let nearbyFilledTiles = [];
  let tilesToFill = [];

  for(let nRow=row-1; nRow<row+2; nRow++) {
    for (let nCol=col-1; nCol<col+2; nCol++) {
      if (!validTile(nRow, nCol)) {
        continue;
      }
      
      let nTile = tiles[nRow][nCol];
      
      if (nTile.type1 || nTile.type2) {
        nearbyFilledTiles.push(nTile);
      } else {
        tilesToFill.push([nRow, nCol]);
      }
    }
  }
  
  nTileTypes = [...tileTypes];
  
  nearbyFilledTiles.forEach(filledTile => {
    let weight = 50;
    for(let i=0; i<weight; i++) {
      nTileTypes.push(filledTile.type1);
      nTileTypes.push(filledTile.type2);
    }

  })
  
  tiles[row][col] = {type1: random(nTileTypes), type2: random(nTileTypes)}

  tilesToFill.forEach(next => {
    floodFillTile(next[0], next[1]);
  })
}




function chooseColor(tile) {
  return lerpColor(color(tileColors[tile.type1]), color(tileColors[tile.type2]), .25)
}

function drawCubes() {
  for (let row=0; row<=gSize; row++) {
    for (let col=gSize; col>=0; col--) {
      drawCube(col, row, 1, 0)
    }
  }
}

function drawCube(col, row, s, n) { 
  let x = col*cWidth + row%2*cWidth/2 - cWidth/2;
  let y = row*h*1.25;
  let mxx = mx*s; // midX, ajusted for scale. 
  let hh = h*s; // height, adjusted for scale.
  let cS = (cSize * s) // length of a side.

  let pt1 = {x, y}
  let pt2 = {x:x+mxx, y:y+cS}
  let pt3 = {x:x+mxx, y:y-cS}
  let pt4 = {x:x+mxx*2, y:y}
  let pt5 = {x:x, y:y+hh}
  let pt6 = {x:x+mxx, y:y+hh+cS}
  let pt7 = {x: x + mxx*2, y:y+hh}
  
  strokeWeight(.1);
  push()
  clr = chooseColor(tiles[row][col], 200);
  //top
    fill(color(red(clr), green(clr), blue(clr), 255))
  beginShape()
    vertex(pt1.x, pt1.y);
    vertex(pt2.x, pt2.y);
    vertex(pt4.x, pt4.y);
    vertex(pt3.x, pt3.y);
  endShape(CLOSE);
  
  // left
  fill(color(red(clr), green(clr), blue(clr), 255))
  beginShape()
    vertex(pt1.x, pt1.y);
    vertex(pt5.x, pt5.y);
    vertex(pt6.x, pt6.y);
    vertex(pt2.x, pt2.y);
  endShape(CLOSE);
    
  // right
  fill(color(red(clr), green(clr), blue(clr), 255))
  beginShape()
    vertex(pt2.x, pt2.y);
    vertex(pt6.x, pt6.y);
    vertex(pt7.x, pt7.y);
    vertex(pt4.x, pt4.y);
  endShape(CLOSE);
  pop();

}