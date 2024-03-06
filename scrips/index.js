// Initial game state
const history = [Array(9).fill(null)];
let currentMove = 0;

// Function to create a square button
function createSquare(value, onClick) {
    const button = document.createElement('button');
    button.className = 'square';
    button.textContent = value;
    button.addEventListener('click', onClick);
    return button;
}