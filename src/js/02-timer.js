import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertMs, addLeadingZero } from "./convert-ms.mjs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TIMER_STEP = 1000;
//restart timer after click on input
let timerStartDate = 0;

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
  onClose(selectedDates) {
    const start = Date.now();
    const end = selectedDates[0].getTime();
    if (end < start) {
      Notify.warning("Please choose a date in the future");
    } else {
      startButtonRef.removeAttribute("disabled");
      timerStartDate = end - start;
    }
  },
};

// create flatpickr instance with options and attach it to the input field

flatpickr("input#datetime-picker", flatpickrOptions);

startButtonRef.addEventListener("click", () => {
  console.log("Timer started");

  let currentTimerValue = timerStartDate;

  const timerId = setInterval(() => {
    currentTimerValue -= TIMER_STEP;

    console.log(convertMs(currentTimerValue));

    timerRefs.days.textContent = (convertMs(currentTimerValue).days < 10) ? addLeadingZero(convertMs(currentTimerValue).days) : convertMs(currentTimerValue).days;
    timerRefs.hours.textContent = addLeadingZero(convertMs(currentTimerValue).hours);
    timerRefs.minutes.textContent = addLeadingZero(convertMs(currentTimerValue).minutes);
    timerRefs.seconds.textContent = addLeadingZero(convertMs(currentTimerValue).seconds);

    if (currentTimerValue < 1000) {
      clearInterval(timerId);

      Notify.info("Timer finished");
    }

  }, TIMER_STEP);
});