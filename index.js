// Canvas
const canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
let canvasWidth = parseInt(canvas.getAttribute("width"));
let canvasHeight = parseInt(canvas.getAttribute("height"));

// Cells
let cells = [];
let cellsNumber = 40;
let cell = { x: 0, y: 0, vx: 0, vy: 0, r: 0, phase: 0 };
let cellColor = { r: 255, g: 111, b: 120 };
let cellRadius = 2;

// Line
let lineWidth = 1;
let distanceLimit = 260;

function randomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumberFrom(min, max) {
  return Math.random() * (max - min) + min;
}

function randomSidePosition(length) {
  return Math.ceil(Math.random() * length);
}

function getRandomCell() {
  const position = randomArrayItem(["top", "right", "bottom", "left"]);

  switch (position) {
    case "top":
      return {
        x: randomSidePosition(canvasWidth),
        y: -cellRadius,
        r: cellRadius,
        phase: randomNumberFrom(0, 10)
      };
      break;
    case "right":
      return {
        x: canvasWidth + cellRadius,
        y: randomSidePosition(canvasHeight),
        r: cellRadius,
        phase: randomNumberFrom(0, 10)
      };
      break;
    case "bottom":
      return {
        x: randomSidePosition(canvasWidth),
        y: canvasHeight + cellRadius,
        r: cellRadius,
        phase: randomNumberFrom(0, 10)
      };
      break;
    case "left":
      return {
        x: -cellRadius,
        y: randomSidePosition(canvasHeight),
        r: cellRadius,
        phase: randomNumberFrom(0, 10)
      };
      break;
  }
}

// Draw Cell
function renderCells() {
  Array.prototype.forEach.call(cells, function(cell) {
    if (!cell.hasOwnProperty("type")) {
      canvasContext.fillStyle =
        "rgb(" + cellColor.r + "," + cellColor.g + "," + cellColor.b + ")";
      canvasContext.beginPath();
      canvasContext.arc(cell.x, cell.y, cellRadius, 0, Math.PI * 2, true);
      canvasContext.closePath();
      canvasContext.fill();
    }
  });
}

// Draw lines
function renderLines() {
  let fraction;
  let alpha;

  for (let i = 0; i < cells.length; i++) {
    for (let j = i + 1; j < cells.length; j++) {
      fraction = getDistanceOf(cells[i], cells[j]) / distanceLimit;

      if (fraction < 1) {
        alpha = (1 - fraction).toString();

        canvasContext.strokeStyle = "rgba(180,180,180," + alpha + ")";
        canvasContext.lineWidth = lineWidth;

        canvasContext.beginPath();
        canvasContext.moveTo(cells[i].x, cells[i].y);
        canvasContext.lineTo(cells[j].x, cells[j].y);
        canvasContext.stroke();
        canvasContext.closePath();
      }
    }
  }
}

// Calculate distance between two cells
function getDistanceOf(cell1, cell2) {
  let deltaX = Math.abs(cell1.x - cell2.x);
  let deltaY = Math.abs(cell1.y - cell2.y);

  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Init Canvas
function initCanvas() {
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

  canvas.setAttribute("width", canvas.parentNode.offsetWidth);
  canvas.setAttribute("height", canvas.parentNode.offsetHeight);

  canvasWidth = parseInt(canvas.getAttribute("width"));
  canvasHeight = parseInt(canvas.getAttribute("height"));

  distanceLimit = Math.min(canvasWidth / 3, 260);
}

// Init Cells
function initCells() {
  cells = [];

  for (let i = 1; i <= cellsNumber; i++) {
    cells.push({
      x: randomSidePosition(canvasWidth),
      y: randomSidePosition(canvasHeight),
      r: cellRadius,
      phase: randomNumberFrom(0, 10)
    });
  }
}

function draw() {
  initCanvas();
  initCells();
  renderCells();
  renderLines();
}

// Bind e
window.addEventListener("resize", function(e) {
  draw();
});

draw();
