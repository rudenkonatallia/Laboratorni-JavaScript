const boardSize = 5;
const board = document.getElementById("game-board");
const moveDisplay = document.getElementById("move-display");
const timerDisplay = document.getElementById("timer-display");
const targetDisplay = document.getElementById("target-display");
const winMessage = document.getElementById("win-message");

const newGameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");

let cells = [];
let clickTracker;
let moveCount = 0;
let timerStarted = false;
let seconds = 0;
let timerInterval = null;

let puzzles = [];
let currentPuzzle = null;
let lastPuzzleId = null;

newGameBtn.addEventListener("click", startNewGame);
restartBtn.addEventListener("click", restartGame);

function updateMoveDisplay() {
  moveDisplay.textContent = `Ходи: ${moveCount}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Час: ${seconds} сек`;
}

function updateTargetDisplay() {
  targetDisplay.textContent = `Оптимальний розв’язок: ${currentPuzzle.target} ходів`;
}

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }
}

function resetGameState() {
  clearInterval(timerInterval);
  seconds = 0;
  timerStarted = false;
  moveCount = 0;
  winMessage.textContent = "";
  updateTimerDisplay();
  updateMoveDisplay();
}

function createBoard(layout) {
  board.innerHTML = "";
  cells = [];
  clickTracker = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

  for (let row = 0; row < boardSize; row++) {
    cells[row] = [];
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (layout[row][col] === 0) cell.classList.add("off");
      board.appendChild(cell);
      cells[row][col] = cell;

      cell.addEventListener("click", () => {
        startTimer();
        handleMove(row, col);
        checkWin();
      });
    }
  }

  updateTargetDisplay();
}

function handleMove(row, col) {
  clickTracker[row][col]++;
  toggleLights(row, col);

  if (clickTracker[row][col] % 2 === 1) {
    moveCount++;
  } else {
    moveCount--;
  }

  updateMoveDisplay();
}

function toggleLights(row, col) {
  toggleCell(row, col);
  toggleCell(row - 1, col);
  toggleCell(row + 1, col);
  toggleCell(row, col - 1);
  toggleCell(row, col + 1);
}

function toggleCell(row, col) {
  if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
    cells[row][col].classList.toggle("off");
  }
}

function checkWin() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (!cells[row][col].classList.contains("off")) return;
    }
  }
  clearInterval(timerInterval);
  winMessage.textContent = "Ви виграли!";
}

function loadPuzzles() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          puzzles = JSON.parse(xhr.responseText); 
          startNewGame();
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error(xhr.status);
      }
    }
  };

  xhr.open("GET", "puzzles.json", true);
  xhr.send();
}


function startNewGame() {
  resetGameState();
  let available = puzzles.filter(p => p.id !== lastPuzzleId);
  currentPuzzle = available[Math.floor(Math.random() * available.length)];
  lastPuzzleId = currentPuzzle.id;
  createBoard(currentPuzzle.layout);
}

function restartGame() {
  resetGameState();
  createBoard(currentPuzzle.layout);
}

loadPuzzles();
