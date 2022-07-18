const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

const activeIntBtnState = () => {
  btnStop.disabled = false;
  btnStart.disabled = true;
};

const defaultBtnState = () => {
  btnStop.disabled = true;
  btnStart.disabled = false;
};

const onBtnStart = () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  activeIntBtnState();
};

const onBtnStop = () => {
  clearInterval(timerId);
  defaultBtnState();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);
