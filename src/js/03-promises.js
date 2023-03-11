import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}

function notifySuccess({ position, delay }) {
  console.log("notifySuccess");
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function notifyRejected({ position, delay }) {
  console.log("notifyRejected");
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

const formRef = document.querySelector('.form');
const submitRef = document.querySelector('button[type="submit"]');


submitRef.addEventListener('click', onClickSubmitButton);

function onClickSubmitButton(e) {
  e.preventDefault();

  const delayValue = Number(formRef.delay.value);
  const stepValue = Number(formRef.step.value);
  const amountValue = Number(formRef.amount.value);
  let currentDelay = delayValue;

  console.log(delayValue, stepValue, amountValue);

  for (let i = 1; i <= amountValue; i++) {
    console.log(i, currentDelay);
    createPromise(i, currentDelay).then(notifySuccess).catch(notifyRejected);
    currentDelay += stepValue;
  }
}