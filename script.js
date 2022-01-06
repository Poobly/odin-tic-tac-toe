const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    return {gameboard};
})();

const displayController = (() => {
    const gameboard = gameBoard.gameboard;
    const display = (gameboard) => {
        console.log(gameboard);
    };
    return {display};
})();

const Players = (name, sign) => {
    const getName  = () => name;
    const setSquare = (button) => {

    };
    const getSign = () => sign;
    return {getName, getSign};
}

const turnHandler = (() => {
    let turn;
    const getTurn = () => turn;
    const nextTurn = () => (turn !== p1) ? turn = p1 : turn = p2;
    return {getTurn, nextTurn};
})();

const playGame = (() => {
    const divs = document.querySelectorAll(".grid-piece"); 
    const p1 = Players("p1", "X");
    const p2 = Players("p2", "O");
    console.log(p1.getSign());
    (function createListeners() {
        divs.forEach((div) => {
            div.addEventListener("click", (e) => {
                switch (turnHandler.getTurn(p1, p2)) {
                    case p1:
                        gameBoard.gameboard[e.target.dataset.key] = p1.getSign();
                        break;
                    case p2:
                        gameBoard.gameboard[e.target.dataset.key] = p2.getSign();
                        break;
                }
                turnHandler.nextTurn();
            });
        });
    })();
})();