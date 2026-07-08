'use client';

import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';

type Theme = 'light' | 'dark';
type Accent = 'coral' | 'violet' | 'green' | 'blue' | 'gold';

const accents: Accent[] = ['coral', 'violet', 'green', 'blue', 'gold'];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [accent, setAccent] = useState<Accent>('coral');

  useEffect(() => {
    const saved = window.localStorage.getItem('kaskada-theme') as Theme | null;
    const savedAccent = window.localStorage.getItem('kaskada-accent') as Accent | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = saved ?? (systemDark ? 'dark' : 'light');
    const initialAccent: Accent = savedAccent && accents.includes(savedAccent) ? savedAccent : 'coral';
    setTheme(initialTheme);
    setAccent(initialAccent);
    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.dataset.accent = initialAccent;
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('kaskada-theme', nextTheme);
  }

  function changeAccent(nextAccent: Accent) {
    setAccent(nextAccent);
    document.documentElement.dataset.accent = nextAccent;
    window.localStorage.setItem('kaskada-accent', nextAccent);
  }

  return (
    <div className="themeTools">
      <button className="themeToggle" onClick={toggleTheme} type="button" aria-label="Переключить тему">
        {theme === 'dark' ? <HiSun /> : <HiMoon />}
        <span>{theme === 'dark' ? 'Светлая' : 'Тёмная'}</span>
      </button>
      <div className="accentPicker" aria-label="Цвет интерфейса">
        {accents.map((item) => (
          <button
            className={accent === item ? `accentDot accent-${item} activeAccentDot` : `accentDot accent-${item}`}
            key={item}
            onClick={() => changeAccent(item)}
            type="button"
            aria-label={`Цвет ${item}`}
          />
        ))}
      </div>
    </div>
  );
}
