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
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function notifyRejected({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();

  const delayValue = Number(formRef.delay.value);
  const stepValue = Number(formRef.step.value);
  const amountValue = Number(formRef.amount.value);
  let currentDelay = delayValue;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, currentDelay).then(notifySuccess).catch(notifyRejected);
    currentDelay += stepValue;
  }
}