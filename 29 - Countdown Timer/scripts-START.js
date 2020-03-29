let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

buttons.forEach(button => {
  button.addEventListener('click', startTimer);
});

function timer(seconds) {
  clearInterval(countdown); 

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);


  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.ceil(seconds % 60);
  const display = 
    `${ minutes }:${ remainderSeconds < 10 ? '0' : '' }${ remainderSeconds }`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour
  const minutes = end.getMinutes();
  endTime.textContent 
    = `Be Back At ${ adjustedHour }:${ minutes < 10 ? '0' : '' }${ minutes }`
}

function startTimer(e) {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// 可以透過 name property 選取表單 dom
document.customForm.addEventListener('submit', getTimeInput);
function getTimeInput(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
}