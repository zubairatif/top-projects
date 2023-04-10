const Player = (name, mark, score = 0) => {
  return { name, mark, score };
};

const GameBoard = (() => {
  let boxes;
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
        if (e.code === "Space") {
          Game.handleClick(e);
        }
      });
      newBox.tabIndex = "0";
      boardContainer.appendChild(newBox);
    });
    document.body.insertBefore(boardContainer, restartBtn);
  };
  const update = (index, mark) => {
    boxes = document.querySelectorAll(".box");
    if (boxes.length > 0) boxes[index].innerText = mark;
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
    for (let i = 0; i < 9; i++) GameBoard.update(i, "");
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
    // currentBox.target.innerText = currentMark;
    GameBoard.update(boxIndex, currentMark);
    displayController.displayTurns(players[currentPlayer].name);
    if (checkForWin(currentMark)) {
      players[currentPlayer].score++;
      gameOver = true;
      displayController.displayWinner("won", players[currentPlayer].name);
    } else if (checkForTie()) {
      gameOver = true;
      displayController.displayWinner("tie", players[currentPlayer].name);
    }
    if (isAi) {
      easyMove(board, players[1].mark);
      if (checkForWin("O")) {
        players[1].score++;
        gameOver = true;
        displayController.displayWinner("won", players[1].name);
      } else if (checkForTie()) {
        gameOver = true;
        displayController.displayWinner("tie", players[1].name);
      }
    } else currentPlayer = currentPlayer === 0 ? 1 : 0;
    displayController.updateScore(players);
  };
  const easyMove = (board, mark) => {
    if (!board.some((item) => item === "")) return;
    let emptyBoxes = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") emptyBoxes.push(i);
    }
    let randomBox = Math.floor(Math.random() * emptyBoxes.length);
    GameBoard.update(emptyBoxes[randomBox], mark);
  };
  // const hardMove = (board) => {};
  const checkForWin = (mark) => {
    let board = GameBoard.getGameBoard();
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
    console.log("board for win: ", board);
    return WinningCombinations.some((combination) => {
      return combination.every((index) => {
        return board[index] == mark;
      });
    });
  };
  const checkForTie = () => {
    let board = GameBoard.getGameBoard();
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
  const scoreOneDisplay = document.querySelector(".score_one");
  const scoreTwoDisplay = document.querySelector(".score_two");
  const updateScore = (players) => {
    scoreOneDisplay.innerText = `${players[0].name}: ${players[0].score}`;
    scoreTwoDisplay.innerText = `${players[1].name}: ${players[1].score}`;
  };
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
  return { displayWinner, displayTurns, updateScore };
})();
