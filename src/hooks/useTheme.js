import { useEffect, useState } from "react";

// Key used to store theme in localStorage
const STORAGE_KEY = "crypto-dashboard-theme";

// Helper to get saved theme or fallback
function getPreferredTheme() {
  // Read stored value
  const stored = window.localStorage.getItem(STORAGE_KEY);

  // Validate stored value
  if (stored === "light" || stored === "dark") return stored;

  // Default theme if nothing stored
  return "dark";
}

// Custom hook to manage app theme (dark/light)
export function useTheme() {
  // Theme state (default = dark)
  const [theme, setTheme] = useState("dark");

  // ---------------- LOAD THEME ON MOUNT ----------------
  useEffect(() => {
    // Set theme from localStorage or default
    setTheme(getPreferredTheme());
  }, []);

  // ---------------- APPLY THEME + SAVE ----------------
  useEffect(() => {
    // Toggle "dark" class on <html> element
    // (used by Tailwind / CSS for dark mode styling)
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    // Save theme to localStorage for persistence
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // ---------------- TOGGLE FUNCTION ----------------
  const toggleTheme = () =>
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );

  // ---------------- RETURN ----------------
  return {
    theme,         // Current theme ("light" | "dark")
    toggleTheme,   // Function to switch theme
  };
}