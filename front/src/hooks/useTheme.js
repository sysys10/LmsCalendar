import { useState, useEffect } from "react";

const useDarkMode = () => {
  // localStorage 체크 함수
  const localStorageChecker = () => {
    if (!localStorage.theme) return false;
    return localStorage.theme === "dark";
  };

  const [isDark, setIsDark] = useState(localStorageChecker());

  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    setIsDark((state) => {
      const update = !state;
      localStorage.theme = update ? "dark" : "light";
      return update;
    });
  };

  // 다크모드 클래스 적용
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return {
    isDark,
    toggleDarkMode,
  };
};

export default useDarkMode;
