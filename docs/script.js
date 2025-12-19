// =======================
// THEME & ACCESSIBILITY
// =======================

const THEME_KEY = "guide_theme";
const FONT_SCALE_KEY = "guide_font_scale";

// Initial setup on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initFontScale();
  initThemeControls();
  initAccessibilityPanel();
  initFontSizeControls();
  initCopyButtons();
});

// ---------- THEME ----------
function initTheme() {
  // Load saved theme (auto/light/dark)
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "auto") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // default to auto (follows system)
    document.documentElement.setAttribute("data-theme", "auto");
  }

  updateThemeToggleIcon();
  updateThemeButtonsState();
}

function setTheme(mode) {
  // mode: "auto" | "light" | "dark"
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem(THEME_KEY, mode);
  updateThemeToggleIcon();
  updateThemeButtonsState();
}

function updateThemeToggleIcon() {
  const iconSpan = document.getElementById("theme-toggle-icon");
  if (!iconSpan) return;

  const theme = document.documentElement.getAttribute("data-theme") || "auto";

  // Simple icon logic
  if (theme === "light") {
    iconSpan.textContent = "🌞";
  } else if (theme === "dark") {
    iconSpan.textContent = "🌙";
  } else {
    iconSpan.textContent = "🌓"; // auto
  }
}

function updateThemeButtonsState() {
  const theme = document.documentElement.getAttribute("data-theme") || "auto";
  document
    .querySelectorAll('.radio-btn[data-theme]')
    .forEach((btn) => {
      const btnTheme = btn.getAttribute("data-theme");
      if (btnTheme === theme) {
        btn.classList.add("is-active");
      } else {
        btn.classList.remove("is-active");
      }
    });
}

function initThemeControls() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "auto";
      // Cycle: auto -> light -> dark -> auto
      const next = current === "auto" ? "light" : current === "light" ? "dark" : "auto";
      setTheme(next);
    });
  }

  // Radio-style buttons inside accessibility panel
  document
    .querySelectorAll('.radio-btn[data-theme]')
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-theme");
        if (mode) {
          setTheme(mode);
        }
      });
    });
}

// ---------- FONT SIZE ----------
function initFontScale() {
  const savedScale = parseFloat(localStorage.getItem(FONT_SCALE_KEY));

  if (!isNaN(savedScale) && savedScale >= 0.8 && savedScale <= 1.4) {
    document.documentElement.style.setProperty("--font-size-scale", savedScale.toString());
  }
}

function changeFontScale(delta) {
  const current = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale") || "1"
  );
  let next = current + delta;
  // Clamp between 0.8x and 1.4x
  next = Math.min(1.4, Math.max(0.8, next));
  document.documentElement.style.setProperty("--font-size-scale", next.toString());
  localStorage.setItem(FONT_SCALE_KEY, next.toString());
}

function resetFontScale() {
  const defaultScale = 1;
  document.documentElement.style.setProperty("--font-size-scale", defaultScale.toString());
  localStorage.setItem(FONT_SCALE_KEY, defaultScale.toString());
}

function initFontSizeControls() {
  const decBtn = document.getElementById("font-decrease");
  const incBtn = document.getElementById("font-increase");
  const resetBtn = document.getElementById("font-reset");

  if (decBtn) decBtn.addEventListener("click", () => changeFontScale(-0.1));
  if (incBtn) incBtn.addEventListener("click", () => changeFontScale(0.1));
  if (resetBtn) resetBtn.addEventListener("click", resetFontScale);
}

// ---------- ACCESSIBILITY PANEL ----------
function initAccessibilityPanel() {
  const panel = document.getElementById("accessibility-panel");
  const toggle = document.getElementById("accessibility-toggle");
  const closeBtn = document.getElementById("accessibility-close");

  if (!panel || !toggle) return;

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isHidden = panel.hasAttribute("hidden");
    if (isHidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closePanel);
  }

  // Close panel on Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hasAttribute("hidden")) {
      closePanel();
    }
  });
}

// ---------- COPY BUTTONS ----------
function initCopyButtons() {
  const toast = document.getElementById("copy-toast");

  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    toast.classList.add("is-visible");
    clearTimeout(showToast._timeout);
    showToast._timeout = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.hidden = true;
    }, 1400);
  }

  document.querySelectorAll(".copy-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        showToast();
      } catch (err) {
        console.error("Clipboard copy failed", err);
        // Fallback: select text in the code block
        const pre = btn.previousElementSibling;
        if (pre && pre.tagName === "PRE") {
          const range = document.createRange();
          range.selectNodeContents(pre);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
  });
}