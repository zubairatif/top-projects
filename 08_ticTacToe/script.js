// Factory Function for creating players
const Player = (name, mark, score = 0) => {
  return { name, mark, score };
};
// Gameboard Module stores the state of the gameboard
const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  //Funciton for rendering HTML part of the frontend board
  const render = () => {
    //Removes previous board when game restarts
    let prevBoard = document.getElementById("gameBoard");
    if (prevBoard !== null) {
      prevBoard.remove();
    }
    // Creating HTML
    const boardContainer = document.createElement("div");
    boardContainer.setAttribute("id", "gameBoard");
    gameBoard.forEach((square, index) => {
      let newBox = document.createElement("div");
      newBox.classList.add("box");
      newBox.dataset.index = index;
      newBox.addEventListener("click", Game.handleClick);
      newBox.tabIndex = "0";
      boardContainer.appendChild(newBox);
    });
    document.querySelector("main").insertBefore(boardContainer, restart_btn);
  };
  //Function for updating the gamebboard in the logic as well as on the frontend
  const update = (index, mark) => {
    let boxes = document.querySelectorAll(".box");
    if (boxes.length > 0) boxes[index].innerText = mark;
    gameBoard[index] = mark;
  };
  //Used by other IIFEs to get access to the current state of the gameboard
  const getGameBoard = () => gameBoard;
  return { render, update, getGameBoard };
})();
//Game Logic
const Game = (() => {
  let players = [];
  let currentPlayer = 0;
  let gameOver;
  const start = () => {
    console.log("currentPlayer: ", currentPlayer);
    gameOver = false;
    for (let i = 0; i < 9; i++) GameBoard.update(i, "");
    isAi = document.querySelector("#is_ai").checked;
    let playerOne = document.querySelector("#player_one").value;
    let playerTwo = isAi ? "AI" : document.querySelector("#player_two").value;
    // difficulty = document.querySelector("#level_select").value;
    form.style.display = "none";
    // Only generating new players if there are none
    if (players.length === 0) {
      players = [Player(playerOne, "X"), Player(playerTwo, "O")];
    }
    GameBoard.render();
    displayController.displayTurn(players[currentPlayer].name);
  };
  const handleClick = (currentBox) => {
    let board = GameBoard.getGameBoard();
    let boxIndex = currentBox.target.dataset.index;

    if (gameOver || board[boxIndex] !== "") return;

    let currentMark = players[currentPlayer].mark;
    let currentName = players[currentPlayer].name;
    let otherPlayer = currentPlayer === 0 ? 1 : 0;
    let otherName = players[otherPlayer].name;

    GameBoard.update(boxIndex, currentMark);

    displayController.displayTurn(otherName);

    if (checkForTie()) {
      gameOver = true;
      displayController.displayWinner("tie", currentName);
    }
    if (checkForWin(currentMark)) {
      players[currentPlayer].score++;
      gameOver = true;
      displayController.displayWinner("won", currentName);
    }
    // Also Switches the PLayer who goes first in the next round
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    displayController.updateScore(players);
  };
  // Get a list of the indexes which are empty for the AI
  const getEmptyBoxes = () => {
    let board = GameBoard.getGameBoard();
    let emptyBoxes = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") emptyBoxes.push(i);
    }
    return emptyBoxes;
  };
  // Check if the current player has won
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
  // Check if the game is a draw
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
// Updates status on the frontend
const displayController = (() => {
  const statusDisplay = document.querySelector(".status");
  const scoreOneDisplay = document.querySelector(".score_one");
  const scoreTwoDisplay = document.querySelector(".score_two");
  const updateScore = (players) => {
    scoreOneDisplay.innerText = `${players[0].name}: ${players[0].score}`;
    scoreTwoDisplay.innerText = `${players[1].name}: ${players[1].score}`;
  };
  const displayTurn = (currentPlayer) => {
    statusDisplay.innerText = `${currentPlayer}'s Turn`;
  };
  const displayWinner = (result, currentPlayer) => {
    if (result === "tie") {
      statusDisplay.innerText = "It's a tie";
    } else {
      statusDisplay.innerText = `${currentPlayer} won`;
    }
  };
  return { displayWinner, displayTurn, updateScore };
})();
