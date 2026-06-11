import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_HE, FONT_DISPLAY } from "./brand";

/* ---------- Background layers ---------- */

export const Starfield: React.FC<{ count?: number; speed?: number }> = ({
  count = 110,
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const stars = React.useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: random(`x${i}`) * 100,
        y: random(`y${i}`) * 100,
        size: 1 + random(`s${i}`) * 3.2,
        tw: random(`t${i}`) * Math.PI * 2,
        spd: 0.35 + random(`v${i}`),
        hue: random(`h${i}`),
      })),
    [count]
  );
  return (
    <AbsoluteFill>
      {stars.map((s, i) => {
        const y = (((s.y - frame * speed * s.spd * 0.045) % 100) + 100) % 100;
        const opacity =
          0.2 + 0.8 * (0.5 + Math.sin(frame / 16 + s.tw) / 2) * (0.4 + s.hue * 0.6);
        const color =
          s.hue > 0.88 ? COLORS.cyan : s.hue > 0.74 ? COLORS.purple : "#FFFFFF";
        const big = s.size > 3.4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: color,
              opacity,
              boxShadow: big ? `0 0 ${s.size * 4}px ${color}` : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Nebula: React.FC<{ accent?: string; accent2?: string }> = ({
  accent = COLORS.purple,
  accent2 = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 60;
  const drift2 = Math.cos(frame / 110) * 80;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          left: -500 + drift,
          top: -350 + drift2 * 0.5,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}30 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          right: -650 - drift2,
          bottom: -450 + drift,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent2}26 0%, transparent 65%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 55%, rgba(2,2,10,0.6) 100%)",
      pointerEvents: "none",
    }}
  />
);

export const SpaceBg: React.FC<{
  accent?: string;
  accent2?: string;
  starSpeed?: number;
}> = ({ accent, accent2, starSpeed = 1 }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDeep} 0%, ${COLORS.bg} 40%, #0d0d24 100%)`,
      }}
    />
    <Nebula accent={accent} accent2={accent2} />
    <Starfield speed={starSpeed} />
  </AbsoluteFill>
);

/* ---------- Device mockups ---------- */

export const PhoneFrame: React.FC<{
  src: string;
  width: number;
  glow?: string;
  style?: React.CSSProperties;
}> = ({ src, width, glow = COLORS.cyan, style }) => {
  const pad = width * 0.03;
  const radius = width * 0.16;
  return (
    <div
      style={{
        width,
        aspectRatio: "9 / 19.2",
        borderRadius: radius,
        background: "linear-gradient(160deg, #23233a 0%, #0c0c16 60%)",
        padding: pad,
        boxShadow: `0 ${width * 0.1}px ${width * 0.35}px rgba(0,0,0,0.65), 0 0 ${
          width * 0.45
        }px ${glow}2e`,
        border: "1px solid rgba(255,255,255,0.16)",
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius - pad,
          overflow: "hidden",
          position: "relative",
          background: "#000",
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 28%, transparent 48%)",
          }}
        />
      </div>
    </div>
  );
};

export const BrowserFrame: React.FC<{
  src: string;
  url: string;
  width: number;
  glow?: string;
  style?: React.CSSProperties;
}> = ({ src, url, width, glow = COLORS.cyan, style }) => {
  const bar = width * 0.05;
  return (
    <div
      style={{
        width,
        borderRadius: width * 0.018,
        overflow: "hidden",
        background: "#141425",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: `0 ${width * 0.04}px ${width * 0.12}px rgba(0,0,0,0.6), 0 0 ${
          width * 0.18
        }px ${glow}30`,
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          display: "flex",
          alignItems: "center",
          gap: bar * 0.22,
          padding: `0 ${bar * 0.45}px`,
          background: "linear-gradient(180deg, #1d1d33, #141425)",
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div
            key={c}
            style={{
              width: bar * 0.26,
              height: bar * 0.26,
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            marginLeft: bar * 0.4,
            height: bar * 0.56,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.dim,
            fontFamily: FONT_DISPLAY,
            fontSize: bar * 0.3,
            letterSpacing: "0.06em",
          }}
        >
          {url}
        </div>
      </div>
      <Img src={src} style={{ width: "100%", display: "block" }} />
    </div>
  );
};

/* ---------- Typography & UI ---------- */

export const GradientText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <span
    style={{
      background: `linear-gradient(100deg, ${COLORS.cyan} 0%, ${COLORS.purple} 50%, ${COLORS.pink} 100%)`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      ...style,
    }}
  >
    {children}
  </span>
);

export const Chip: React.FC<{
  children: React.ReactNode;
  accent?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, accent = COLORS.cyan, size = 30, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.4,
      padding: `${size * 0.45}px ${size * 0.9}px`,
      borderRadius: 999,
      border: `2px solid ${accent}66`,
      background: `linear-gradient(120deg, ${accent}30, rgba(10,10,24,0.88))`,
      backdropFilter: "blur(8px)",
      boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
      color: COLORS.white,
      fontFamily: FONT_HE,
      fontWeight: 700,
      fontSize: size,
      direction: "rtl",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <span
      style={{
        width: size * 0.32,
        height: size * 0.32,
        borderRadius: "50%",
        background: accent,
        boxShadow: `0 0 ${size * 0.5}px ${accent}`,
        flexShrink: 0,
      }}
    />
    {children}
  </div>
);

/** Word-by-word spring reveal, RTL */
export const WordsIn: React.FC<{
  text: string;
  delay?: number;
  perWord?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, perWord = 3, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 0.28em",
        fontFamily: FONT_HE,
        color: COLORS.white,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const p = spring({
          frame: frame - delay - i * perWord,
          fps,
          config: { damping: 16, stiffness: 130, mass: 0.7 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 55}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const CountUp: React.FC<{
  to: number;
  delay?: number;
  duration?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, delay = 0, duration = 40, suffix = "", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: duration,
  });
  return (
    <span style={{ fontFamily: FONT_DISPLAY, fontVariantNumeric: "tabular-nums", ...style }}>
      {Math.round(p * to)}
      {suffix}
    </span>
  );
};

/** Pops in with spring scale+fade */
export const Pop: React.FC<{
  delay?: number;
  children: React.ReactNode;
  from?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, from = "up", distance = 70, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 110, mass: 0.8 },
  });
  const off = (1 - p) * distance;
  const transform =
    from === "scale"
      ? `scale(${0.6 + p * 0.4})`
      : from === "up"
      ? `translateY(${off}px)`
      : from === "down"
      ? `translateY(${-off}px)`
      : from === "left"
      ? `translateX(${-off}px)`
      : `translateX(${off}px)`;
  return <div style={{ opacity: p, transform, ...style }}>{children}</div>;
};

/** Fades/scales a whole scene out near its end */
export const SceneShell: React.FC<{
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({ durationInFrames, fadeIn = 8, fadeOut = 10, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = interpolate(
    frame,
    [durationInFrames - fadeOut, durationInFrames],
    [1, 1.04],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};

/** "✓ המשימה הושלמה" stamp */
export const MissionStamp: React.FC<{ delay?: number; size?: number }> = ({
  delay = 0,
  size = 38,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
  });
  return (
    <div
      dir="rtl"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.4,
        padding: `${size * 0.4}px ${size * 0.8}px`,
        borderRadius: size * 0.4,
        border: `3px solid #3DFFA0`,
        color: "#3DFFA0",
        fontFamily: FONT_HE,
        fontWeight: 900,
        fontSize: size,
        background: "rgba(61,255,160,0.08)",
        boxShadow: "0 0 40px rgba(61,255,160,0.25)",
        opacity: p,
        transform: `scale(${0.4 + p * 0.6}) rotate(${(1 - p) * -14 - 4}deg)`,
      }}
    >
      ✓ המשימה הושלמה
    </div>
  );
};
