'use strict';
// TO BE USED WHEN CREATING NEW GAME
// document.querySelector('.score').textContent = '';
// document.querySelector('.current-score').textContent = '';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const allScore = (document.querySelectorAll('.score').textContent = '0');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const allCurrentScore = (document.querySelectorAll( '.current-score').textContent = '');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnPlay = document.querySelector('.play');

// Start Game
btnPlay.addEventListener('click', function () {
  document.getElementById('game').style.display = 'block';
  document.getElementById('front-page').style.display = 'none';
});

// Display State
function EL(El) {
  El.classList.add('hidden');
}
function EL2(El2) {
  El2.classList.remove('hidden');
}

let scores, currentScore, activePlayer;

// Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  EL2(btnRoll);
  EL2(btnHold);

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random roll dice
  const dice = Math.trunc(Math.random() * 6 + 1);
  console.log(dice);

  // 2 Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check If 1 was rolled, perform necessary action
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

// When hold is clicked
btnHold.addEventListener('click', function () {
  // 1.Add curent score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    // finish game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    EL(diceEl);
    EL(btnRoll);
    EL(btnHold);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('.player--active');
    document.getElementById(`score--${activePlayer}`).textContent = 'WINS';
  } else {
    // 3. Switch player
    switchPlayer();
  }
});

// When New game is clicked
btnNew.addEventListener('click', init);
