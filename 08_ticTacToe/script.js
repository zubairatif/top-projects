// Factory Function for creating players
const Player = (name, mark, ai, points = 0) => {
  return { name, mark, points, ai };
};
// Gameboard Module stores the state of the gameboard
const GameBoard = (() => {
  let boxes;
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
    boxes = document.querySelectorAll(".box");
    if (boxes.length > 0) {
      boxes[index].innerText = mark;
      gameBoard[index] = mark;
    }
  };
  //Used by other IIFEs to get access to the current state of the gameboard
  const getGameBoard = () => gameBoard;
  return { render, update, getGameBoard };
})();
//Game Logic
const Game = (() => {
  let round = 0;
  let players = [];
  let currentPlayer = 0;
  let gameOver;
  let difficulty;
  const start = () => {
    round++;
    gameOver = false;
    // clearing the gameBoard array
    for (let i = 0; i < 9; i++) GameBoard.update(i, "");

    let playerOne = document.querySelector("#player_one").value;

    isAi = document.querySelector("#is_ai").checked;
    let playerTwo = isAi ? "AI" : document.querySelector("#player_two").value;

    difficulty = Number(document.querySelector("#level_select").value);
    // removing the form from display
    form.style.display = "none";
    // Only generating new players if there are none
    if (players.length === 0) {
      players = [Player(playerOne, "X", false), Player(playerTwo, "O", isAi)];
    }
    GameBoard.render();
    displayController.displayTurn(players[currentPlayer].name);
    if (round % 2 == 0) currentPlayer = currentPlayer === 0 ? 1 : 0;
    if (isAi && players[currentPlayer].ai) {
      aiTurn(players[currentPlayer]);
    }
  };
  const getEmptyBoxes = (board) => {
    let emptyBoxes = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") emptyBoxes.push(i);
    }
    return emptyBoxes;
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

    if (!isAi) displayController.displayTurn(otherName);

    if (checkForWin(board, currentMark)) {
      players[currentPlayer].points++;
      gameOver = true;
      displayController.displayWinner("won", currentName);
    } else if (checkForTie(GameBoard.getGameBoard())) {
      gameOver = true;
      displayController.displayWinner("tie", currentName);
    }
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    if (players[currentPlayer].ai === true && gameOver === false)
      aiTurn(players[currentPlayer]);
    displayController.updatepoints(players);
  };
  function aiTurn(player) {
    let aiChoice = !difficulty
      ? easy()
      : findBestMove(GameBoard.getGameBoard());
    GameBoard.update(aiChoice, player.mark);
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    if (checkForWin(GameBoard.getGameBoard(), player.mark)) {
      player.points++;
      gameOver = true;
      displayController.displayWinner("won", player.name);
    } else if (checkForTie(GameBoard.getGameBoard())) {
      gameOver = true;
      displayController.displayWinner("tie", player.name);
    }
  }

  // Check if the current player has won
  const checkForWin = (board, mark, check = false) => {
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
    if (!check) {
      let winningIndexes = 0;
      let winResult = WinningCombinations.some((combination) => {
        winningIndexes = combination;
        return combination.every((index) => {
          return board[index] == mark;
        });
      });
      if (winResult) displayController.styleWinner(winningIndexes);
    }
    return WinningCombinations.some((combination) => {
      return combination.every((index) => {
        return board[index] == mark;
      });
    });
  };
  // Check if the game is a draw
  const checkForTie = (board) => {
    return board.every((box) => box !== "");
  };

  // Generates AI moves
  const easy = () => {
    let emptyBoxes = getEmptyBoxes(GameBoard.getGameBoard());
    let boxChosen = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[boxChosen];
  };
  function minimax(board, depth, isMaxPlayer, alpha, beta) {
    const boardCacheKey = getBoardCacheKey(board);
    if (checkForWin(board, players[0].mark, true)) {
      return -10 - depth;
    } else if (checkForWin(board, players[1].mark, true)) {
      return 10 - depth;
    } else if (checkForTie(board)) {
      return 0;
    }
    if (isMaxPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "O";
          const score = minimax(board, depth + 1, false, alpha, beta);
          board[i] = "";
          bestScore = Math.max(bestScore, score);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "X";
          const score = minimax(board, depth + 1, true, alpha, beta);
          board[i] = "";
          bestScore = Math.min(bestScore, score);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return bestScore;
    }
  }
  function findBestMove(board) {
    if (
      board[4] === "" &&
      getEmptyBoxes(GameBoard.getGameBoard()).length === 8
    ) {
      return 4;
    } else if (getEmptyBoxes(GameBoard.getGameBoard()).length === 9) {
      return 2;
    } else {
      let bestScore = -Infinity;
      let bestMove = -1;
      let alpha = -Infinity;
      let beta = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = players[1].mark;
          let score = minimax(board, 0, false, alpha, beta);
          board[i] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      return bestMove;
    }
  }

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
  let boxes;
  const statusDisplay = document.querySelector(".status");
  const pointsOneDisplay = document.querySelector(".points_one");
  const pointsTwoDisplay = document.querySelector(".points_two");
  const updatepoints = (players) => {
    pointsOneDisplay.innerText = `${players[0].name}: ${players[0].points}`;
    pointsTwoDisplay.innerText = `${players[1].name}: ${players[1].points}`;
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
  const styleWinner = (indexes) => {
    boxes = document.querySelectorAll(".box");
    indexes.forEach((index) => {
      boxes[index].classList.add("win");
    });
  };
  return { displayWinner, displayTurn, updatepoints, styleWinner };
})();
