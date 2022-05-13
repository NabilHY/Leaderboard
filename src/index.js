import './style.css';
import leaderboard from './addPlayer.js';

// DOM Selectors
const refreshBtn = document.getElementById('refresh');
const leaderBoard = document.querySelector('ul');
const submit = document.getElementById('submit');
const score = document.getElementById('score');
const player = document.getElementById('player');

// Click event to post to api
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const scoreType = parseInt(score.value, 10);
  if (scoreType && player.value !== '' && scoreType !== '') {
    await leaderboard.createScore(player.value, score.value);
    player.value = '';
    score.value = '';
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
