// Grid and button elements
const grid = document.getElementById('grid');
const playBtn = document.getElementById('play-btn');
const applyBtn = document.getElementById('apply-btn');
const clearBtn = document.getElementById('clear-btn');
const gridSizeInput = document.getElementById('grid-size');

// Auxiliary variables
let cellsMatrix;
let cells;
let alive = 1;
let dead = 0;
let isPlaying = false;
let interval;

// Initial grid
let gridSize = parseInt(gridSizeInput.value);
initializeGrid(gridSize);

// Buttons event listeners
playBtn.addEventListener('click', startGameOfLife);
clearBtn.addEventListener('click', clearGrid);
applyBtn.addEventListener('click', applyGridSize);

// Function to toggle cell state
function toggleCellState(event) {
  const cell = event.target;
  cell.classList.toggle('alive');
}

// Function to clear the grid
function clearGrid() {
  clearInterval(interval); // Stop the game if it's currently playing
  isPlaying = false;
  playBtn.textContent = 'Play';

  // Reset cell states and update UI
  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      cells[rowIndex][columnIndex].classList.remove('alive');
      cellsMatrix[rowIndex][columnIndex] = dead;
    }
  }
}

// Function to start the Game of Life
function startGameOfLife() {
  if (!isPlaying) {
    isPlaying = true;
    playBtn.textContent = 'Stop';
    setInitialCellState();
    interval = setInterval(getNextGeneration, 100);
  } else {
    isPlaying = false;
    playBtn.textContent = 'Play';
    clearInterval(interval);
  }
}

// Function to apply the new grid size
function applyGridSize() {
  const newGridSize = parseInt(gridSizeInput.value);
  if (newGridSize !== gridSize) {
    gridSize = newGridSize;
    initializeGrid(gridSize);
  }
}

// Function to initialize the grid
function initializeGrid(gridSize) {
  // Clear the current grid
  grid.innerHTML = "";
  cells = [];
  cellsMatrix = [];

  for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
    let column = document.createElement("div");
    let columnElements = [];
    cellsMatrix.push(new Array(gridSize).fill(dead));
    cells.push(columnElements);
    column.className = "column";
    grid.appendChild(column);

    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
      let cell = document.createElement("div");
      columnElements.push(cell);
      cell.className = "row";
      column.appendChild(cell);
      cell.addEventListener('click', toggleCellState);
    }
  }
}

// Function to set the initial cell state
function setInitialCellState() {
  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      cells[rowIndex][columnIndex].classList.contains('alive') ? cellsMatrix[rowIndex][columnIndex] = alive : cellsMatrix[rowIndex][columnIndex] = dead;
    }
  }
}

// Function to set the next cell state
function setNextCellState() {
  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      if (cellsMatrix[rowIndex][columnIndex] == 1 && !cells[rowIndex][columnIndex].classList.contains('alive')) {
        cells[rowIndex][columnIndex].classList.toggle('alive');
      } else if (cellsMatrix[rowIndex][columnIndex] == 0 && cells[rowIndex][columnIndex].classList.contains('alive')) {
        cells[rowIndex][columnIndex].classList.toggle('alive');
      }
    }
  }
}

// Function to count living neighbors
function countLivingNeighbors(rowIndex, columnIndex) {
  let count = 0;

  for (let i = Math.max(0, columnIndex - 1); i < Math.min(gridSize, columnIndex + 2); i++) {
    for (let j = Math.max(0, rowIndex - 1); j < Math.min(gridSize, rowIndex + 2); j++) {
      if (columnIndex !== i || rowIndex !== j) {
        if (cellsMatrix[j][i] == 1) {
          count++;
        }
      }
    }
  }

  return count;
}

// Function to get the next generation
function getNextGeneration() {
  let newCellsMatrix = [];

  for (let i = 0; i < gridSize; i++) {
    newCellsMatrix.push(new Array(gridSize).fill(dead));
  }

  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      let neighbors = countLivingNeighbors(rowIndex, columnIndex);

      if (cellsMatrix[rowIndex][columnIndex] == dead && neighbors == 3) {
        newCellsMatrix[rowIndex][columnIndex] = alive;
      }
      if (cellsMatrix[rowIndex][columnIndex] == alive && (neighbors == 2 || neighbors == 3)) {
        newCellsMatrix[rowIndex][columnIndex] = alive;
      }
    }
  }

  cellsMatrix = newCellsMatrix;
  setNextCellState();
}
