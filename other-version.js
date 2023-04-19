const [startBtn, stopBtn, durationBtn, pauseBtn, topEl, allBtn] = [document.querySelector('.start'), document.querySelector('.stop'), document.querySelector('.duration'), document.querySelector('.pause'), document.querySelector('.top'), document.querySelector('.all')];
const [min, sec] = [document.querySelector('.min'), document.querySelector('.sec')];
const alertEl = document.querySelector('.alert');
const resultsDiv = document.querySelector('.results');

function getInterval(className, text) {
  alertEl.textContent = text;
  alertEl.classList.add(className);
  setTimeout(() => alertEl.classList.remove(className), 1500);
}

class Watch {
  constructor() {
    this.isStart = false;
    this.isPause = false;
    this.isActive = false;
    this.interval = null;
    this.newInterval = null;
    this.counter = 0;
    this.oldCounter = 0;
    this.result = 0;
    this.steps = [];
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.duration = this.duration.bind(this);
    this.pause = this.pause.bind(this);
    this.all = this.all.bind(this);
    [startBtn, stopBtn, durationBtn, pauseBtn, allBtn].forEach(btn => btn.addEventListener('click', this[btn.dataset.action]));
  }
  start() {
    if (this.isPause) {
      getInterval("started", "Watch is continuing");
    }
    if (this.isStart) {
      getInterval("started", "Watch already started");
      return;
    }
    startBtn.textContent = "Started";
    stopBtn.textContent = "Stop";
    [...document.querySelectorAll('.top, .hidden')].forEach(el => el.classList.remove('show'));
    this.counter = 0;
    this.isStart = true;
    this.pause = false;
    getInterval("start", "Watch started");
    this.interval = setInterval(() => this.counter++, 1000);
  };
  stop() {
    if (!this.isStart) {
      getInterval("stopped", "Watch already stopped");
      return;
    } else {
      if (this.isPause) {
        [...document.querySelectorAll('.hidden')].forEach(el => el.classList.add('show'));
        getInterval("stop", "Watch stopped");
        min.textContent = ('0' + Math.floor(this.counter / 60)).slice(-2) + ":";
        sec.textContent = ('0' + this.counter % 60).slice(-2);
        stopBtn.textContent = "Stoped";
        clearInterval(this.newInterval);
        // let qoldiq = this.counter ? this.oldCounter : null;
        let qoldiq = this.isPause ? this.oldCounter : null;
        // let qoldiq = !this.isStart ? this.oldCounter : this.counter;
        console.log("Old countet", this.oldCounter);
        console.log("Qoldiq", this.oldCounter);
        this.result = Number(this.oldCounter) + Number(qoldiq);
        console.log("result", this.result);
        this.steps.pop();
        // this.steps.pop();
        console.log("oxirgi el o'chirildi", this.steps);
        this.steps.push(`${('0' + Math.floor(this.result / 60)).slice(-2)}:${('0' + this.result % 60).slice(-2)}`);
        console.log("oxirgi natija", this.steps);
        min.textContent = ('0' + Math.floor(this.result / 60)).slice(-2) + ":";
        sec.textContent = ('0' + this.result % 60).slice(-2);
        this.isPause = false; // <--- to'g'irlangan qator
        this.isStart = false;
        this.counter = 0;
        this.oldCounter = 0;
      } else {
        getInterval("stop", "Watch stopped");
        clearInterval(this.interval);
        this.steps.push(`${('0' + Math.floor(this.counter / 60)).slice(-2)}:${('0' + this.counter % 60).slice(-2)}`);
        console.log(this.steps);
        stopBtn.textContent = "Stoped";
        startBtn.textContent = "Start";
        getInterval("stop", "Watch stopped");
        [...document.querySelectorAll('.hidden')].forEach(el => el.classList.add('show'));
        this.isStart = false;
        this.isPause = false;
        min.textContent = ('0' + Math.floor(this.counter / 60)).slice(-2) + ":";
        sec.textContent = ('0' + this.counter % 60).slice(-2);
      }
    }
  };


  pause() {
    if (!this.isStart) {
      this.isPause = true;
      this.isStart = true;
      [...document.querySelectorAll('.top, .hidden')].forEach(el => el.classList.remove('show'));
      console.log("davom etyapti...");
      this.newInterval = setInterval(() => {
        this.oldCounter++;
        console.log(this.oldCounter);
      }, 1000);
      // this.stop = false; <-- to'g'irlangan qator
      getInterval("stop", "Watch continue");
      startBtn.textContent = "Start";
      stopBtn.textContent = "Stop";
    } else if (this.isPause) {
      getInterval("paused", "Watch already paused");
      getInterval("stopped", "Watch already continued");

    } else {
      this.isPause = true;
      clearInterval(this.interval);
      console.log("davom etyapti...");
      this.newInterval = setInterval(() => {
        this.oldCounter++;
        console.log(this.oldCounter);
      }, 1000);
      getInterval("pause", "Watch paused");
    }
  }
  duration() {
    topEl.classList.add('show');
  };
  all() {
    let arr = this.steps;
    arr.forEach(step => {
      const el = document.createElement('div');
      el.textContent = step;
    });
    resultsDiv.appendChild(el);
  }
};
new Watch;

// pause contunue