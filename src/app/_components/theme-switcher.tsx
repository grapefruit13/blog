"use client";

import { useEffect, useState } from "react";
import styles from "./switch.module.css";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes = ["system", "dark", "light"] as const;
type ColorSchemePreference = (typeof modes)[number];

const ThemeSwitcher = () => {
  // theme mode state
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) as ColorSchemePreference) ?? "system"
  );

  // updating DOM on Client side with useEffect
  useEffect(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY) ?? "system";
    const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const resolvedMode = savedMode === "system" ? systemMode : savedMode;

    // updating className and data-mode only on Client side
    document.documentElement.classList.add(resolvedMode);
    document.documentElement.setAttribute("data-mode", savedMode);
    localStorage.setItem(STORAGE_KEY, savedMode);
  }, []);

  /** when switch mode **/
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const resolvedMode = mode === "system" ? systemMode : mode;

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(resolvedMode);
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

export default ThemeSwitcher;
