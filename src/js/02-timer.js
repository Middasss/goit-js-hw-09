import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;

const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
    } else {
      Notiflix.Notify.success('Date of your DEATH is chosen!');
      buttonEl.disabled = false;
    }
  },
});

const defaultBtnState = () => {
  buttonEl.disabled = true;
};
defaultBtnState();

const onBtnStart = () => {
  const currentDate = Number(fp.selectedDates[0]);
  // console.log(finalDate);

  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      currentDate - Date.now()
    );
    // console.log(days, hours, minutes, seconds);

    if (currentDate <= Date.now()) {
      clearInterval(timerId);
    }

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    buttonEl.disabled = true;
  }, 1000);
};

const addLeadingZero = value => {
  return String(value).padStart(2, 0);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

buttonEl.addEventListener('click', onBtnStart);
