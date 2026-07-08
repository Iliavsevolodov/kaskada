'use client';

import { useMemo, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const categoryImages: Record<string, string[]> = {
  'Уход': [
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
  ],
  'Дом': [
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80'
  ],
  'Уют': [
    'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80'
  ],
  'Подарки': [
    'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80'
  ],
  'Чай': [
    'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
  ],
  'Детям': [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80'
  ],
  'Питомцам': [
    'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80'
  ]
};

type ProductPreviewSliderProps = {
  href: string;
  image: string;
  title: string;
  category: string;
  badge: string;
  gallery?: string[];
};

export function ProductPreviewSlider({ href, image, title, category, badge, gallery }: ProductPreviewSliderProps) {
  const [active, setActive] = useState(0);
  const slides = useMemo(() => {
    const fallback = categoryImages[category] ?? [];
    return Array.from(new Set([image, ...(gallery ?? []), ...fallback])).slice(0, 4);
  }, [category, gallery, image]);

  function next(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActive((current) => (current + 1) % slides.length);
  }

  function prev(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  return (
    <div className="productImage productPreview">
      <a className="previewImageLink" href={href}>
        <div className="previewTrack" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((slide) => <img src={slide} alt={title} key={slide} />)}
        </div>
        <span className="badge">{badge}</span>
      </a>
      {slides.length > 1 ? (
        <>
          <button className="previewArrow previewArrowLeft" onClick={prev} type="button" aria-label="Предыдущее фото"><HiChevronLeft /></button>
          <button className="previewArrow previewArrowRight" onClick={next} type="button" aria-label="Следующее фото"><HiChevronRight /></button>
          <div className="previewDots">
            {slides.map((slide, index) => <span className={active === index ? 'previewDot activePreviewDot' : 'previewDot'} key={slide} />)}
          </div>
        </>
      ) : null}
    </div>
  );
}
