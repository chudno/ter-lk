const bars = document.querySelectorAll('.chart__bar');
const chartWrapper = document.querySelector('.chart__wrapper');
const maxHeight = chartWrapper.clientHeight;
const clips = chartWrapper.querySelectorAll('.chart__shadow'); // тени между колонками

// Сначала обнуляем высоту баров и бейджей для анимации
bars.forEach(bar => {
  bar.style.height = '0px';
});

clips.forEach(clip => {
  clip.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
  clip.style.transition = 'clip-path 0.8s ease';
});

// Анимация после небольшой задержки
setTimeout(() => {
  bars.forEach((bar, i) => {
    const count = Number(bar.dataset.count);
    const value = Number(bar.dataset.value);

    const barHeight = value * (maxHeight / 100);

    // Плавная анимация высоты
    bar.style.transition = 'height 0.8s ease';
    bar.style.height = barHeight + 'px';

    // Бейдж с процентами
    const badge = document.createElement('span');
    badge.textContent = value.toFixed(1) + '%';
    badge.style.transition = 'transform 0.8s ease'; // движение с ростом
    bar.appendChild(badge);

    // Число сверху
    const countSpan = document.createElement('div');
    countSpan.classList.add('count');
    countSpan.textContent = count;
    bar.appendChild(countSpan);

    // Тень между колонками (clip-path) только для всех кроме последнего
    if (i < bars.length - 1) {
      const nextBar = bars[i + 1];
      const valueNext = Number(nextBar.dataset.value);

      const topCurrent = 100 - value;    // верхний край текущего
      const topNext = 100 - valueNext;   // верхний край следующего

      const clip = clips[i];

      // Плавная анимация через requestAnimationFrame
      requestAnimationFrame(() => {
        clip.style.clipPath = `polygon(
                    0% ${topCurrent}%,
                    100% ${topNext}%,
                    100% 100%,
                    0% 100%
                )`;
      });
    }
  });
}, 50);

const conversion = document.querySelector('.conversion');

function positionConversion() {
  const bar3 = bars[2]; // третий столбец
  const bar4 = bars[3]; // четвёртый столбец
  const wrapperRect = bar3.parentElement.getBoundingClientRect();

  // центры столбцов
  const center3 = bar3.offsetLeft + bar3.offsetWidth / 2;
  const center4 = bar4.offsetLeft + bar4.offsetWidth / 2;

  // левый край блока = центр левого бара
  const left = center3;
  // ширина блока = расстояние между центрами
  const width = center4 - center3;

  conversion.style.opacity = '1';
  conversion.style.top = '-54px'; // над столбцами, подправь по вкусу
  conversion.style.left = left + 'px';
  conversion.style.width = width + 'px';
}

// после анимации высоты
// bars.forEach(bar => {
//     bar.addEventListener('transitionend', () => {
//         positionConversion();
//     });
// });
positionConversion();
window.addEventListener('resize', positionConversion);