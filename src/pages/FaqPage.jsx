import React, { useEffect } from 'react';
import HonestFAQ from '../components/HonestFAQ';

export default function FaqPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '5.5rem' }}>
      <HonestFAQ />
    </main>
  );
}

