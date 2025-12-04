// Countdown.js
const MONTHS = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

class Countdown {
  constructor(root) {
    this.root = root;

    this.progressBarFill = root.querySelector(
      "[data-js-countdown-progress-item]",
    );
    this.progressContainer = root.querySelector("[data-js-countdown-progress]");
    this.timeRemainingEl = root.querySelector("[data-js-countdown-start-text]");
    this.timeEndEl = root.querySelector("[data-js-countdown-end-text]");

    this.startDate = new Date(this.progressContainer.dataset.startDate);
    this.endDate = new Date(this.progressContainer.dataset.endDate);

    this.totalSeconds = Math.floor((this.endDate - this.startDate) / 1000);

    this.renderEndDate();
    this.update();
    this.timer = setInterval(() => this.update(), 1000);
  }

  renderEndDate() {
    const d = this.endDate;

    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    this.timeEndEl.textContent = `дата окончания: ${day} ${month}. ${hours}:${minutes}`;
  }

  update() {
    const now = new Date();

    // Сессия не началась
    if (now < this.startDate) {
      this.timeRemainingEl.textContent = "Сессия не началась";
      this.progressBarFill.style.width = "100%";
      return;
    }

    let remainingSeconds = Math.floor((this.endDate - now) / 1000);

    // Завершена
    if (remainingSeconds <= 0) {
      this.timeRemainingEl.textContent = "Завершено";
      this.progressBarFill.style.width = "0%";
      clearInterval(this.timer);
      return;
    }

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    this.timeRemainingEl.textContent = `${hours}ч ${minutes}мин`;

    // Прогресс 100 → 0
    const elapsedSeconds = Math.floor((now - this.startDate) / 1000);
    const progressPercent = 100 - (elapsedSeconds / this.totalSeconds) * 100;

    this.progressBarFill.style.width = `${progressPercent}%`;
  }
}

export default class CountdownCollection {
  constructor() {
    this.selector = "[data-js-countdown]";
    this.init();
  }

  init() {
    document.querySelectorAll(this.selector).forEach((el) => {
      new Countdown(el);
    });
  }
}
