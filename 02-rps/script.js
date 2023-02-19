const pScore = document.getElementById("pScore");
const cScore = document.getElementById("cScore");
const roundResultDisplay = document.getElementById("roundResultDisplay");
const totalGamesDisplay = document.getElementById("totalGames");
const gamesWonDisplay = document.getElementById("gamesWon");
const buttons = document.querySelectorAll(".options");
const choices = ["rock", "paper", "scissor"];
let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;
let totalGames = 0;
let gamesWon = 0;
let gameResult;
function game(playerSelection) {
  let computerSelection = choices[Math.floor(Math.random() * choices.length)];
  if (playerSelection.toLowerCase() === computerSelection) {
    roundResultDisplay.innerText = "It's a Tie";
  } else if (
    (playerSelection.toLowerCase() === "rock" &&
      computerSelection === "scissor") ||
    (playerSelection.toLowerCase() === "paper" &&
      computerSelection === "rock") ||
    (playerSelection.toLowerCase() === "scissor" &&
      computerSelection === "paper")
  ) {
    roundResultDisplay.innerText = "You Won!";
    playerScore++;
    pScore.innerText = String(playerScore);
  } else {
    roundResultDisplay.innerText = "You Lost";
    computerScore++;
    cScore.innerText = String(computerScore);
  }
  if (computerScore >= 5 || playerScore >= 5) {
    let displayResult = document.createElement("p");
    if (computerScore > playerScore) {
      displayResult.appendChild(document.createTextNode("You Lost the Game!"));
    } else {
      displayResult.appendChild(document.createTextNode("You Won the game!"));
      gamesWon++;
    }
    roundResultDisplay.remove();
    document.body.appendChild(displayResult);
    totalGames++;
    totalGamesDisplay.innerText = String(totalGames);
    gamesWonDisplay.innerText = String(gamesWon);
    computerScore = 0;
    playerScore = 0;
    return;
  }
}

// function game(playerChoice) {
// while (computerScore < 5 && playerScore < 5) {
//   result = playRound(playerChoice);
//   if (result === "win") {
//     playerScore++;
//     pScore.innerText = String(playerScore);
//   }
//   if (result === "lose") {
//     computerScore++;
//     cScore.innerText = String(computerScore);
//   }
// }

// }

buttons.forEach((item) => {
  item.addEventListener("click", (btn) => game(btn.target.dataset.weapon));
});
