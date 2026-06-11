// ASTRO PROJECT — Tweaks: accent palette, star density, shooting stars
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakSlider,
  TweakToggle,
  TweakColor,
} from './tweaks-panel.jsx';

const ASTRO_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accents": ["#7DE3F4", "#A78BFA"],
  "starDensity": 1,
  "shootingStars": true
}/*EDITMODE-END*/;

function AstroTweaks() {
  const [t, setTweak] = useTweaks(ASTRO_TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    const [a1, a2] = t.accents;
    root.style.setProperty('--accent-1', a1);
    root.style.setProperty('--accent-2', a2);
    root.style.setProperty('--accent-1-glow', `color-mix(in srgb, ${a1} 45%, transparent)`);
    root.style.setProperty('--accent-2-glow', `color-mix(in srgb, ${a2} 40%, transparent)`);
    root.style.setProperty('--glass-stroke-glow', `color-mix(in srgb, ${a1} 35%, transparent)`);
  }, [t.accents]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('astro:density', { detail: t.starDensity }));
  }, [t.starDensity]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('astro:meteors', { detail: t.shootingStars }));
  }, [t.shootingStars]);

  return (
    <TweaksPanel>
      <TweakSection label="Colors" />
      <TweakColor
        label="Accent duo"
        value={t.accents}
        options={[
          ["#7DE3F4", "#A78BFA"],
          ["#5EEAD4", "#60A5FA"],
          ["#F0ABFC", "#818CF8"]
        ]}
        onChange={(v) => setTweak('accents', v)}
      />
      <TweakSection label="Sky" />
      <TweakSlider
        label="Star density"
        value={t.starDensity}
        min={0.3} max={2.5} step={0.1}
        onChange={(v) => setTweak('starDensity', v)}
      />
      <TweakToggle
        label="Shooting stars"
        value={t.shootingStars}
        onChange={(v) => setTweak('shootingStars', v)}
      />
    </TweaksPanel>
  );
}

createRoot(document.getElementById('tweaks-root')).render(<AstroTweaks />);
