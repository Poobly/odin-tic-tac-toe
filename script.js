const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    return {gameboard}
})();

const displayController = (() => {
    const gameboard = gameBoard.gameboard;
    const display = (gameboard) => {
        console.log(gameboard);
    };
    return {display}
})();

const Players = (name) => {
    const getName  = () => name;
    const setSquare = (button) => {

    };
    return {setSquare};
}

const playGame = (() => {
    const divs = document.querySelectorAll(".grid-piece");
    (function createListeners() {
        divs.forEach((div) => {
            div.addEventListener("click", (e) => {
                gameBoard.gameboard[e.target.dataset.key] = ;
            });
        });
    })();
})();