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


// Function to create the game board
function createBoard(squares, xIsNext, onPlay) {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    // Loop through rows and columns to create squares
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.className = 'board-row';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const squareValue = squares[index];
            // Create a square and append it to the row
            const square = createSquare(squareValue, () => handleClick(index));
            row.appendChild(square);
        }
        // Append the row to the board
        board.appendChild(row);
    }

    // Create and display the game status
    const status = document.createElement('div');
    status.className = 'status';
    const winner = calculateWinner(squares);
    if (winner) {
        status.textContent = 'Winner: ' + winner;
    } else {
        status.textContent = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    // Insert the status before the moves list
    document.getElementById('game-info').insertBefore(status, document.getElementById('moves-list'));

    // Function to handle square button click
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
}

// Function to create a move button
function createMoveButton(move, jumpTo) {
    const button = document.createElement('button');
    button.textContent = move === 0 ? 'Go to game start' : 'Go to move #' + move;
    button.addEventListener('click', () => jumpTo(move));
    const listItem = document.createElement('li');
    listItem.appendChild(button);
    return listItem;
}

// Function to render the move buttons
function renderMoves(history, currentMove, jumpTo) {
    const movesList = document.getElementById('moves-list');
    movesList.innerHTML = '';

    // Loop through the game history and create move buttons
    history.forEach((squares, move) => {
        movesList.appendChild(createMoveButton(move, jumpTo));
    });
}

// Function to check for a winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// Function to handle a play move
function handlePlay(nextSquares) {
    history.push(nextSquares);
    currentMove = history.length - 1;
    render();
}

// Function to jump to a specific move
function jumpTo(nextMove) {
    currentMove = nextMove;
    render();
}

// Function to render the game
function render() {
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    // Update the game board and move buttons
    createBoard(currentSquares, xIsNext, handlePlay);
    renderMoves(history, currentMove, jumpTo);
}

// Initial rendering of the game
render();