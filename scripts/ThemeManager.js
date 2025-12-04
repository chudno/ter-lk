// ThemeManager.js
export default class ThemeManager {
  constructor() {
    this.root = document.body;
    this.themeKey = "theme";
    this.init();
  }

  init() {
    this.applyTheme(this.detectTheme());
    this.listenSystemChange();
  }

  detectTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) return savedTheme;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  }

  applyTheme(theme) {
    this.root.setAttribute("data-theme", theme);
  }

  listenSystemChange() {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      const savedTheme = localStorage.getItem(this.themeKey);
      if (!savedTheme) {
        this.applyTheme(e.matches ? "dark" : "light");
      }
    });
  }
}
