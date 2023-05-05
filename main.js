/*Player Factory*/
const playerFactory = (name, token) => {
  //Factory Declarations
  const getName = () => name;
  const getToken = () => token;

  //Public functions
  return { getName, getToken };
};

/*GameBoard Object*/
const gameBoard = (() => {
  //gameBoard object declarations*/
  let gameBoard = null;
  const player1 = playerFactory("player1", "X");
  const player2 = playerFactory("player2", "O");
  let player = player1;
  let round = 1;
  let finished = false;

  //returns the active player
  const playerTurn = () => {
    player === player1 ? (player = player2) : (player = player1);
  };

  const newGame = () => {
    round = 1;
    finished = false;
    let player = player1;
    if (gameBoard === null) {
      gameBoard = new Array(9).fill(null);
      displayController.render(gameBoard);
    }
    else{
      gameBoard = new Array(9).fill(null);
      displayController.updateBoard(gameBoard);
    }
  };

  const makeMove = (gridIndex) => {
    if (!gameBoard[gridIndex]) {
      gameBoard[gridIndex] = player.getToken();
      playerTurn();
    }
    displayController.updateBoard(gameBoard);
  };

  //Public functions
  return { newGame, makeMove };
})();

/*displayController Object:  Controls the flow of the game*/

const displayController = (() => {
  const render = (gamePosition) => {
    const gameElement = document.getElementById("gameBoard");
    const resetBtn = document.getElementById("resetGame");
    const children = gameElement.children;
    //Add event listeners on button clicks per square
    for (i = 0; i < 9; i++) {
      children[i].textContent = gamePosition[i];
      children[i].addEventListener("click", (e) => {
        gameBoard.makeMove(e.target.dataset.square);
      });
    }

    //Add event listener for the reset button

    resetBtn.addEventListener("click", (e) => {
      gameBoard.newGame();
    });
  };

  const updateBoard = (gamePosition) => {
    const gameElement = document.getElementById("gameBoard");
    const children = gameElement.children;
    for (i = 0; i < 9; i++) {
      children[i].textContent = gamePosition[i];
    }
  };
  //public functions
  return { render, updateBoard };
})();

//const game = displayController.render();

const game = gameBoard.newGame();
