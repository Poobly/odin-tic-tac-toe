const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    const checkEmpty = () => gameboard.every((value) => value === "")
    const resetBoard = () => gameBoard.gameboard.forEach((element, index, array) => array[index] = "")
    return {gameboard, checkEmpty, resetBoard};
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
        else winModal.textContent = `${winner.getSign()} has won.`

        // checks for mousedown to exit modal.
        winModalCon.addEventListener("mousedown", (e) => {
            resetDisplay()
            winModalCon.style.display = "none"
        });
    }
    const resetDisplay = () => {
        const gameBoardBoxes = document.querySelectorAll("#game-con > div > div");
        gameBoardBoxes.forEach((ele) => ele.textContent = "")
    }

    return {display, displayWinModal, resetDisplay};
})();

const Players = (name, sign) => {
    let player;
    const getName = () => name;
    const getSign = () => sign;
    const getPlayer = () => player;
    const assignPlayer = (value) => player = value; 
    return {getName, getSign, getPlayer, assignPlayer};
}

const turnHandler = (() => {
    let turn;
    let winner;
    const setTurn = (input) => turn = input;
    const getTurn = () => turn;
    const nextTurn = (p1, p2) => (turn === p1) ? turn = p2 : turn = p1;
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
    const endGame = (p1) => {
        displayController.displayWinModal(winner)
        gameBoard.resetBoard();
        turn = p1;
        winner = null;
    }
    
    const restartGame = (p1) => {
        gameBoard.resetBoard()
        turn = p1;
        winner = null;
        displayController.resetDisplay();
    }
    return {getTurn, nextTurn, checkWin, endGame, restartGame, setTurn};
})();

const cpu = (() => {
    const gameGrid = document.querySelectorAll(".grid-piece");
    const play = (sign) => {
        let cpuMove = Math.floor(Math.random() * 9);
        if (gameGrid[cpuMove].textContent === "" && gameBoard.gameboard[cpuMove] === "") {
            displayController.display(gameGrid[cpuMove], sign, cpuMove);
        }
        else if (!gameBoard.checkEmpty()){
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
    turnHandler.setTurn(p1);
    (function createListeners() {
        signSelection.forEach((button) => {
            button.addEventListener("click", (e) => {
                let pSign = e.target.textContent;
                if (gameBoard.checkEmpty()) {
                    if (e.target.className === "sign-button" && pSign === "X") {
                        p1.assignPlayer("USER");
                        p2.assignPlayer("CPU");
                    }
                    else if (e.target.className === "sign-button" && pSign === "O") {
                        p1.assignPlayer("CPU");
                        p2.assignPlayer("USER")
                        evaluateGame(e);
                    }
                }
            });
        });
        gameButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                // checks if gameboard is empty and first turn is player1 for default assignments
                if (gameBoard.checkEmpty() && turnHandler.getTurn() === p1) {
                    p1.assignPlayer("USER");
                    p2.assignPlayer("CPU");
                }
                evaluateGame(e);
            });
        });
        restartButton.addEventListener("click", () => turnHandler.restartGame(p1));
    })();

    function evaluateGame(e) {
        // checks if target div is empty or if current turn is cpu
        if (gameBoard.gameboard[e.target.dataset.key] === "" || turnHandler.getTurn().getPlayer() === "CPU") {
            switch (turnHandler.getTurn()) {
                case p1:
                    if (p1.getPlayer() === "USER") displayController.display(e.target, p1.getSign(), e.target.dataset.key);
                    else cpu.play(p1.getSign());
                    break;
                case p2:
                    if (p2.getPlayer() === "USER") displayController.display(e.target, p2.getSign(), e.target.dataset.key);
                    else cpu.play(p2.getSign());
                    break;

            }
            if (turnHandler.checkWin(gameBoard.gameboard, p1, p2)) {
                turnHandler.endGame(p1);
            }
            // changes turn and repeats function
            else {
                turnHandler.nextTurn(p1, p2);
                evaluateGame(e);
            }
        }
    }
})();