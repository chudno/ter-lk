const miniBars = document.querySelectorAll(".chart-mobile__bar");
const miniWrapper = document.querySelector(".chart-mobile__wrapper");
const miniShadows = miniWrapper.querySelectorAll(".chart-mobile__shadow");

// Изначально скрываем clip-path для анимации
miniShadows.forEach((shadow) => {
  shadow.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
  shadow.style.transition = "clip-path 0.8s ease";
  shadow.style.webkitClipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
});

// Мини-бары
miniBars.forEach((bar) => {
  bar.style.width = "0%"; // анимируем ширину
});

setTimeout(() => {
  miniBars.forEach((bar, i) => {
    const value = Number(bar.dataset.value);

    // Анимация ширины бара
    bar.style.transition = "width 0.8s ease";
    bar.style.width = value + "%";

    // span с процентами
    const span = document.createElement("span");
    span.textContent = value.toFixed(1) + "%";
    bar.appendChild(span);

    // анимация теней
    if (i < miniBars.length - 1) {
      const nextValue = Number(miniBars[i + 1].dataset.value);
      const shadow = miniShadows[i];

      // через requestAnimationFrame, чтобы браузер успел применить начальное значение
      requestAnimationFrame(() => {
        shadow.style.clipPath = `polygon(
                    0% 0%,
                    ${value}% 0%,
                    ${nextValue}% 100%,
                    0% 100%
                )`;
        shadow.style.webkitClipPath = `polygon(
                    0% 0%,
                    ${value}% 0%,
                    ${nextValue}% 100%,
                    0% 100%
                )`;
      });
    }
  });
}, 50);
