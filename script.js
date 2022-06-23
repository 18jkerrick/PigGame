'use strict';

// selecting elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore = 0;
let current1 = document.querySelector('#current--0');
let current2 = document.querySelector('#current--1');
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

// starting conditions
score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden');

// Rolling of dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate a random dice roll
    const roll = Math.trunc(Math.random() * 6) + 1;

    // display dice
    dice.src = `dice-${roll}.png`;
    dice.classList.remove('hidden');

    // check for 1, if true switch to next player, else add value to player score
    if (roll === 1) {
      document.querySelector(`#score--${activePlayer}`).textContent = 0;
      currentScore = 0;
      scores[activePlayer] = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
    } else {
      document.querySelector(`#score--${activePlayer}`).textContent = roll;
      scores[activePlayer] += roll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        scores[activePlayer];
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active');
      document.querySelector(`#name--${activePlayer}`).textContent =
        '🎊 WINNER 🎊';
      document.querySelector(`body`).classList.add('other--background');
    }

    // add current score to active player
    scores[activePlayer] += currentScore;
    document.querySelector(`#current--${activePlayer}`).textContent =
      scores[activePlayer];
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
    document.querySelector(`#score--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    // if player score > 100, finish the game, else switch player
  }
});

btnNew.addEventListener('click', function () {
  dice.classList.add('hidden');
  playing = true;
  player1.classList.remove('player--active');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  document.querySelector(`#name--0`).textContent = 'Player 1';
  document.querySelector(`#name--1`).textContent = 'Player 2';

  scores[0] = 0;
  scores[1] = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  activePlayer = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  currentScore = 0;
  document.querySelector(`body`).classList.remove('other--background');
});
