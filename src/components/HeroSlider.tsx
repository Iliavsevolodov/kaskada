'use client';

import { useEffect, useRef, useState } from 'react';
import { HiArrowRight, HiChevronLeft, HiChevronRight, HiSparkles } from 'react-icons/hi2';

export type HeroSlide = {
  title: string;
  text: string;
  href: string;
  image: string;
};

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => next(), 5200);
    return () => window.clearInterval(timer);
  });

  function go(index: number) {
    setActive((index + slides.length) % slides.length);
    setProgressKey((key) => key + 1);
  }

  function next() {
    go(active + 1);
  }

  function prev() {
    go(active - 1);
  }

  function onTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    startX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const distance = event.changedTouches[0].clientX - startX.current;
    if (Math.abs(distance) > 42) {
      distance < 0 ? next() : prev();
    }
    startX.current = null;
  }

  return (
    <section className="heroFull" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="heroViewport">
        <div className="heroTrack" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((slide) => (
            <a className="heroCard" href={slide.href} key={slide.title}>
              <img className="heroImage" src={slide.image} alt={slide.title} />
              <div className="heroOverlay" />
              <div className="heroContent">
                <p className="label inlineLabel"><HiSparkles /> яркая витрина</p>
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <div className="heroActions">
                  <span className="primaryBtn heroBtn">Смотреть <HiArrowRight /></span>
                  <span className="secondaryBtn">Акции</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button className="sliderArrow sliderArrowLeft" onClick={prev} type="button" aria-label="Предыдущий баннер"><HiChevronLeft /></button>
      <button className="sliderArrow sliderArrowRight" onClick={next} type="button" aria-label="Следующий баннер"><HiChevronRight /></button>

      <div className="sliderProgress" key={progressKey}><span /></div>
      <div className="sliderBullets" aria-label="Переключение баннеров">
        {slides.map((item, index) => (
          <button className={active === index ? 'bullet activeBullet' : 'bullet'} key={item.title} onClick={() => go(index)} type="button" aria-label={`Открыть баннер ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
