const btnRestart = document.querySelector("#btnRestart");
const playerText = document.querySelector("#playerText");

btnRestart.addEventListener("click", resetGame);

const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const X_PLAYER = "X";
const O_PLAYER = "O";

let currentPlayer = X_PLAYER;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let isPlaying = true;

const cells = Array.from(document.querySelectorAll(".cell"));

for (const cell of cells) {
    cell.addEventListener("click", function (e) {
        if (!isPlaying) {
            return;
        }
        const target = e.target;
        const targetId = Number(target.id);
        if (target.innerHTML != "") {
            return;
        }
        board[targetId] = currentPlayer;
        target.innerHTML = currentPlayer;

        let result = checkWinner(board);

        if (result.result) {
            setGameResult(result);
            return;
        }

        currentPlayer = currentPlayer === X_PLAYER ? O_PLAYER : X_PLAYER;

        if (selectedOption === "pvp") {
            return;
        }

        performAIMove();
    });
}

function resetGame() {
    isPlaying = true;
    currentPlayer = X_PLAYER;

    for (let i = 0; i < 9; i++) {
        board[i] = 0;
    }
    for (const cell of cells) {
        cell.innerHTML = "";
        cell.classList.remove("winner");
    }
    playerText.innerHTML = `Good luck!`;

    if (selectedOption !== "pvp" && Math.random() < 0.5) {
        performAIMove();
    }
}

function checkWinner(board) {
    for (const combo of winningCombos) {
        if (
            board[combo[0]] === X_PLAYER &&
            board[combo[1]] === X_PLAYER &&
            board[combo[2]] === X_PLAYER
        ) {
            return {
                result: X_PLAYER,
                combo: combo,
            };
        }

        if (
            board[combo[0]] === O_PLAYER &&
            board[combo[1]] === O_PLAYER &&
            board[combo[2]] === O_PLAYER
        ) {
            return {
                result: O_PLAYER,
                combo: combo,
            };
        }
    }

    const numOfEmptyCells = board.filter((cell) => cell === 0).length;

    if (numOfEmptyCells === 0) {
        return {
            result: "tie",
            combo: null,
        };
    }

    return {
        result: null,
        combo: null,
    };
}

function setGameResult(result) {
    isPlaying = false;
    if (result.combo) {
        for (const id of result.combo) {
            document.getElementById(id).classList.add("winner");
        }
    }
    if (result.result != "tie") {
        playerText.innerHTML = `${result.result} WINS!`;
    } else {
        playerText.innerHTML = `Close one, it's a tie!`;
    }
}

function chooseStartingPlayer() {
    startingPlayer = Math.random() < 0.5 ? X_PLAYER : O_PLAYER;
}

function performAIMove() {
    const aiMove = getAIMove(selectedOption, board, currentPlayer);

    board[aiMove] = currentPlayer;
    document.getElementById(aiMove).innerHTML = currentPlayer;

    result = checkWinner(board);

    if (result.result) {
        setGameResult(result);
        return;
    }

    switchCurrentPlayer();
}

function switchCurrentPlayer() {
    currentPlayer = currentPlayer === X_PLAYER ? O_PLAYER : X_PLAYER;
}
