'use client';

import { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';

export type StoryItem = {
  title: string;
  image: string;
};

export function StoryViewer({ stories }: { stories: StoryItem[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        if (current >= stories.length - 1) {
          setOpen(false);
          return 0;
        }
        return current + 1;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [open, stories.length, active]);

  const current = stories[active];

  function openStory(index: number) {
    setActive(index);
    setOpen(true);
  }

  function next() {
    setActive((currentIndex) => Math.min(stories.length - 1, currentIndex + 1));
  }

  function prev() {
    setActive((currentIndex) => Math.max(0, currentIndex - 1));
  }

  return (
    <>
      <div className="storyRail">
        {stories.map((story, index) => (
          <button className="story" key={story.title} onClick={() => openStory(index)} type="button">
            <span className="storyRing"><span><img src={story.image} alt={story.title} /></span></span>
            <span className="storyTitle">{story.title}</span>
          </button>
        ))}
      </div>

      {open ? (
        <div className="storyOverlay">
          <div className="storyModal">
            <div className="storyProgress">
              {stories.map((story, index) => (
                <span className="storyProgressTrack" key={story.title}>
                  <span className={index < active ? 'storyProgressFill done' : index === active ? 'storyProgressFill active' : 'storyProgressFill'} />
                </span>
              ))}
            </div>
            <button className="storyClose" onClick={() => setOpen(false)} type="button" aria-label="Закрыть"><HiXMark /></button>
            <img src={current.image} alt={current.title} />
            <div className="storyCaption">
              <p>Каскада Маркет</p>
              <h3>{current.title}</h3>
            </div>
            <button className="storyTap storyTapLeft" onClick={prev} type="button" aria-label="Назад" />
            <button className="storyTap storyTapRight" onClick={next} type="button" aria-label="Вперёд" />
          </div>
        </div>
      ) : null}
    </>
  );
}
