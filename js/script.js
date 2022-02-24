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

// Disable other checkbox when one is selected
const erase = document.querySelector('#erase');
const rainbow = document.querySelector('#rainbow');
const greyScale = document.querySelector('#grey-scale');

erase.addEventListener('click', () => {
    if (erase.checked) {
        rainbow.disabled = true;
        greyScale.disabled = true;
    } else {
        rainbow.disabled = false;
        greyScale.disabled = false;
    }
});

rainbow.addEventListener('click', () => {
    if (rainbow.checked) {
        erase.disabled = true;
        greyScale.disabled = true;
    } else {
        erase.disabled = false;
        greyScale.disabled = false;
    }
});

greyScale.addEventListener('click', () => {
    if (greyScale.checked) {
        erase.disabled = true;
        rainbow.disabled = true;
    } else {
        erase.disabled = false;
        rainbow.disabled = false;
    }
});

/**
* This function is clearing the grid
*/
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

    // Draw a grid
    for (let i = 0; i < size; i++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        grid.appendChild(divRow);
        for (let j = 0; j < size; j++) {
            const square = document.createElement('div');
            square.classList.add('squareGrid', 'grid-border');

            square.addEventListener('mousedown', draw);
            square.addEventListener('mouseover', draw);
            square.style.backgroundColor = "rgb(255, 255, 255)";
            //rgb(9, 9, 9);

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
        const erase = document.querySelector('#erase');
        const rainbow = document.querySelector('#rainbow');
        const greyScale = document.querySelector('#grey-scale');
        if (erase.checked) {
            e.target.style.backgroundColor = 'white';
        } else if (rainbow.checked) {
            e.target.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        } else if (greyScale.checked) {
            let color = e.target.style.backgroundColor;
            let r, g, b = 0;
            if (color.length === 18) {
                r = color.substring(4, 7);
                g = color.substring(9, 12);
                b = color.substring(14, 17);
            } else if (color.length === 15) {
                r = color.substring(4, 6);
                g = color.substring(8, 10);
                b = color.substring(12, 14);
            } else {
                r = color.substring(4, 5);
                g = color.substring(7, 8);
                b = color.substring(10,11);
            }
            e.target.style.backgroundColor = `rgb(${r - 24}, ${g - 24}, ${b - 24})`;
        } else {
            const color = document.querySelector('input[type=color]');
            e.target.style.backgroundColor = color.value;
        }
    }

}

// Create the first grid
createGrid(range.value);
