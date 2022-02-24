const range = document.querySelector('input[type=range]');
const numRow = document.querySelector('#numRow');
const numColumn = document.querySelector('#numColumn');

// Detect mouse button: hold for drawing
const grid = document.querySelector('#grid');
let hold = false;

grid.addEventListener('mousedown', () => hold = true);
grid.addEventListener('mouseup', () => hold = false);



// Draw grid dynamic with dynamic dimension
range.addEventListener('input', () => {
    numRow.textContent = range.value;
    numColumn.textContent = range.value;
    createGrid(range.value);
})

// Grid / No Grid button
const btnBorder = document.querySelector('#btn-border');
btnBorder.addEventListener('click', drawGrid);

// Clear Grid button
const btnClear = document.querySelector('#btn-clear');
btnClear.addEventListener('click', clearGrid);


function clearGrid() {
    const squares = document.querySelectorAll('.squareGrid');

    squares.forEach(square => square.style.backgroundColor = 'white');
}
/**
* This function is drawing grid border on the canavas
*/
function drawGrid() {
    const squares = document.querySelectorAll('.squareGrid');

    squares.forEach(square => square.classList.toggle('grid-border'));

    // Change button text
    const btnBorder = document.querySelector('#btn-border');
    let buttonBorderText = btnBorder.textContent;

    if (buttonBorderText === 'No Grid') {
        btnBorder.textContent = 'Grid';
    } else {
        btnBorder.textContent = 'No Grid';
    }
}

/**
* This function create a grid. The default dimention is 16x16,
* user can choose from 1x1 to 100x100
* @param size {integer} - Grid dimension.
*
*/
function createGrid(size) {

    // Clean the grid contenitor
    const grid = document.querySelector('#grid');
    grid.innerHTML = '';

    // Compute a square dimention
    let dimension = 500 / size;

    // Drow a grid
    for (let i = 0; i < size; i++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        grid.appendChild(divRow);
        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');
            square.classList.add('squareGrid', 'grid-border');

            square.addEventListener('mousedown', draw);
            square.addEventListener('mouseover', draw);

            // Define dimention of each square
            square.style.width = `${dimension}px`;
            square.style.height = `${dimension}px`;
            divRow.appendChild(square);
        }
    }
}

function draw(e) {
    if (e.type === 'mouseover' && !hold) {
        return;
    } else {
        e.target.style.backgroundColor = 'black';
    }

}

// Create the first grid
createGrid(range.value);
