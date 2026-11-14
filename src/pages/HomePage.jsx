import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import InterstellarVoyager from '../components/InterstellarVoyager';

const SECTION_PROGRESS = {
  hero: 0.0,
  missions: 0.52,
  tesseract: 0.78,
  comm: 0.96,
};

export default function HomePage({ showToast }) {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sec = searchParams.get('section');
    if (sec && SECTION_PROGRESS[sec] !== undefined) {
      const timer = setTimeout(() => {
        const track = document.querySelector('.interstellar-voyage-track');
        if (track) {
          const scrollable = track.scrollHeight - window.innerHeight;
          window.scrollTo({
            top: SECTION_PROGRESS[sec] * scrollable,
            behavior: 'smooth',
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [searchParams]);

  return (
    <main>
      <InterstellarVoyager showToast={showToast} />
    </main>
  );
}

