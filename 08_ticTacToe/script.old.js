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
    document.querySelector;
    document.querySelector("main").insertBefore(boardContainer, restart_btn);
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
  let currentPlayer = 0;
  let isAi;
  let gameOver;
  let difficulty;
  let rounds = 0;
  const start = () => {
    rounds++;
    for (let i = 0; i < 9; i++) GameBoard.update(i, "");
    isAi = document.querySelector("#is_ai").checked;
    let playerOne = document.querySelector("#player_one").value;
    let playerTwo = isAi ? "AI" : document.querySelector("#player_two").value;
    difficulty = document.querySelector("#level_select").value;
    form.style.display = "none";
    if (players.length === 0) {
      players = [Player(playerOne, "X"), Player(playerTwo, "O")];
    }
    if (rounds > 1) {
      currentPlayer = currentPlayer === 0 ? 1 : currentPlayer;
    }
    console.log("current Player", currentPlayer);
    gameOver = false;
    GameBoard.render();
    displayController.displayTurns(players[currentPlayer].name);
    if (isAi && players[currentPlayer] === 1) {
      switch (difficulty) {
        case "1": {
          mediumMove(currentMark);
          break;
        }
        case "2": {
          hardMove(currentMark);
          break;
        }
        default:
          {
            easyMove(currentMark);
            break;
          }
          currentPlayer = currentPlayer === 0 ? 1 : 0;
      }
    }
  };
  const handleClick = (currentBox) => {
    let otherPlayer = currentPlayer === 0 ? 1 : 0;
    if (gameOver) return;
    let board = GameBoard.getGameBoard();
    let boxIndex = currentBox.target.dataset.index;
    let currentMark = players[currentPlayer].mark;
    let currentName = players[currentPlayer].name;
    let otherName = players[otherPlayer].name;

    if (board[boxIndex] !== "") return;
    GameBoard.update(boxIndex, currentMark);
    displayController.displayTurns(otherName);
    if (checkForWin(currentMark)) {
      players[currentPlayer].score++;
      gameOver = true;
      displayController.displayWinner("won", currentName);
    } else if (checkForTie()) {
      gameOver = true;
      displayController.displayWinner("tie", currentName);
    }
    if (isAi && board.some((item) => item === "")) {
      switch (difficulty) {
        case "1": {
          mediumMove(currentMark);
          break;
        }
        case "2": {
          hardMove(currentMark);
          break;
        }
        default: {
          easyMove(currentMark);
          break;
        }
      }
      if (checkForWin(currentMark)) {
        players[1].score++;
        gameOver = true;
        displayController.displayWinner("won", otherName);
      } else if (checkForTie()) {
        gameOver = true;
        displayController.displayWinner("tie", otherName);
      }
    } else currentPlayer = currentPlayer === 0 ? 1 : 0;
    displayController.updateScore(players);
  };
  const getEmptyBoxes = () => {
    let board = GameBoard.getGameBoard();
    let emptyBoxes = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") emptyBoxes.push(i);
    }
    return emptyBoxes;
  };
  const easyMove = (mark) => {
    let boxChosen = Math.floor(Math.random() * getEmptyBoxes().length);
    GameBoard.update(getEmptyBoxes()[boxChosen], mark);
  };
  const mediumMove = (mark) => {
    let boxChosen;
    if (4 in getEmptyBoxes()) {
      GameBoard.update(4, mark);
    } else {
      boxChosen = Math.floor(Math.random() * getEmptyBoxes().length);
      GameBoard.update(getEmptyBoxes()[boxChosen], mark);
    }
  };
  const hardMove = (mark) => {
    console.log("Hard Move", difficulty);
    let boxChosen = Math.floor(Math.random() * getEmptyBoxes().length);
    GameBoard.update(getEmptyBoxes()[boxChosen], mark);
  };
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
  const form = document.getElementById("choose_players");
  const restartBtn = document.getElementById("restart_btn");
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
