const [startBtn, stopBtn, durationBtn] = [document.querySelector('.start'), document.querySelector('.stop'), document.querySelector('.duration')];
const [min, sec] = [document.querySelector('.min'), document.querySelector('.sec')];
const alertEl = document.querySelector('.alert');

function getInterval(className, text) {
  alertEl.textContent = text;
  alertEl.classList.add(className);
  setTimeout(() => alertEl.classList.remove(className), 1500);
}

class Watch {
  constructor() {
    this.isStart = false;
    this.isActive = false;
    this.interval = null;
    this.counter = 0;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.duration = this.duration.bind(this);
    // [startBtn, stopBtn, durationBtn].forEach(btn => btn.addEventListener('click', this[btn.dataset.action]));
    // [startBtn, stopBtn, durationBtn].forEach(btn => btn.addEventListener('click', this[btn.dataset.method]));
    startBtn.addEventListener('click', this.start);
    stopBtn.addEventListener('click', this.stop);
    durationBtn.addEventListener('click', this.duration);
  }
  start() {
    if (this.isStart) {
      getInterval("started", "Watch already started");
      return;
    }
    startBtn.textContent = "Started";
    stopBtn.textContent = "Stop";
    [...document.querySelectorAll('.top, .hidden')].forEach(el => el.classList.remove('show'));
    this.counter = 0;
    this.isStart = true;
    getInterval("start", "Watch started");
    this.interval = setInterval(() => this.counter++, 1000);
  };
  stop() {
    if (!this.isStart) {
      getInterval("stopped", "Watch already stopped");
      return;
    }
    clearInterval(this.interval);
    stopBtn.textContent = "Stoped";
    startBtn.textContent = "Start";
    getInterval("stop", "Watch stopped");
    document.querySelector('.hidden').classList.add('show');
    this.isStart = false;
  };
  duration() {
    document.querySelector('.top').classList.add('show');
    min.textContent = ('0' + Math.floor(this.counter / 60)).slice(-2) + ":";
    sec.textContent = ('0' + this.counter % 60).slice(-2);;
  };
};
new Watch;