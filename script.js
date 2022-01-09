const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    return {gameboard};
})();

const displayController = (() => {
    const gameboard = gameBoard.gameboard;
    const display = (e, sign, index) => {
        gameBoard.gameboard[index] = sign;
        e.textContent = sign;
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

const cpu = (() => {
    const play = (sign) => {
        const gameGrid = document.querySelectorAll(".grid-piece");
        let cpuMove = Math.floor(Math.random() * 9);

        console.log(cpuMove);
        if (gameGrid[cpuMove].textContent === "") {
            displayController.display(gameGrid[cpuMove], sign, cpuMove)
        }
        else {
            play(sign);
        }
    }
    return {play};
})();

const playGame = (() => {
    const gameButtons = document.querySelectorAll(".grid-piece");
    const restartButton = document.getElementById("restart-button");
    const signSelection = document.querySelectorAll(".sign-button");
    const p1 = Players("p1", "X");
    const p2 = Players("p2", "O");
    (function createListeners() {
        signSelection.forEach((button) => {
            button.addEventListener("click", (e) => {
                let pSign = e.target.textContent;
                let cpuSign;
                if (e.target.className === "sign-button" && pSign === "X") {
                    cpuSign = "O";
                    console.log(cpuSign);
                    cpu.play(cpuSign);
                }
                else if (e.target.className === "sign-button" && pSign === "O") {
                    cpuSign = "X";
                    console.log(cpuSign);
                    cpu.play(cpuSign);
                }
            });
        });
        gameButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                if (gameBoard.gameboard[e.target.dataset.key] === "") {
                    switch (turnHandler.getTurn()) {
                        case p1:
                            displayController.display(e.target, p1.getSign, e.target.dataset.key);
                            break;
                        case p2:
                            displayController.display(e.target, p2.getSign, e.target.dataset.key);
                            break;
                        default:
                            displayController.display(e.target, p1.getSign, e.target.dataset.key);
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