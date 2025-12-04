function timer() {
  document.querySelectorAll("[data-js-countdown]").forEach((copyBlock) => {
    const progressBarFill = copyBlock.querySelector(
      "[data-js-countdown-progress-item]",
    );
    const progressContainer = copyBlock.querySelector(
      "[data-js-countdown-progress]",
    );
    const timeRemainingEl = copyBlock.querySelector(
      "[data-js-countdown-start-text]",
    );
    const timeEndEl = copyBlock.querySelector("[data-js-countdown-end-text]");

    const startDate = new Date(progressContainer.dataset.startDate);
    const endDate = new Date(progressContainer.dataset.endDate);

    const totalSeconds = Math.floor((endDate - startDate) / 1000);

    // Отобразим дату окончания
    const endDay = String(endDate.getDate()).padStart(2, "0");
    const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
    const endHours = String(endDate.getHours()).padStart(2, "0");
    const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
    timeEndEl.textContent = `дата окончания: ${endDay}.${endMonth} ${endHours}:${endMinutes}`;

    function updateTimer() {
      const now = new Date();

      // Проверяем, началась ли сессия
      if (now < startDate) {
        timeRemainingEl.textContent = "Сессия не началась";
        progressBarFill.style.width = "100%"; // пока полная, можно даже 0%, если хочешь
        return;
      }

      let remainingSeconds = Math.floor((endDate - now) / 1000);

      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        timeRemainingEl.textContent = "Завершено";
        progressBarFill.style.width = "0%";
        return;
      }

      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);

      timeRemainingEl.textContent = `${hours}ч ${minutes}мин`;

      // Обратный прогресс: от 100% (старт) к 0% (конец)
      const elapsedSeconds = Math.floor((now - startDate) / 1000);
      const progressPercent = 100 - (elapsedSeconds / totalSeconds) * 100;
      progressBarFill.style.width = progressPercent + "%";
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  });
}

export default timer;
