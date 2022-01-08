const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    return {gameboard};
})();

const displayController = (() => {
    const gameboard = gameBoard.gameboard;
    const display = (e, sign) => {
        e.target.textContent = sign;
    };
    const displayWinModal = (winner) => {
        const winModalCon = document.getElementById("game-end-modal-con");
        const winModal = document.getElementById("game-end-modal");
        winModalCon.style.display = "flex"
        
        if (winner === "draw") winModal.textContent = `It's a tie.`
        else winModal.textContent = `${winner.getSign} has won.`

        // checks for mousedown to exit modal.
        winModalCon.addEventListener("mousedown", (e) => {
            resetDisplay()
            winModalCon.style.display = "none"
        });
    }
    const resetDisplay = () => {
        const gameBoardBoxes = document.querySelectorAll("#game-con > div > div");
        gameBoardBoxes.forEach((ele) => ele.textContent = null)
    }

    return {display, displayWinModal, resetDisplay};
})();

const Players = (name, sign) => {
    const getName = name;
    const getSign = sign;
    return {getName, getSign};
}

const turnHandler = (() => {
    let turn;
    let winner;
    const getTurn = () => turn;
    const nextTurn = (p1, p2) => (turn !== p2) ? turn = p2 : turn = p1;
    const checkWin = (gameboard, p1, p2) => {
        console.log(typeof(gameboard))
        if (gameboard[0] === "X" && gameboard[4] === "X" && gameboard[8] === "X"
            || gameboard[0] === "X" && gameboard[1] === "X" && gameboard[2] === "X"
            || gameboard[3] === "X" && gameboard[4] === "X" && gameboard[5] === "X"
            || gameboard[6] === "X" && gameboard[7] === "X" && gameboard[8] === "X"
            || gameboard[0] === "X" && gameboard[3] === "X" && gameboard[6] === "X"
            || gameboard[1] === "X" && gameboard[4] === "X" && gameboard[7] === "X"
            || gameboard[2] === "X" && gameboard[5] === "X" && gameboard[8] === "X"
            || gameboard[2] === "X" && gameboard[4] === "X" && gameboard[6] === "X") {
                winner = p1;
                return true;
        }
        else if (gameboard[0] === "O" && gameboard[4] === "O" && gameboard[8] === "O"
                || gameboard[0] === "O" && gameboard[1] === "O" && gameboard[2] === "O"
                || gameboard[3] === "O" && gameboard[4] === "O" && gameboard[5] === "O"
                || gameboard[6] === "O" && gameboard[7] === "O" && gameboard[8] === "O"
                || gameboard[0] === "O" && gameboard[3] === "O" && gameboard[6] === "O"
                || gameboard[1] === "O" && gameboard[4] === "O" && gameboard[7] === "O"
                || gameboard[2] === "O" && gameboard[5] === "O" && gameboard[8] === "O"
                || gameboard[2] === "O" && gameboard[4] === "O" && gameboard[6] === "O") {
                    winner = p2;
                    return true;
        }
        else if (gameboard.every((value) => value !== "")) {
            winner = "draw";
            return true;    
        }
    }
    const endGame = () => {
        displayController.displayWinModal(winner)

        gameBoard.gameboard.forEach((element, index, array) => array[index] = "");
        turn = null;
        winner = null;
    }
    
    const restartGame = () => {
        gameBoard.gameboard.forEach((element, index, array) => array[index] = "");
        turn = null;
        winner = null;
        displayController.resetDisplay();
    }

    return {getTurn, nextTurn, checkWin, endGame, restartGame};
})();

const playGame = (() => {
    const divs = document.querySelectorAll(".grid-piece");
    const restartButton = document.getElementById("restart-button");
    const p1 = Players("p1", "X");
    const p2 = Players("p2", "O");

    (function createListeners() {
        divs.forEach((div) => {
            div.addEventListener("click", (e) => {
                if (gameBoard.gameboard[e.target.dataset.key] === "") {
                    console.log(turnHandler.getTurn())
                    switch (turnHandler.getTurn()) {
                        case p1:
                            gameBoard.gameboard[e.target.dataset.key] = p1.getSign;
                            displayController.display(e, p1.getSign);
                            break;
                        case p2:
                            gameBoard.gameboard[e.target.dataset.key] = p2.getSign;
                            displayController.display(e, p2.getSign);
                            break;
                        default:
                            gameBoard.gameboard[e.target.dataset.key] = p1.getSign;
                            displayController.display(e, p1.getSign);
                            break;
                    }
                    if (turnHandler.checkWin(gameBoard.gameboard, p1, p2)) {
                        turnHandler.endGame()
                    }
                    else {
                        turnHandler.nextTurn(p1, p2);
                    }
                }
            });
        });
        restartButton.addEventListener("click", turnHandler.restartGame);
    })();
})();