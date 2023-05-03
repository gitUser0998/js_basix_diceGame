'use strict';



const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let score0 = document.querySelector('#score--0');
let score1 = document.getElementById('score--1');



const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');




let scores, currentScore, activePlayer, playing;


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// rollding dice function
btnRoll.addEventListener('click', function () {
    if (playing) {
        //generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Swith to the next player
            switchPlayer();

        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch player
            switchPlayer();
        }
    }

});

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
}
init();

btnNew.addEventListener('click', init);



