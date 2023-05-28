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
