const Player = (name, mark) => {
  return { name, mark };
};

const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    let prevBoard = document.getElementById("gameBoard");
    if (prevBoard !== null) {
      prevBoard.remove();
    }
    const boardContainer = document.createElement("div");
    boardContainer.setAttribute("id", "gameBoard");
    gameBoard.forEach((square, index) => {
      let newBox = document.createElement("div");
      newBox.classList.add("box");
      newBox.dataset.index = index;
      newBox.addEventListener("click", Game.handleClick);
      boardContainer.addEventListener("keydown", (e) => {
        if (e.code == Space) {
          Game.handleClick(e);
        }
      });
      newBox.tabIndex = "0";
      boardContainer.appendChild(newBox);
    });
    document.body.insertBefore(boardContainer, restartBtn);
  };
  const update = (index, mark) => {
    gameBoard[index] = mark;
  };
  const getGameBoard = () => gameBoard;
  return { render, update, getGameBoard };
})();
const Game = (() => {
  let players = [];
  let currentPlayer;
  let isAi;
  let gameOver;
  const start = () => {
    isAi = document.querySelector("#isAi").checked;
    let playerOne = document.querySelector("#playerOne").value;
    let playerTwo = isAi ? "AI" : document.querySelector("#playerTwo").value;
    form.style.display = "none";
    if (players.length === 0) {
      players = [Player(playerOne, "X"), Player(playerTwo, "O")];
    }
    currentPlayer = 0;
    gameOver = false;
    GameBoard.render();
    displayController.displayTurns(players[currentPlayer].name);
  };
  const handleClick = (currentBox) => {
    if (gameOver) return;
    let board = GameBoard.getGameBoard();
    let boxIndex = currentBox.target.dataset.index;
    let currentMark = players[currentPlayer].mark;
    if (board[boxIndex] !== "") return;
    currentBox.target.innerText = currentMark;
    GameBoard.update(boxIndex, currentMark);
    displayController.displayTurns(players[currentPlayer].name);
    if (checkForWin(board, currentMark)) {
      gameOver = true;
      displayController.displayWinner("won", players[currentPlayer].name);
    } else if (checkForTie(board)) {
      gameOver = true;
      displayController.displayWinner("tie", players[currentPlayer].name);
    }
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  };
  const checkForWin = (board, mark) => {
    const WinningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return WinningCombinations.some((combination) => {
      return combination.every((index) => {
        return board[index] == mark;
      });
    });
  };
  const checkForTie = (board) => {
    return board.every((box) => box !== "");
  };
  const form = document.getElementById("choosePlayers");
  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", start);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    start();
  });
  return { start, handleClick };
})();

const displayController = (() => {
  const statusDisplay = document.querySelector(".status");
  const displayTurns = (currentPlayer) => {
    statusDisplay.innerText = `${currentPlayer}'s Turn`;
  };
  const displayWinner = (result, currentPlayer) => {
    if (result === "tie") {
      statusDisplay.innerText = "It's a tie";
    } else {
      statusDisplay.innerText = `${currentPlayer} won`;
    }
  };
  return { displayWinner, displayTurns };
})();
