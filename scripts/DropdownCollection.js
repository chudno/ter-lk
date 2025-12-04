import BaseComponent from "./BaseComponent.js";

const rootSelector = "[data-js-dropdown]";

class Dropdown extends BaseComponent {
  selectors = {
    root: rootSelector,
    trigger: "[data-js-dropdown-trigger]",
    menu: "[data-js-dropdown-menu]",
  };

  stateClasses = {
    isOpen: "is-open",
    isActive: "is-active",
  };

  constructor(rootElement) {
    super();
    this.rootElement = rootElement;

    this.triggerElement = this.rootElement.querySelector(
      this.selectors.trigger,
    );
    this.menuElement = this.rootElement.querySelector(this.selectors.menu);

    this.isOpen = false;

    this.bindEvents();
  }

  open() {
    this.menuElement.classList.add(this.stateClasses.isOpen);
    this.triggerElement.classList.add(this.stateClasses.isActive);
    this.isOpen = true;
  }

  close() {
    this.menuElement.classList.remove(this.stateClasses.isOpen);
    this.triggerElement.classList.remove(this.stateClasses.isActive);
    this.isOpen = false;
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  bindEvents() {
    this.triggerElement.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    document.addEventListener("click", (e) => {
      if (!this.rootElement.contains(e.target)) {
        this.close();
      }
    });
  }
}

class DropdownCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Dropdown(element);
    });
  }
}

export default DropdownCollection;
