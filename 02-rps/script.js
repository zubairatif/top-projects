const pScore = document.getElementById("pScore");
const cScore = document.getElementById("cScore");
const choices = ["rock", "paper", "scissors"];
let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}
function getPlayerChoice() {
  while (0 == 0) {
    playerSelection = prompt("Choose: ").toLowerCase();
    if (
      playerSelection === "rock" ||
      playerSelection === "paper" ||
      playerSelection === "scissors"
    ) {
      break;
    }
  }
  return playerSelection;
}
function playRound(playerSelection, computerSelection) {
  if (playerSelection.toLowerCase() === computerSelection) {
    return "tie";
  } else if (
    (playerSelection.toLowerCase() === "rock" &&
      computerSelection === "scissors") ||
    (playerSelection.toLowerCase() === "paper" &&
      computerSelection === "rock") ||
    (playerSelection.toLowerCase() === "scissors" &&
      computerSelection === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    result = playRound(getPlayerChoice(), getComputerChoice());
    if (result === "win") {
      playerScore++;
      pScore.innerText = String(playerScore);
    }
    if (result === "lose") {
      computerScore++;
      cScore.innerText = String(computerScore);
    }
  }
}
