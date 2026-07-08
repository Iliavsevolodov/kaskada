'use client';

import { useEffect, useState } from 'react';

const colors = [
  { id: 'coral', label: 'Коралловый' },
  { id: 'violet', label: 'Фиолетовый' },
  { id: 'emerald', label: 'Изумрудный' },
  { id: 'blue', label: 'Синий' },
  { id: 'gold', label: 'Золотой' }
] as const;

type Accent = (typeof colors)[number]['id'];

export function AccentColorPicker() {
  const [accent, setAccent] = useState<Accent>('coral');

  useEffect(() => {
    const saved = window.localStorage.getItem('kaskada-accent') as Accent | null;
    const next = saved ?? 'coral';
    setAccent(next);
    document.documentElement.dataset.accent = next;
  }, []);

  function choose(next: Accent) {
    setAccent(next);
    document.documentElement.dataset.accent = next;
    window.localStorage.setItem('kaskada-accent', next);
  }

  return (
    <div className="accentPicker" aria-label="Цвет интерфейса">
      {colors.map((color) => (
        <button
          className={accent === color.id ? `accentDot ${color.id} activeAccentDot` : `accentDot ${color.id}`}
          key={color.id}
          onClick={() => choose(color.id)}
          type="button"
          aria-label={color.label}
          title={color.label}
        />
      ))}
    </div>
  );
}
