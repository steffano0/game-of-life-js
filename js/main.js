// Get the grid and button elements
const grid = document.getElementById('grid');
const playBtn = document.getElementById('play-btn');
const applyBtn = document.getElementById('apply-btn');
const gridSizeInput = document.getElementById('grid-size');

// Auxiliary variables
let cellsMatrix;
let cells;
let alive = 1;
let dead = 0;

// Create the initial grid
let gridSize = parseInt(gridSizeInput.value);
initializeGrid(gridSize);

    
// Start button click event listener
playBtn.addEventListener('click', startGameOfLife);

// Apply button click event listener
applyBtn.addEventListener('click', applyGridSize);

// Function to toggle cell state
function toggleCellState(event) {
    const cell = event.target;
    cell.classList.toggle('alive');
}

// Function to start the Game of Life
function startGameOfLife() {
    setInitialCellState();
    setInterval(getNextGeneration, 100);
    
}




function applyGridSize() {
    const newGridSize = parseInt(gridSizeInput.value);
    if (newGridSize !== gridSize) {
        gridSize = newGridSize;
        initializeGrid(gridSize);
    }
    
}


function initializeGrid(size) {
    // Clear the current grid
    grid.innerHTML = ""
    cells = [];
    cellsMatrix = [];
    for (let i = 0; i < size; i++) {
        let column = document.createElement("div");
        let columnElements = [];
        cellsMatrix.push(new Array(size).fill(dead));
        cells.push(columnElements);
        column.className = "column";
        grid.appendChild(column);
        for (let j = 0; j < size; j++) {
            let row = document.createElement("div");
            columnElements.push(row);
            row.className = "row";
            column.appendChild(row);

        }
        columnElements.forEach(element => element.addEventListener('click', toggleCellState));
    }
    /* cells.forEach(cell => cell.addEventListener('click', toggleCellState)); */
    
   /* cells = Array.from(document.querySelectorAll(".row")); */
    console.log(cellsMatrix);
    console.log(cells);
}

function setInitialCellState () {
    for(let y = 0; y < gridSize; y++) {
        for(let x = 0; x < gridSize; x++) {
            cells[y][x].classList.contains('alive') ? cellsMatrix[y][x] = 1 : cellsMatrix[y][x] = 0;
        }
    }

}

function setNextCellState () {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (cellsMatrix[y][x] == 1 && cells[y][x].classList.contains('alive') == false) {
                cells[y][x].classList.toggle('alive');
            } else if (cellsMatrix[y][x] == 0 && cells[y][x].classList.contains('alive') == true) {
                cells[y][x].classList.toggle('alive');
            }
             
        }
             
          
      }
}

function countLivingNeighbors(x, y) {
    let count = 0;
        for (dy = -1; dy <= 1; dy++) {
          for (dx = -1; dx <= 1; dx++) {
            let nx = (x + dx + gridSize) % gridSize, ny = (y + dy + gridSize) % gridSize;
            count = count + cellsMatrix[ny][nx];
          }
        }
        return count - cellsMatrix[y][x];
}

function getNextGeneration() {
    let newCellsMatrix = [];
        for (let i = 0; i < gridSize; i++) {
          newCellsMatrix.push(new Array(gridSize).fill(dead));
        }
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            let neighbors = countLivingNeighbors(x, y);
            if (cellsMatrix[y][x] == dead && neighbors == 3) {
              newCellsMatrix[y][x] = alive;
            }
            if (cellsMatrix[y][x] == alive && (neighbors == 2 || neighbors == 3)) {
              newCellsMatrix[y][x] = alive;
            }
          }
        }
        cellsMatrix = newCellsMatrix;
        setNextCellState();
}

          













   





