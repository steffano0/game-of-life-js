// Get the grid and start button elements
const grid = document.getElementById('grid');
const playBtn = document.getElementById('play-btn');
const applyBtn = document.getElementById('apply-btn');
const gridSizeInput = document.getElementById('grid-size');

// Create the initial grid
let gridSize = parseInt(gridSizeInput.value);
initializeGrid(gridSize);

// Add click event listener to toggle cell state
grid.addEventListener('click', toggleCellState);

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
    const livingCells = getLivingCells();
    simulateGameOfLife(livingCells);
}


function getLivingCells() {
    const aliveCells = grid.querySelectorAll('.alive');
    return Array.from(aliveCells).map((cell) => {
        const index = Array.from(grid.children).indexOf(cell);
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        return [row, col];
    });
}


function applyGridSize() {
    const newGridSize = parseInt(gridSizeInput.value);
    if (newGridSize !== gridSize) {
        gridSize = newGridSize;
        initializeGrid(gridSize);
    }
}


function initializeGrid(size=32) {
    // Clear the current grid
    grid.innerHTML = ""
    
    for (let i = 0; i < size; i++) {
        let column = document.createElement("div");
        column.className = "column";
        for (let j = 0; j < size; j++) {
            let row = document.createElement("div");
            row.className = "row";
            column.appendChild(row);
        }
        grid.appendChild(column);
    }
    cells = Array.from(document.querySelectorAll(".row"));
}
    




