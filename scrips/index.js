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
const board = document.getElementById('game-board')
for (let i = 0; i < 3; i++) {
    const rowDiv = document.createElement('div')
    for (let j = 0; j < 3; j++) {
        rowDiv.appendChild((createSquare(i * 3 + j, null)))
    }
    board.appendChild(rowDiv)
}