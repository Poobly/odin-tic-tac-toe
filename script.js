const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    return {gameboard};
})();

const displayController = (() => {
    const gameboard = gameBoard.gameboard;
    const display = (e, sign) => {
        e.target.textContent = sign;
    };
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
    const checkWin = (gameboard) => {
        // for (let i = 0; i <= gameboard.length; i++) {
            if (gameboard[0], gameboard[4], gameboard[8] === "X"
                || gameboard[0], gameboard[1], gameboard[2] === "X"
                || gameboard[3], gameboard[4], gameboard[5] === "X"
                || gameboard[6], gameboard[7], gameboard[8] === "X"
            )
            {
                console.log("x wins");
            }
            else if (gameboard[0], gameboard[4], gameboard[8] === "O"
                    || gameboard[0], gameboard[1], gameboard[2] === "O"
                    || gameboard[3], gameboard[4], gameboard[5] === "O"
                    || gameboard[6], gameboard[7], gameboard[8] === "O"
            )
            {
                console.log("o wins")
            }
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
                    turnHandler.checkWin(gameBoard.gameboard)
                    turnHandler.nextTurn(p1, p2);
                }
            });
        });
    })();
})();