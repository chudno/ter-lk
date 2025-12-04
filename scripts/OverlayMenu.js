class OverlayMenu {
  selectors = {
    root: "[data-js-overlay-menu]",
    dialog: "[data-js-overlay-menu-dialog]",
    burgerButton: "[data-js-overlay-menu-burger-button]",
    closeDialog: "[data-js-overlay-menu-close]",
  };

  stateClasses = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.dialogElement = this.rootElement.querySelector(this.selectors.dialog);
    this.burgerButtonElement = this.rootElement.querySelector(
      this.selectors.burgerButton,
    );
    this.menuButtonClose = this.rootElement.querySelector(
      this.selectors.closeDialog,
    );
    this.bindEvents();
  }

  onButtonBurgerClick = () => {
    this.dialogElement.showModal();
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };

  onMenuButtonClose = () => {
    this.dialogElement.close();
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  };

  onBackdropClick = (e) => {
    if (e.target === this.dialogElement) {
      this.onMenuButtonClose();
    }
  };

  bindEvents() {
    this.burgerButtonElement.addEventListener(
      "click",
      this.onButtonBurgerClick,
    );
    this.menuButtonClose.addEventListener("click", this.onMenuButtonClose);
    this.dialogElement.addEventListener("click", this.onBackdropClick);
  }
}

export default OverlayMenu;
