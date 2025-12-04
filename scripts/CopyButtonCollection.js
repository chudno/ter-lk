// CopyButtonTooltip.js
import BaseComponent from "./BaseComponent.js";

const rootSelector = "[data-js-copy]";

class CopyButton extends BaseComponent {
  selectors = {
    root: rootSelector,
  };

  constructor(rootElement) {
    super();
    this.rootElement = rootElement;
    this.tooltip = null;
    this.bindEvents();
  }

  async copyText() {
    const textToCopy =
      this.rootElement.dataset.copyValue || this.rootElement.textContent.trim();

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);

      const tooltipMessage =
        this.rootElement.dataset.tooltipText || "Скопировано!";
      this.showTooltip(tooltipMessage);
    } catch (err) {
      console.error("Не удалось скопировать:", err);
    }
  }

  showTooltip(message) {
    if (this.tooltip) {
      return;
    }

    this.tooltip = document.createElement("span");
    this.tooltip.className = "copy-tooltip";
    this.tooltip.textContent = message;

    Object.assign(this.tooltip.style, {
      position: "absolute",
      background: "var(--color-bg-tooltip)",
      color: "var(--color-text-tooltip)",
      padding: "8px 12px",
      borderRadius: "var(--rounded-l)",
      fontSize: "12px",
      whiteSpace: "nowrap",
      opacity: "0",
      pointerEvents: "none",
      transition: "opacity 0.3s",
      zIndex: 1000,
      boxShadow: "var(--box-shadow-base)",
    });

    const rect = this.rootElement.getBoundingClientRect();
    this.tooltip.style.top = `${rect.top - 40 + window.scrollY}px`;
    this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
    this.tooltip.style.transform = "translateX(-50%)";

    document.body.appendChild(this.tooltip);

    requestAnimationFrame(() => {
      this.tooltip.style.opacity = "1";
    });

    this.tooltipTimeout = setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.style.opacity = "0";
        setTimeout(() => this.tooltip?.remove(), 300);
        this.tooltip = null;
      }
    }, 1500);
  }

  bindEvents() {
    this.rootElement.addEventListener("click", () => this.copyText());
  }
}

class CopyButtonCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new CopyButton(element);
    });
  }
}

export default CopyButtonCollection;
