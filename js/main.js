function initializeGrid (size = 32) {
    grid.innerHTML = "";

    // Set the CSS grid properties
    grid.style.gridTemplateColumns = `repeat(${size}, 10px)`;
    grid.style.gridTemplateRows = `repeat(${size}, 10px)`;

    // Create the grid cells
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
}

// Get the grid and start button elements
const grid = document.querySelector('.grid');
const startBtn = document.getElementById('startBtn');
const applyBtn = document.getElementById('applyBtn');
const gridSizeInput = document.getElementById('gridSize');

// Create the initial grid
let gridSize = parseInt(gridSizeInput.value);
createGrid(gridSize);

// Add click event listener to toggle cell state
grid.addEventListener('click', toggleCellState);

// Start button click event listener
startBtn.addEventListener('click', startGame);

// Apply button click event listener
applyBtn.addEventListener('click', applyGridSize);

// Function to toggle cell state
function toggleCellState(event) {
    const cell = event.target;
    cell.classList.toggle('alive');
}

// Function to start the Game of Life
function startGame() {
    const livingCells = getLivingCells();
    simulateGameOfLife(livingCells);
}

// Function to retrieve the living cells from the grid
function getLivingCells() {
    const aliveCells = grid.querySelectorAll('.alive');
    return Array.from(aliveCells).map((cell) => {
        const index = Array.from(grid.children).indexOf(cell);
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        return [row, col];
    });
}

// Function to apply the grid size change
function applyGridSize() {
    const newGridSize = parseInt(gridSizeInput.value);
    if (newGridSize !== gridSize) {
        gridSize = newGridSize;
        createGrid(gridSize);
    }
}

// Function to create the grid
function initializeGrid(size = 32) {
    // Clear the current grid
    grid.innerHTML = '';

    // Set the CSS grid properties
    grid.style.gridTemplateColumns = `repeat(${size}, 10px)`;
    grid.style.gridTemplateRows = `repeat(${size}, 10px)`;

    // Create the grid cells
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
}
