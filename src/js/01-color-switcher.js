function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const startButtonRef = document.querySelector('button[data-start]');
const stopButtonRef = document.querySelector('button[data-stop]');
let intervalId = 0;

startButtonRef.addEventListener('click', onClickStartButton);
stopButtonRef.addEventListener('click', onClickStopButton);

function onClickStartButton() {
  this.setAttribute('disabled', 'disabled');
  intervalId = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000);
}

function onClickStopButton() {
  clearInterval(intervalId);
  startButtonRef.removeAttribute('disabled');
}


