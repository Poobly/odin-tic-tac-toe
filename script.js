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
        inputForm.style.display = "flex"
        
    }
    return {display};
})();

const Players = (name, sign) => {
    const getName = name;
    const getSign = sign;
    return {getName, getSign};
}

const turnHandler = (() => {
    let turn;
    const getTurn = () => turn;
    const nextTurn = (p1, p2) => (turn !== p2) ? turn = p2 : turn = p1;
    const checkWin = (gameboard, p1, p2) => {
        if (gameboard[0] === "X" && gameboard[4] === "X" && gameboard[8] === "X"
            || gameboard[0] === "X" && gameboard[1] === "X" && gameboard[2] === "X"
            || gameboard[3] === "X" && gameboard[4] === "X" && gameboard[5] === "X"
            || gameboard[6] === "X" && gameboard[7] === "X" && gameboard[8] === "X"
            || gameboard[0] === "X" && gameboard[3] === "X" && gameboard[6] === "X"
            || gameboard[1] === "X" && gameboard[4] === "X" && gameboard[7] === "X"
            || gameboard[2] === "X" && gameboard[5] === "X" && gameboard[8] === "X") {
                endGame(p1);
        }
        else if (gameboard[0] === "O" && gameboard[4] === "O" && gameboard[8] === "O"
                || gameboard[0] === "O" && gameboard[1] === "O" && gameboard[2] === "O"
                || gameboard[3] === "O" && gameboard[4] === "O" && gameboard[5] === "O"
                || gameboard[6] === "O" && gameboard[7] === "O" && gameboard[8] === "O"
                || gameboard[0] === "O" && gameboard[3] === "O" && gameboard[6] === "O"
                || gameboard[1] === "O" && gameboard[4] === "O" && gameboard[7] === "O"
                || gameboard[2] === "O" && gameboard[5] === "O" && gameboard[8] === "O") {
                endGame(p2);
        }
    }
    const endGame = (winner) => {
        displayController.displayWinModal(winner)
    }
    return {getTurn, nextTurn, checkWin};
})();

const playGame = (() => {
    const divs = document.querySelectorAll(".grid-piece"); 
    const p1 = Players("p1", "X");
    const p2 = Players("p2", "O");

    (function createListeners() {
        divs.forEach((div) => {
            div.addEventListener("click", (e) => {
                console.log(turnHandler.getTurn());
                if (gameBoard.gameboard[e.target.dataset.key] === "") {
                    switch (turnHandler.getTurn()) {
                        case p1:
                            console.log("p1");
                            gameBoard.gameboard[e.target.dataset.key] = p1.getSign;
                            displayController.display(e, p1.getSign);
                            break;
                        case p2:
                            console.log("p2");
                            gameBoard.gameboard[e.target.dataset.key] = p2.getSign;
                            displayController.display(e, p2.getSign);
                            break;
                        default:
                            console.log("p1");
                            gameBoard.gameboard[e.target.dataset.key] = p1.getSign;
                            displayController.display(e, p1.getSign);
                            break;
                    }
                    console.log(gameBoard.gameboard)
                    if (turnHandler.checkWin(gameBoard.gameboard, p1, p2)) {
                        console.log("apple");
                        turnHandler.endGame
                    }
                    turnHandler.nextTurn(p1, p2);
                }
            });
        });
    })();
})();