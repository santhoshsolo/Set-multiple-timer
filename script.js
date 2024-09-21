// Initialize an array to store active timers
let timers = [];

function startTimer(duration, display, timerId) {
  let timer = duration, hours, minutes, seconds;

  const intervalId = setInterval(() => {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    // Update display
    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Check if timer has reached zero
    if (--timer < 0) {
      clearInterval(intervalId);
      display.textContent = "Time's Up!";
      display.classList.add('timer-ended');
      const audio = new Audio('alert.mp3'); // Add your alert sound here
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

  // Store timer information
  const timer = {
    duration: timerDuration,
    intervalId: startTimer(timerDuration, timerDisplay, timerId)
  };

  timers.push(timer);
}

// Event listener for 'Set' button
document.getElementById('set-timer-btn').addEventListener('click', () => {
  // Fetch input values and convert to integers
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  // Validate input to ensure a valid timer is set
  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please set a valid timer duration");
    return;
  }

  // Add new timer with the provided time
  addTimer(hours, minutes, seconds);
});
