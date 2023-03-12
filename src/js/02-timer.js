import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertMs, addLeadingZero } from "./convert-ms.mjs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TIMER_STEP = 1000;
let timerId = null;
let timerStartDate = 0;

const inputRef = document.querySelector("input#datetime-picker");
const startButtonRef = document.querySelector("button[data-start]");
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    if (timerId) {
      clearInterval(timerId);
      setupTimerValue(timerRefs);
    }
  },
  onClose([selectedDates]) {
    const start = Date.now();
    const end = selectedDates.getTime();
    if (end < start) {
      Notify.warning("Please choose a date in the future");
    } else {
      startButtonRef.removeAttribute("disabled");
      timerStartDate = end - start;
    }
  },
};

// create flatpickr instance with options and attach it to the input field
flatpickr(inputRef, flatpickrOptions);

startButtonRef.addEventListener("click", () => {
  let currentTimerValue = timerStartDate;

  startButtonRef.setAttribute("disabled", "disabled");

  timerId = setInterval(() => {
    currentTimerValue -= TIMER_STEP;

    const { days, hours, minutes, seconds } = convertMs(currentTimerValue);

    setupTimerValue(timerRefs, days, hours, minutes, seconds);

    if (currentTimerValue < 1000) {
      clearInterval(timerId);
      Notify.info("Timer finished");
    }
  }, TIMER_STEP);
});

function setupTimerValue(refs, d = '00', h = '00', m = '00', s = '00', formatFn = addLeadingZero) {

  refs.days.textContent = formatFn(d);
  refs.hours.textContent = formatFn(h);
  refs.minutes.textContent = formatFn(m);
  refs.seconds.textContent = formatFn(s);
}