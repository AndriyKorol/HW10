const timer = (function () {

  let countdown,
      timerDisplay,
      endTime,
      alarmSound,
      display = [],
      timeValue,
      stopTime = -1;

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
    clearInterval(timeValue);

    countdown = setInterval(() => {
      const secondsLeft = Math.round( (then - Date.now()) / 1000 );
      if (secondsLeft < 0) {
        clearInterval(countdown);
        alarmSound.play();
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
    timeValue = countdown;
    return this;
  }

  function displayTimeLeft(seconds) {

      const minutes = Math.floor(seconds / 60);
      const reminderSeconds = seconds % 60;
      const Hours = Math.floor(minutes / 60);
      const reminderminutes = minutes % 60;
      const reminderHours = Hours % 24;
      const days = Math.floor(Hours / 24);

      const display = `${days>0 ? days+':': ''}${reminderHours< 10 && reminderHours>0 ? '0' 
                                            : ''}${reminderHours>0 ? reminderHours+':'
                                            : '' }${reminderminutes< 10 ? '0' 
                                            : ''}${reminderminutes< 60 ? reminderminutes 
                                            : ''}:${reminderSeconds < 10 ? '0' 
                                            : ''}${reminderSeconds}`;
      timerDisplay.textContent = display;
      document.title = display;
  }

  function displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const endDate = end.toLocaleString();

      endTime.textContent = `Be back ${endDate}`;
  }

  function reset(e) {
      clearInterval(countdown);
      displayTimeLeft(0);
      timerDisplay.innerHTML = '';
      displayEndTime(0);
      endTime.innerHTML = '';
  }

  function stop(e) {      
//       if(stopTime === -1) {
//           start();
//       } else {
           clearInterval(countdown);
//           stopTime = -1;
          alarmSound.pause();
          alarmSound.currentTime = 0;
//      }
  }

  return {
      init,
      start,
      stop,
      reset
  }
})();

const buttons = document.querySelectorAll('[data-time]');
const actionBtn = document.querySelectorAll('[data-action]');

timer.init({
  timerDisplaySelector: '.display__time-left',
  endTimeSelector :'.display__end-time',
  alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
    const seconds = Number(this.dataset.time);
    timer.start(seconds);
}

function actions(e) {
    const action = this.dataset.action;
    if (action === 'stop'){
        return timer.stop();
    }
    return timer.reset();
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
actionBtn.forEach(btns => btns.addEventListener('click', actions));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = Number(this.minutes.value);
   if (mins !== null)timer.start(mins * 60);
    this.reset();
});

// 1. сделать метод stop который должен остановить и сбросить таймер.

// 2. возможность ввода минут в инпут и в зависимости от того сколько было введено минут нужно выводить в
// разных форматах, дд : чч : мм : сс, чч : мм : сс или мм : сс. В том числе дата когда закончит таймер должна быть
// полной день.месяц.год часы:минуты
// 3. вызов методов цепочкой

