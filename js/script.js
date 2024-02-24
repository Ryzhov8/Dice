//Selecting elements
const refs = {
  dice: document.querySelector(".dice"),
  btnsArr: document.querySelectorAll(".btn"),
  playersArr: document.querySelectorAll(".player"),
  activePlayer: document.querySelectorAll(".player--active"),
  restartBtn: document.querySelector(".btn--restart"),
  holdBtn: document.querySelector(".btn--hold"),
};

let currentScore;

refs.dice.addEventListener("click", throttle(rollDice, 500));
refs.holdBtn.addEventListener("click", saveScore);
refs.restartBtn.addEventListener("click", init);

init();

// Functionality of rolling dice
function rollDice() {
  //1. Getting random number between 1 and 6
  const number = Math.floor(Math.random() * 6 + 1);

  // 2. Showing the required face of the dice
  for (let i = 0; i <= 6; i++) {
    refs.dice.classList.remove(`show-${i}`);
    if (i === number) {
      refs.dice.classList.add(`show-${i}`);
    }
  }

  // 3. Check for rolled 1
  if (number === 1) {
    // Reset the current score value and switch the player
    currentScore = 0;
    updateCurrentScore();
    switchPlayer();
  } else {
    // Update the current score value
    currentScore += number;
    updateCurrentScore();
  }
}

// Functionality of adding the current score to the total score of the active player
function saveScore() {
  if (currentScore > 0) {
    const totalScoreEl = refs.activePlayer.querySelector(".total");
    const totalScore = Number(totalScoreEl.textContent) + currentScore;
    totalScoreEl.textContent = totalScore;
    currentScore = 0;
    updateCurrentScore();

    // Check if player's win  (score is >= 100)
    totalScore >= 100 ? win() : switchPlayer();
  }
}

// Functionality of updating the current score value of active player
function updateCurrentScore() {
  refs.activePlayer.querySelector(".score__number").textContent = currentScore;
}

// Functionality of switching active player
function switchPlayer() {
  refs.playersArr.forEach((e) => e.classList.toggle("player--active"));
  refs.activePlayer = document.querySelector(".player--active");
  // Turning the buttons to the second player (mobile version only)
  refs.btnsArr.forEach((e) => e.classList.toggle("btn--rotate"));
}

// Functionality of winning
function win() {
  refs.activePlayer.classList.add("player--win");
  refs.dice.classList.add("hide");
}

//Setting initial conditions
function init() {
  refs.playersArr.forEach((e, i) => {
    e.querySelector(".score__number").textContent = 0;
    e.querySelector(".total").textContent = 0;
    e.classList.remove("player--active", "player--win");
    if (i === 0) e.classList.add("player--active");
  });
  refs.activePlayer = document.querySelector(".player--active");
  refs.dice.classList.remove("hide");
  currentScore = 0;
}

// Starts the function no more often than the specified time
function throttle(f, t) {
  return function () {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall === undefined || this.lastCall - previousCall > t) {
      f();
    }
  };
}
