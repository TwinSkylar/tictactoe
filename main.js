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
  let gameBoard = {};
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
    finished = false;
    player = player1;
    gameBoard = new Array(9).fill(null);
    displayController.render();
  };

  const makeMove = (gridIndex) => {
    if (!gameBoard[gridIndex] && !finished) {
      gameBoard[gridIndex] = player.getToken();

      if (playerWins() || round === 9) {
        if (finished) {
          console.log(player.getName() + "wins");
        }
      } else {
        playerTurn();
        round++;
      }
    }
    displayController.render();
  };

  const getBoard = (i) => {
    return gameBoard[i];
  };

  const playerWins = () => {
    const winCombinations = [
      //rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (i = 0; i < winCombinations.length; i++) {
      if (
        gameBoard[winCombinations[i][0]] === gameBoard[winCombinations[i][1]] &&
        gameBoard[winCombinations[i][2]] === gameBoard[winCombinations[i][0]]
      ) {
        if (gameBoard[winCombinations[i][0]]) {
          finished = true;
          return true;
        }
      }
    }
    return false;
  };

  //Public functions
  return { newGame, makeMove, getBoard };
})();

/*displayController Object:  Controls the flow of the game*/

const displayController = (() => {
  const gameElement = document.getElementById("gameBoard");
  const resetBtn = document.getElementById("resetGame");
  const children = gameElement.children;
  //Add event listeners on button clicks per square
  console.log("initializing: " + gameBoard.getBoard());
  for (i = 0; i < 9; i++) {
    console.log("creating event listeners.  BAD!");
    children[i].addEventListener("click", (e) => {
      gameBoard.makeMove(e.target.dataset.square);
    });
  }

  //Add event listener for the reset button

  resetBtn.addEventListener("click", (e) => {
    gameBoard.newGame();
  });

  const render = () => {
    for (i = 0; i < 9; i++) {
      children[i].textContent = gameBoard.getBoard(i);
    }
  };
  //public functions
  return { render };
})();

//const game = displayController.render();

const game = gameBoard.newGame();
