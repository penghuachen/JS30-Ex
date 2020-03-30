const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(hole) {
  const index = Math.floor(Math.random() * holes.length);
  const holeDom = holes[index];
  if(holeDom == lastHole) {
    randomHole(holes);
  }
  lastHole =  holeDom;
  return holeDom;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 2000);
}

moles.forEach(mole => mole.addEventListener('click', bonk));
function bonk(e) {
  if(!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}