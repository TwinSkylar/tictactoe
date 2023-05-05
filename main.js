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
  let gameBoard = new Array();
  const player1 = playerFactory("player1", "X");
  const player2 = playerFactory("player2", "O");
  const player = player1;
  let round = 1;
  let finished = false;

  //returns the active player
  const playerTurn = () => {
    player === player1 ? player2 : player1;
  };

  const newGame = () => {
    round = 1;
    finished = false;
    gameBoard = new Array(9).fill(null);
    displayController.render(gameBoard);
  };

  const makeMove = (gridValue) => {
    console.log ("hit2:  " + gridValue);
    if (!gridValue){
      gridValue = playerTurn().getToken();
    }
  };

  //Public functions
  return { newGame, makeMove };
})();

/*displayController Object:  Controls the flow of the game*/

const displayController = (() => {
  // const gamePosition = ["X", "X", null, "X", "X", "O", "O", "O", "O"];

  const render = (gamePosition) => {
    const gameElement = document.getElementById("gameBoard");
    const children = gameElement.children;
    //Assigns the value of the game into html
    for (i = 0; i < 9; i++) {
      children[i].textContent = gamePosition[i];
      children[i].addEventListener("click", (e) => {
        console.log ("hit1");
        gameBoard.makeMove(e.target.dataset.square);
      });
    }
  };

  //public functions
  return { render };
})();

//const game = displayController.render();

const game = gameBoard.newGame();
