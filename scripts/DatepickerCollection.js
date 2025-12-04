class DatepickerAuto {
  init() {
    const items = document.querySelectorAll("[data-datepicker]");

    items.forEach((el, index) => {
      // чтобы не инициализировать дважды
      if (el.dataset.dpInitialized) return;

      // Получаем параметры
      const mode = el.dataset.mode || "single";
      const months = Number(el.dataset.months) || 1;

      // Генерируем уникальный id, если его нет
      if (!el.id) {
        el.id = `dp-${index + 1}`;
      }

      // Инициализация FlexiDatepicker через селектор
      new FlexiDatepicker(`#${el.id}`, {
        mode,
        monthsToShow: months,
        locale: "ru",
      });

      el.dataset.dpInitialized = "true";
    });
  }
}

class DatepickerCollection {
  constructor() {
    // инициализация после DOMContentLoaded
    document.addEventListener("DOMContentLoaded", () => {
      this.datepicker = new DatepickerAuto();
      this.datepicker.init();
    });
  }
}

export default DatepickerCollection;
