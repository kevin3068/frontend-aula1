const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateStatus() {
    statusDisplay.textContent = `Jogador: ${currentPlayer}`;
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();
    if (winner) {
        statusDisplay.textContent = `🎉 Jogador ${winner} venceu!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusDisplay.textContent = '🤝 Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

updateStatus();
