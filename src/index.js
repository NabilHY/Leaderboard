import './style.css';
import leaderboard from './addPlayer.js';

// DOM Selectors
const refreshBtn = document.getElementById('refresh');
const leaderBoard = document.querySelector('ul');
const submit = document.getElementById('submit');
const score = document.getElementById('score');
const player = document.getElementById('player');

window.addEventListener('DOMContentLoaded', async () => {
  const scores = await leaderboard.getScores();
  const res = scores.result;
  leaderBoard.innerHTML = '';
  for (let i = 0; i < res.length; i += 1) {
    leaderBoard.innerHTML += `
        <li>${res[i].user}: ${res[i].score}</li>
        `;
  }
});

// Click event to post to api
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const message = document.querySelector('.message');
  const scoreType = parseInt(score.value, 10);
  if (scoreType && player.value !== '' && scoreType !== '') {
    await leaderboard.createScore(player.value, score.value);
    message.innerText = 'Refresh to see how deep the rabbit hole goes ';
    setTimeout(() => {
      message.innerText = '';
    }, 3000);
    player.value = '';
    score.value = '';
  } else {
    message.innerText = 'Please add valid values';
    setTimeout(() => {
      message.innerText = '';
    }, 3000);
  }
});

// click event to get from api
refreshBtn.addEventListener('click', async () => {
  const scores = await leaderboard.getScores();
  const res = scores.result;
  leaderBoard.innerHTML = '';
  for (let i = 0; i < res.length; i += 1) {
    leaderBoard.innerHTML += `
        <li>${res[i].user}: ${res[i].score}</li>
        `;
  }
});
