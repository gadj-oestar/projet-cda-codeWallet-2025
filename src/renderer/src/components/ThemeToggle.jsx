import { useState, useEffect } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (typeof document !== "undefined" && document.body) {
      if (darkMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <span className="theme-slider"></span>
    </label>
  );
}

export default ThemeToggle;
