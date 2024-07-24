document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let currentPlayer = true;
    let XWins = 0;
    let OWins = 0;
    let Tie = 0;
    let history = [];
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Initialize UI
    app.innerHTML = `
        <div class="scoreboard">
            <div>X Wins: <span id="x-wins">0</span></div>
            <div>O Wins: <span id="o-wins">0</span></div>
            <div>Tie: <span id="tie">0</span></div>
        </div>
        <div class="msg-container">
            <p class="msg">Winner</p> 
        </div>
        <h1>Tic Tac Toe</h1>
        <div class="container">
        <div class="game" id="game-board">
        </div>
        </div>
        <div class="button">
            <button class="resetBtn">Reset game</button>
            <button class="newGame hide">New Game</button>
        </div>
        <button class="undo hide">Undo</button>
    `;

    const cells = [];
    const gameBoard = document.getElementById('game-board');
    const resetBtn = document.querySelector('.resetBtn');
    const newGameBtn = document.querySelector('.newGame');
    const msg = document.querySelector('.msg');
    const undo = document.querySelector('.undo');
    const XWinsDisplay = document.getElementById('x-wins');
    const OWinsDisplay = document.getElementById('o-wins');
    const TieDisplay = document.getElementById('tie');

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        gameBoard.appendChild(cell);
        cells.push(cell);
    }

    // Cell click function
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            history.push(index);
            undo.classList.remove('hide');

            if (currentPlayer) {
                cell.innerHTML = 'X';
                cell.style.color = '#3d405b';
            } else {
                cell.innerHTML = 'O';
                cell.style.color = '#4f57a6';
            }
            cell.disabled = true;
            currentPlayer = !currentPlayer;

            checkWinner();
            checkDraw();
        });
    });

    // Check winner function
    const checkWinner = () => {
        for (let condition of winConditions) {
            if (
                cells[condition[0]].innerHTML &&
                cells[condition[0]].innerHTML === cells[condition[1]].innerHTML &&
                cells[condition[0]].innerHTML === cells[condition[2]].innerHTML
            ) {
                cells[condition[0]].style.color = '#f25f5c';
                cells[condition[1]].style.color = '#f25f5c';
                cells[condition[2]].style.color = '#f25f5c';

                cells.forEach(cell => cell.disabled = true);
                showWinner(cells[condition[0]].innerHTML);
                return;
            }
        }
    };

    // Show winner function and win count
    const showWinner = (winner) => {
        msg.innerHTML = `Congratulations ${winner} is the winner!`;
        msg.style.opacity = 1;
        undo.disabled = true;
        newGameBtn.classList.remove('hide');
        resetBtn.classList.add('hide');

        if (winner === 'X') {
            XWins++;
            XWinsDisplay.textContent = XWins;
        } else if (winner === 'O') {
            OWins++;
            OWinsDisplay.textContent = OWins;
        }
    };

    // Draw condition
    const checkDraw = () => {
        if (cells.every(cell => cell.innerHTML !== '')) {
            cells.forEach(cell => cell.disabled = true);
            Tie++;
            TieDisplay.textContent = Tie;
            msg.innerHTML = `It's a tie!`;
            msg.style.opacity = 1;
            resetBtn.classList.add('hide');
            newGameBtn.classList.remove('hide');
        }
    };

    // Reset button
    resetBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.disabled = false;
            cell.style.color = '#333';
        });
        history = [];
        msg.style.opacity = 0;
        newGameBtn.classList.add('hide');
        undo.classList.add('hide');
    });

    // New game button
    newGameBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.disabled = false;
            cell.style.color = '#333';
        });
        currentPlayer = true;
        history = [];
        msg.style.opacity = 0;
        newGameBtn.classList.add('hide');
        resetBtn.classList.remove('hide');
        undo.disabled = false;
    });

    // Undo button
    undo.addEventListener('click', () => {
        if (history.length > 0) {
            const lastMove = history.pop();
            cells[lastMove].innerHTML = '';
            cells[lastMove].disabled = false;
            currentPlayer = !currentPlayer;
            if (history.length === 0) {
                undo.classList.add('hide');
            }
        }
    });
});
