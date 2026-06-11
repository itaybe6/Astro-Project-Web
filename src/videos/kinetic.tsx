import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY } from "./brand";

/** Slams in from huge scale with blur — punchy kinetic text */
export const Slam: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.6 },
  });
  return (
    <div
      style={{
        opacity: Math.min(1, p * 1.7),
        transform: `scale(${2.3 - p * 1.3})`,
        filter: `blur(${(1 - p) * 12}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Huge outlined background number */
export const OutlineNumber: React.FC<{
  value: string;
  accent: string;
  style?: React.CSSProperties;
}> = ({ value, accent, style }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 14;
  return (
    <div
      style={{
        position: "absolute",
        fontFamily: FONT_DISPLAY,
        fontSize: 660,
        fontWeight: 900,
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: `3px ${accent}38`,
        transform: `translateY(${drift}px)`,
        userSelect: "none",
        ...style,
      }}
    >
      {value}
    </div>
  );
};

/** Row of progress dots (for multi-part text reels) */
export const ProgressDots: React.FC<{
  total: number;
  current: number;
  accent: string;
}> = ({ total, current, accent }) => (
  <div style={{ display: "flex", gap: 18, direction: "rtl" }}>
    {new Array(total).fill(0).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? 52 : 16,
          height: 16,
          borderRadius: 999,
          background: i === current ? accent : "rgba(255,255,255,0.22)",
          boxShadow: i === current ? `0 0 18px ${accent}` : undefined,
          transition: "none",
        }}
      />
    ))}
  </div>
);

/** Launch trajectory track with glowing comet — for the process reel */
export const LaunchTrack: React.FC<{
  progress: number; // 0..1
  steps: number;
  accent?: string;
}> = ({ progress, steps, accent = COLORS.cyan }) => {
  const w = 860;
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <div style={{ position: "relative", width: w, height: 60 }}>
      {/* base line */}
      <div
        style={{
          position: "absolute",
          top: 27,
          left: 0,
          right: 0,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.13)",
        }}
      />
      {/* fill (RTL: from right) */}
      <div
        style={{
          position: "absolute",
          top: 27,
          right: 0,
          width: w * clamped,
          height: 6,
          borderRadius: 999,
          background: `linear-gradient(270deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
          boxShadow: `0 0 22px ${accent}88`,
        }}
      />
      {/* nodes */}
      {new Array(steps).fill(0).map((_, i) => {
        const frac = i / (steps - 1);
        const reached = clamped >= frac - 0.001;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 18,
              right: w * frac - 12,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: reached ? accent : "#1c1c30",
              border: `3px solid ${reached ? accent : "rgba(255,255,255,0.25)"}`,
              boxShadow: reached ? `0 0 20px ${accent}` : undefined,
            }}
          />
        );
      })}
      {/* comet */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: w * clamped - 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `radial-gradient(circle, #fff 0%, ${accent} 45%, transparent 70%)`,
          filter: `drop-shadow(0 0 26px ${accent})`,
        }}
      />
    </div>
  );
};

/** Check / X marks for comparison cards */
export const Mark: React.FC<{ good?: boolean; size?: number }> = ({
  good = true,
  size = 54,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.58,
      fontWeight: 900,
      fontFamily: FONT_DISPLAY,
      color: good ? "#0B0B1A" : "#FFD9D9",
      background: good ? "#3DFFA0" : "rgba(255,90,90,0.25)",
      border: good ? "none" : "3px solid #FF6B6B",
      boxShadow: good ? "0 0 30px rgba(61,255,160,0.5)" : "none",
    }}
  >
    {good ? "✓" : "✗"}
  </div>
);
