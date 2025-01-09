import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for saved preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";

    // Preference check order:
    // 1. Locally saved preference
    // 2. Browser/System preference
    // 3. Default to light mode
    const preferredTheme =
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(preferredTheme);
  }, []);

  // Effect to apply theme and save preference
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing classes
    root.classList.remove("light", "dark");

    // Add current theme class
    root.classList.add(theme);

    // Save to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if no local preference is set
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Toggle theme method
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};