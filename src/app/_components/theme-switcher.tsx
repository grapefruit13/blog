"use client";

import { useEffect, useState } from "react";
import styles from "./switch.module.css";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes = ["system", "dark", "light"] as const;
type ColorSchemePreference = (typeof modes)[number];

const ThemeSwitcher = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(() => {
    return (
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) as ColorSchemePreference) ?? "system"
    );
  });

  // 클라이언트에서 DOM 업데이트를 위한 useEffect
  // updating DOM on Client side with useEffect
  useEffect(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY) ?? "system";
    const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const resolvedMode = savedMode === "system" ? systemMode : savedMode;

    // 클라이언트에서만 className과 data-mode 업데이트
    // updating className and data-mode only in Client side
    document.documentElement.classList.add(resolvedMode);
    document.documentElement.setAttribute("data-mode", savedMode);
    localStorage.setItem(STORAGE_KEY, savedMode);
  }, []);

  // 모드 변경 처리
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
