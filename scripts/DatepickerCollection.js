class DatepickerManager {
  constructor(selector = "[data-js-datepicker]") {
    this.selector = selector;
    this.instances = [];
  }

  init() {
    const elements = document.querySelectorAll(this.selector);
    if (!elements.length) return;

    elements.forEach((el) => {
      const options = this.getOptionsFromDataset(el.dataset);

      const isMobileMode = window.innerWidth < 1024;

      const instance = new AirDatepicker(el, {
        ...options,
        range: true,                // включаем возможность выбирать диапазон
        multipleDates: false,       // но не даём выбирать 3+ дат
        autoClose: true,
        locale: AirDatepickerLocales.ru,
        isMobile: isMobileMode,

        onSelect({ date, formattedDate }) {
          // Если только одна дата — date.length === 1
          // Если диапазон — date.length === 2
          console.log("Выбор:", date);
        },
      });

      this.instances.push(instance);
    });
  }

  getOptionsFromDataset(dataset) {
    const options = {};

    for (const [key, value] of Object.entries(dataset)) {
      if (value === "true") options[key] = true;
      else if (value === "false") options[key] = false;
      else options[key] = value;
    }

    return options;
  }
}

class DatepickerCollection {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const datepicker = new DatepickerManager();
      datepicker.init();
    });
  }
}

export default DatepickerCollection;