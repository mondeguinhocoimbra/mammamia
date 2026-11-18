'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.replace('/mammamia.html');
  }, []);
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 40, textAlign: 'center' }}>
      <p>A abrir a Mammamia…</p>
      <p><a href="/mammamia.html">Se não abrir, clica aqui</a></p>
    </main>
  );
}
