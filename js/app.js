/*-------------------------------- Constants --------------------------------*/

let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
squareIndex = document.querySelectorAll('.board .sqr')
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.board .sqr')
const messageEl = document.querySelector('#message')
/*-------------------------------- Functions --------------------------------*/
board = ['', '', '', '', '', '', '', '', '']
turn = "X"
winner = null
tie = false

const updateBoard = () => {
    board.forEach((item, index) => {
        squareEls[index].textContent = item
    })
}

const updateMessage = () => {
    if (winner !== null)  {
        messageEl.textContent = `${winner} wins!`
    } else if (tie === true) {
        messageEl.textContent = "This is a tie"
    } else {
        messageEl.textContent = `Player ${turn}'s turn`
    }
}

const render = () => {
    updateBoard()
    updateMessage()
}

const init = () => {
    render()
}
init()


const checkForWinner = () => {
    winner = null
    // tie = !board.includes('') ? true : false
    if (!board.includes('')) {
        tie = true
    } else {
        tie = false
    }

    winningCombos.forEach((element) => {
        if (board[element[0]] !== '' && board[element[0]] === board[element[1]] && board[element[1]] === board[element[2]]) {
            winner = board[element[0]]
        } 
    })
    if (winner === null && tie){
        tie = true
    }
    updateMessage()
    return winner
}


const placePiece = (index) => {
    if  (board[index] === "" && !winner && !tie) {
        board[index] = turn
        updateBoard()

        checkForWinner()
        if(!winner && !tie) {
            if (turn === "X"){
                turn = "O"
            } else {
                turn = "X"
            }       
        }
   }
}

const handleClick = (event) => {
    const index = event.target.id
    placePiece(index)
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
})

updateBoard()