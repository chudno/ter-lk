import BaseComponent from "./BaseComponent.js";

const rootSelector = "[data-js-search]";

class SearchInput extends BaseComponent {
  selectors = {
    root: rootSelector,
    input: "[data-js-search-input]",
    icon: "[data-js-search-icon]",
  };

  stateClasses = {
    isClear: "is-clear",
    isSearch: "is-search",
  };

  constructor(rootElement) {
    super();
    this.rootElement = rootElement;

    this.inputElement = this.rootElement.querySelector(this.selectors.input);
    this.iconElement = this.rootElement.querySelector(this.selectors.icon);

    this.state = this.getProxyState({
      hasValue: Boolean(this.inputElement.value.trim()),
    });

    this.bindEvents();
    this.updateUI();
  }

  updateUI() {
    const { hasValue } = this.state;

    this.iconElement.classList.toggle(this.stateClasses.isSearch, !hasValue);
    this.iconElement.classList.toggle(this.stateClasses.isClear, hasValue);
  }

  onInput = () => {
    this.state.hasValue = Boolean(this.inputElement.value.trim());
  };

  onIconClick = () => {
    if (!this.state.hasValue) return;

    this.inputElement.value = "";
    this.state.hasValue = false;

    this.inputElement.focus();
  };

  bindEvents() {
    this.inputElement.addEventListener("input", this.onInput);
    this.iconElement.addEventListener("click", this.onIconClick);
  }
}

class SearchInputCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new SearchInput(element);
    });
  }
}

export default SearchInputCollection;
