import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_DISPLAY, FONT_HE, REEL } from "./brand";
import {
  Chip,
  CountUp,
  GradientText,
  PhoneFrame,
  Pop,
  SceneShell,
  SpaceBg,
  Vignette,
  WordsIn,
} from "./components";

export const TORI_REEL_META = {
  id: "ToriReel",
  ...REEL,
  durationInFrames: 450,
} as const;

const ORANGE = "#FF9D5C";

const SCREENS = [
  { src: "assets/projects/tori/shot-1.jpeg", label: "האפליקציה של העסק — בכיס של כל לקוח" },
  { src: "assets/projects/tori/shot-2.jpeg", label: "קביעת תור בלחיצה. בלי טלפונים" },
  { src: "assets/projects/tori/shot-3.jpeg", label: "יומן חכם שמנהל את היום שלך" },
  { src: "assets/projects/tori/shot-4.jpeg", label: "כל הלקוחות — מסודרים במקום אחד" },
  { src: "assets/projects/tori/shot-5.jpeg", label: "וגם חנות מוצרים מובנית" },
];
const SCREEN_DUR = 50;

/* Scene 1 — hook */
const Hook: React.FC = () => (
  <SceneShell durationInFrames={90}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", padding: 70, gap: 46 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={ORANGE} size={32}>
          TORI · המוצר שלנו
        </Chip>
      </Pop>
      <WordsIn
        text="מה אם ללקוחות שלך"
        delay={8}
        style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.15 }}
      />
      <div dir="rtl" style={{ textAlign: "center" }}>
        <WordsIn
          text="הייתה אפליקציה"
          delay={16}
          style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.15 }}
        />
        <Pop delay={30} from="scale">
          <GradientText
            style={{
              fontFamily: FONT_HE,
              fontSize: 130,
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            רק שלך?
          </GradientText>
        </Pop>
      </div>
      <Pop delay={48} from="up">
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 40,
            color: COLORS.dim,
            fontWeight: 500,
          }}
        >
          בלי מתחרים. בלי פלטפורמה משותפת.
        </div>
      </Pop>
    </AbsoluteFill>
  </SceneShell>
);

/* Scene 2 — phone showcase */
const Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCREENS.length * SCREEN_DUR;
  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const float = Math.sin(frame / 25) * 12;
  const idx = Math.min(Math.floor(frame / SCREEN_DUR), SCREENS.length - 1);

  return (
    <SceneShell durationInFrames={dur} fadeOut={12}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* phone */}
        <div
          style={{
            transform: `translateY(${(1 - enter) * 700 + float - 60}px) scale(${
              0.92 + enter * 0.08
            })`,
          }}
        >
          <div style={{ position: "relative", width: 640 }}>
            <PhoneFrame src={staticFile(SCREENS[0].src)} width={640} glow={ORANGE} />
            {/* screen swapper stacked above base screenshot */}
            <div
              style={{
                position: "absolute",
                inset: 640 * 0.03,
                borderRadius: 640 * 0.13,
                overflow: "hidden",
              }}
            >
              {SCREENS.map((s, i) => {
                const local = frame - i * SCREEN_DUR;
                const op =
                  i === 0
                    ? interpolate(local, [SCREEN_DUR - 8, SCREEN_DUR], [1, 0], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      })
                    : interpolate(
                        local,
                        [-8, 0, SCREEN_DUR - 8, SCREEN_DUR],
                        [0, 1, 1, i === SCREENS.length - 1 ? 1 : 0],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                      );
                const slide = interpolate(local, [-8, 4], [60, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <Img
                    key={s.src}
                    src={staticFile(s.src)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      opacity: op,
                      transform: `translateY(${i === 0 ? 0 : slide}px)`,
                    }}
                  />
                );
              })}
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
        </div>

        {/* caption per screen */}
        <div
          style={{
            position: "absolute",
            bottom: 250,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {SCREENS.map((s, i) => {
            const local = frame - i * SCREEN_DUR;
            const p = spring({
              frame: local - 4,
              fps,
              config: { damping: 15, stiffness: 130 },
            });
            const out =
              i === SCREENS.length - 1
                ? 1
                : interpolate(local, [SCREEN_DUR - 8, SCREEN_DUR], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
            if (local < -10 || local > SCREEN_DUR + 10) return null;
            return (
              <div
                key={s.src}
                dir="rtl"
                style={{
                  position: "absolute",
                  padding: "26px 50px",
                  borderRadius: 32,
                  background: "rgba(12,12,26,0.78)",
                  border: `2px solid ${ORANGE}50`,
                  backdropFilter: "blur(10px)",
                  fontFamily: FONT_HE,
                  fontWeight: 700,
                  fontSize: 44,
                  color: COLORS.white,
                  whiteSpace: "nowrap",
                  opacity: p * out,
                  transform: `translateY(${(1 - p) * 50}px)`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
                }}
              >
                {s.label}
              </div>
            );
          })}
        </div>

        {/* top line */}
        <Pop
          delay={6}
          from="down"
          style={{ position: "absolute", top: 170, left: 0, right: 0, textAlign: "center" }}
        >
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontWeight: 900,
              fontSize: 56,
              color: COLORS.white,
            }}
          >
            השם שלך. הלוגו שלך.{" "}
            <span style={{ color: ORANGE }}>הצבעים שלך.</span>
          </div>
        </Pop>
      </AbsoluteFill>
    </SceneShell>
  );
};

/* Scene 3 — 72 hours */
const Hours72: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = 0.5 + Math.sin(frame / 9) * 0.5;
  return (
    <SceneShell durationInFrames={70}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
      >
        <Pop delay={0} from="down">
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 52,
              fontWeight: 700,
              color: COLORS.dim,
            }}
          >
            ומהרגע שסגרנו —
          </div>
        </Pop>
        <div style={{ position: "relative" }}>
          <CountUp
            to={72}
            delay={6}
            duration={30}
            style={{
              fontSize: 430,
              fontWeight: 900,
              lineHeight: 1,
              background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: `drop-shadow(0 0 ${30 + glow * 30}px ${COLORS.purple}66)`,
            }}
          />
        </div>
        <Pop delay={24} from="up">
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.white,
            }}
          >
            שעות. ואת באוויר.
          </div>
        </Pop>
        <Pop delay={36} from="up">
          <Chip accent={COLORS.cyan} size={34} style={{ marginTop: 26 }}>
            App Store · Google Play
          </Chip>
        </Pop>
      </AbsoluteFill>
    </SceneShell>
  );
};

/* Scene 4 — CTA */
const Cta: React.FC = () => (
  <SceneShell durationInFrames={60} fadeOut={6}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 44, padding: 80 }}
    >
      <Pop delay={0} from="scale">
        <div
          style={{
            padding: "40px 70px",
            borderRadius: 44,
            background: "rgba(255,255,255,0.96)",
            boxShadow: `0 0 90px ${ORANGE}55`,
          }}
        >
          <Img src={staticFile("assets/projects/tori/logo.png")} style={{ height: 130 }} />
        </div>
      </Pop>
      <WordsIn
        text="רשימת המתנה חכמה · תזכורות SMS · חנות"
        delay={8}
        perWord={1}
        style={{ fontSize: 38, fontWeight: 500, color: COLORS.dim }}
      />
      <Pop delay={14} from="up">
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 64,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          מסלולים מ־<span style={{ color: ORANGE }}>200 ₪</span> לחודש
        </div>
      </Pop>
      <Pop delay={22} from="up">
        <div
          dir="rtl"
          style={{
            padding: "30px 80px",
            borderRadius: 999,
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
            fontFamily: FONT_HE,
            fontSize: 52,
            fontWeight: 900,
            color: "#0B0B1A",
            boxShadow: `0 0 70px ${COLORS.purple}66`,
          }}
        >
          רוצים לראות איך זה נראה? כתבו "תורים"
        </div>
      </Pop>
      <Pop delay={32} from="up">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: 0.75,
          }}
        >
          <Img src={staticFile("assets/astro-logo-white.png")} style={{ height: 36 }} />
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              color: COLORS.dim,
              letterSpacing: "0.2em",
            }}
          >
            PROJECT
          </span>
        </div>
      </Pop>
    </AbsoluteFill>
  </SceneShell>
);

export const ToriReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={ORANGE} accent2={COLORS.purple} />
      <Sequence from={0} durationInFrames={90}>
        <Hook />
      </Sequence>
      <Sequence from={85} durationInFrames={SCREENS.length * SCREEN_DUR}>
        <Showcase />
      </Sequence>
      <Sequence from={85 + SCREENS.length * SCREEN_DUR - 5} durationInFrames={70}>
        <Hours72 />
      </Sequence>
      <Sequence from={85 + SCREENS.length * SCREEN_DUR + 55} durationInFrames={60}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
