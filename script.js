
let timers = [];

function startTimer(duration, display, timerId) {
  let timer = duration, hours, minutes, seconds;

  const intervalId = setInterval(() => {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    
    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    
    if (--timer < 0) {
      clearInterval(intervalId);
      display.textContent = "Time's Up!";
      display.classList.add('timer-ended');
      const audio = new Audio('alert.mp3');
      audio.play();
    }
  }, 1000);

  return intervalId;
}

function addTimer(hours, minutes, seconds) {
  const timerId = `timer-${timers.length}`;
  const timerDuration = (hours * 3600) + (minutes * 60) + seconds;

  const timerElement = document.createElement('div');
  timerElement.className = 'timer';
  timerElement.id = timerId;

  const timerDisplay = document.createElement('span');
  timerDisplay.className = 'timer-display';
  timerElement.appendChild(timerDisplay);

  const stopButton = document.createElement('button');
  stopButton.textContent = 'Delete';
  stopButton.className = 'delete-btn';
  stopButton.onclick = () => {
    clearInterval(timer.intervalId);
    timerElement.remove();
  };
  timerElement.appendChild(stopButton);

  document.getElementById('active-timers').appendChild(timerElement);

 
  const timer = {
    duration: timerDuration,
    intervalId: startTimer(timerDuration, timerDisplay, timerId)
  };

  timers.push(timer);
}


document.getElementById('set-timer-btn').addEventListener('click', () => {
 
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  
  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please set a valid timer duration");
    return;
  }


  addTimer(hours, minutes, seconds);
});
