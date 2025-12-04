// Air Datepicker Russian locale for browser (UMD)
// Совместимо с <script>, без exports

(function (global) {
  global.AirDatepickerLocales = global.AirDatepickerLocales || {};

  global.AirDatepickerLocales.ru = {
    days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    daysShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    months: [
      'Январь','Февраль','Март','Апрель','Май','Июнь',
      'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
    ],
    monthsShort: [
      'Янв','Фев','Мар','Апр','Май','Июн',
      'Июл','Авг','Сен','Окт','Ноя','Дек'
    ],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
    firstDay: 1
  };
})(window);
