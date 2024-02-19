function getAIMove(selectedOption, board, currentPlayer) {
    if (selectedOption === "easyAI") {
        const possibleMoves = [];
        for (i = 0; i < 9; i++) {
            if (board[i] === 0) {
                possibleMoves.push(i);
            }
        }
        return possibleMoves[(possibleMoves.length * Math.random()) | 0];
    }

    if (selectedOption === "hardcoreAI") {
        const minimizingPlayer =
            currentPlayer === X_PLAYER ? O_PLAYER : X_PLAYER;
        scores[currentPlayer] = 10;
        scores[minimizingPlayer] = -10;

        return findBestMove(board, currentPlayer, minimizingPlayer);
    }
}

const scores = {
    tie: 0,
};

function findBestMove(board, currentPlayer, minimizingPlayer) {
    let bestScore = -Infinity;
    let move;
    let moves = [];

    for (let i = 0; i < 9; i++) {
        if (board[i] == 0) {
            board[i] = currentPlayer;
            let score = minimax(
                board,
                0,
                false,
                currentPlayer,
                minimizingPlayer
            );
            if (score === bestScore) {
                moves.push(i);
            } else if (score > bestScore) {
                bestScore = score;
                moves = [i];
                console.log(`New best ${i}`, moves);
            }
            board[i] = 0;
        }
    }

    return moves[(moves.length * Math.random()) | 0];
}

function minimax(
    board,
    depth,
    isMaximizing,
    maximazingPlayer,
    minimizingPlayer
) {
    let result = checkWinner(board);
    if (result.result !== null) {
        if (isMaximizing) {
            return scores[result.result] - depth;
        }
        return scores[result.result] + depth;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] == 0) {
                board[i] = maximazingPlayer;
                let score = minimax(
                    board,
                    depth + 1,
                    false,
                    maximazingPlayer,
                    minimizingPlayer
                );
                board[i] = 0;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] == 0) {
                board[i] = minimizingPlayer;
                let score = minimax(
                    board,
                    depth + 1,
                    true,
                    maximazingPlayer,
                    minimizingPlayer
                );
                board[i] = 0;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
