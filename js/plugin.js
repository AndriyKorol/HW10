const timer = (function () {

  let countdown,
      timerDisplay,
      endTime,
      alarmSound;

  // Инициализация модуля
  function init(settings) {
    timerDisplay = document.querySelector(settings.timerDisplaySelector);
    endTime = document.querySelector(settings.endTimeSelector);
    alarmSound = new Audio(settings.alarmSound);
  }

  function start(seconds) {
    if(typeof seconds !== "number") return new Error('Please provide seconds!');

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
      const secondsLeft = Math.round( (then - Date.now()) / 1000 );
      if (secondsLeft < 0) {
        clearInterval(countdown);
        alarmSound.play();
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;

    const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  function reset() {
      clearInterval(countdown);
  }

  function stop() {
      alarmSound.pause();
      alarmSound.currentTime = 0;
  }

  return {
    init,
    start,
    stop
  }
})();

const buttons = document.querySelectorAll('[data-time]');
const actionButtons = document.querySelectorAll('[data-action-btn]');
const inputField = document.querySelector('input');

timer.init({
  timerDisplaySelector: '.display__time-left',
  endTimeSelector :'.display__end-time',
  alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
  const seconds = Number(this.dataset.time);
  const inputSeconds = document.querySelector('input').value;
  timer.start(seconds);
  console.log(inputSeconds);
}
function action(e) {
    const menuAction = this.dataset.actionBtn;
    timer.stop(menuAction);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
actionButtons.forEach(btn => btn.addEventListener('click', action));

// 1. сделать метод stop который должен остановить и сбросить таймер.

// 2. возможность ввода минут в инпут и в зависимости от того сколько было введено минут нужно выводить в
// разных форматах, дд : чч : мм : сс, чч : мм : сс или мм : сс. В том числе дата когда закончит таймер должна быть
// полной день.месяц.год часы:минуты
// 3. вызов методов цепочкой









//-------------------------------------------------------------------------

// const timerBlock = document.querySelector('.timer');
// const timerControls = document.querySelector('.timer__controls');
// const timerBtn = document.querySelector('.timer__button');
//
// // Погружение
// timerBlock.addEventListener('click', function (e) {
//   console.log(this);
// }, true);
//
// timerControls.addEventListener('click', function (e) {
//   console.log(this);
// }, true);
//
// timerBtn.addEventListener('click', function (e) {
//   console.log(this);
// }, true);
//
// // Всплытие
// timerBlock.addEventListener('click', function (e) {
//   console.log(this);
// });
//
// timerControls.addEventListener('click', function (e) {
//   console.log(this);
// });
//
// timerBtn.addEventListener('click', function (e) {
//   console.log(this);
// });
















