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
    round = 1;
    gameBoard = new Array(9).fill(null);
    displayController.render();
  };

  const makeMove = (gridIndex) => {
    if (!gameBoard[gridIndex] && !finished) {
      gameBoard[gridIndex] = player.getToken();
      //Check if there is a winner
      if (playerWins()) {
        finished = true;
      } else {
        //Check if the game is a draw

        if (round === 9) {
          player = null;
          finished = true;
        } else {
          playerTurn();
        }
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
  const getFinished = () => {
    return finished;
  };
  const getPlayer = () => {
    return player;
  };

  //Public functions
  return { newGame, makeMove, getBoard, getFinished, getPlayer };
})();

/*displayController Object:  Controls the flow of the game*/

const displayController = (() => {
  const gameElement = document.getElementById("gameBoard");
  const resetBtn = document.getElementById("resetGame");
  const children = gameElement.children;

  //Add event listeners on button clicks per square

  for (i = 0; i < 9; i++) {
    children[i].addEventListener("click", (e) => {
      gameBoard.makeMove(e.target.dataset.square);
    });
  }

  //Add event listener for the reset button

  resetBtn.addEventListener("click", (e) => {
    gameBoard.newGame();
  });

  const render = () => {
    const gameState = document.getElementById("gameState");
    const player = gameBoard.getPlayer();
    //updates the gameboard
    for (i = 0; i < 9; i++) {
      children[i].textContent = gameBoard.getBoard(i);
    }
    //updates the game status
    if (gameBoard.getFinished()) {
      if (player) {
        gameState.textContent = player.getName() + " has won!";
      } else {
        gameState.textContent = "The game has ended in a draw.";
      }
    } else {
      gameState.textContent = player.getName() + " turn to move";
    }
  };

  //public functions
  return { render };
})();

//const game = displayController.render();

const game = gameBoard.newGame();
