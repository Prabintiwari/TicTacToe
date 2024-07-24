
let cells = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('.resetBtn');
let newgame = document.querySelector('.newGame');
let msg = document.querySelector('.msg');
let undo = document.querySelector('.undo');
let XWinsDisplay = document.querySelector('#x-wins');
let OWinsDisplay = document.querySelector('#o-wins');
let TieDisplay = document.querySelector('#tie');


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

// Cell click function

cells.forEach((cell) => {
    cell.addEventListener('click',() => {
        history.push(cell);
        undo.classList.remove('hide');
       
        if(currentPlayer == true){
            cell.innerHTML = 'X';
            cell.style.color = '#3d405b';
            currentPlayer = false;
        }
        else{
            cell.innerHTML = 'O';
            cell.style.color = '#4f57a6';
            currentPlayer = true;
        }
       cell.disabled = true;
       
       checkWinner();
       CheckDraw();
      
    })
});



// Check winner function

const checkWinner = () => {
    for (let condition of winConditions){

        if(cells[condition[0]].innerHTML === cells[condition[1]].innerHTML && cells[condition[1]].innerHTML === cells[condition[2]].innerHTML && cells[condition[0]].innerHTML !== ''){

            cells[condition[0]].style.color = '#f25f5c';
            cells[condition[1]].style.color = '#f25f5c';
            cells[condition[2]].style.color = '#f25f5c';

            currentPlayer = !currentPlayer;
            

            cells.forEach((cell) => {
                cell.disabled = true;

            });
            showWinner(cells[condition[0]].innerHTML);
        }
      
    }
}

// Show winner function and win count

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations ${winner} is the winner!`;
    msg.style.opacity = 1;
    undo.disabled = true;
    newgame.classList.remove("hide");
    resetBtn.classList.add('hide');
   

    if (winner === 'X') {
       XWins = XWins + 1;
       XWinsDisplay.innerHTML = ` ${XWins}`;
       console.log(`${XWins}`);
   } else if (winner === 'O') {
       OWins++; 
       OWinsDisplay.innerHTML = `${OWins}`;
   }
   
}

// Draw condition

function CheckDraw() {
    let count = 0;
    cells.forEach((cell) => {
        if(cell.innerHTML !== ''){
            count++;
        }
    });
    if(count === 9){
        currentPlayer = !currentPlayer;
        cells.forEach((cell) => {
            Tie++;
            TieDisplay.textContent = `${Tie}`;
            cell.disabled = true;
            msg.innerHTML = `It's a tie!`;
            msg.style.opacity = 1;
            resetBtn.classList.add('hide');
            newgame.classList.remove("hide");

        });
    }
}

// Reset button

resetBtn.addEventListener('click', () => {
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.disabled = false;
        
    });
    newgame.classList.add('hide');
    undo.classList.add('hide');
});


// New game button

newgame.addEventListener('click', () => {
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.disabled = false;
        currentPlayer = !currentPlayer;
        cell.style.color = '#333';
    });
    msg.style.opacity = 0;
    newgame.classList.add('hide');
    resetBtn.classList.remove('hide');
    undo.disabled = false;
    
}
);

// Undo button

undo.addEventListener('click', () => {
     if(history.length > 0){
        history[history.length - 1].innerHTML = '';
        history[history.length - 1].disabled = false;
        history.pop();
        currentPlayer = !currentPlayer;
    }
});













