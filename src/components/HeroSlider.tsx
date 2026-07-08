'use client';

import { useEffect, useState } from 'react';
import { HiArrowRight, HiSparkles } from 'react-icons/hi2';

export type HeroSlide = {
  title: string;
  text: string;
  href: string;
  image: string;
};

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[active];

  return (
    <section className="heroFull">
      <a className="heroCard heroCardAnimated" href={slide.href} key={slide.title}>
        <img className="heroImage" src={slide.image} alt={slide.title} />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="label inlineLabel"><HiSparkles /> яркая витрина</p>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <div className="heroActions">
            <span className="primaryBtn heroBtn">Смотреть товары <HiArrowRight /></span>
            <span className="secondaryBtn">Акции недели</span>
          </div>
        </div>
      </a>
      <div className="sliderBullets" aria-label="Переключение баннеров">
        {slides.map((item, index) => (
          <button
            className={active === index ? 'bullet activeBullet' : 'bullet'}
            key={item.title}
            onClick={() => setActive(index)}
            type="button"
            aria-label={`Открыть баннер ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
