'use client';

import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('kaskada-theme') as Theme | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = saved ?? (systemDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('kaskada-theme', nextTheme);
  }

  return (
    <button className="themeToggle" onClick={toggleTheme} type="button" aria-label="Переключить тему">
      {theme === 'dark' ? <HiSun /> : <HiMoon />}
      <span>{theme === 'dark' ? 'Светлая' : 'Тёмная'}</span>
    </button>
  );
}
