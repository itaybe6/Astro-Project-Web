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
  MissionStamp,
  PhoneFrame,
  Pop,
  SceneShell,
  SpaceBg,
  Vignette,
  WordsIn,
} from "./components";

export const SHOWCASE_REEL_META = {
  id: "ShowcaseReel",
  ...REEL,
  durationInFrames: 600,
} as const;

type App = {
  name: string;
  code: string;
  tagline: string;
  accent: string;
  shots: [string, string];
};

const APPS: App[] = [
  {
    name: "TORI",
    code: "תיק משימה SAAS-01",
    tagline: "אפליקציית תורים ממותגת — באוויר תוך 72 שעות",
    accent: "#FF9D5C",
    shots: ["assets/projects/tori/shot-1.jpeg", "assets/projects/tori/shot-3.jpeg"],
  },
  {
    name: "BRILLIANT",
    code: "תיק משימה APP-02",
    tagline: "שוק היהלומים — בכיס. כל סוחר מאומת",
    accent: COLORS.cyan,
    shots: [
      "assets/projects/brilliant/shot-1.jpeg",
      "assets/projects/brilliant/shot-2.jpeg",
    ],
  },
  {
    name: "HOMIE",
    code: "תיק משימה APP-03",
    tagline: "ציון התאמה 0–100% — לשותף המושלם לדירה",
    accent: COLORS.pink,
    shots: ["assets/projects/homie/shot-1.png", "assets/projects/homie/shot-2.png"],
  },
  {
    name: "MOON",
    code: "תיק משימה APP-01",
    tagline: "חתונות ואירועים — בלי כאב ראש",
    accent: COLORS.purple,
    shots: ["assets/projects/moon/shot-1.jpeg", "assets/projects/moon/shot-2.jpeg"],
  },
];

const SEG = 90;

/* Scene 1 — intro */
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 80 } });
  return (
    <SceneShell durationInFrames={85}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 50, padding: 60 }}
      >
        <div
          style={{
            opacity: p,
            transform: `scale(${0.7 + p * 0.3})`,
            filter: `drop-shadow(0 0 40px ${COLORS.cyan}55)`,
          }}
        >
          <Img src={staticFile("assets/astro-logo-white.png")} style={{ width: 720 }} />
        </div>
        <Pop delay={14} from="up">
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 40,
              letterSpacing: "0.55em",
              color: COLORS.cyan,
              marginRight: "-0.55em",
            }}
          >
            PROJECT
          </div>
        </Pop>
        <WordsIn
          text="אתם מביאים את הרעיון. אנחנו משגרים אותו."
          delay={26}
          style={{ fontSize: 58, fontWeight: 900 }}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};

/* Scene 2 — stats */
const STATS = [
  { to: 120, suffix: "+", label: "פרויקטים שוגרו" },
  { to: 87, suffix: "+", label: "לקוחות מרוצים" },
  { to: 9, suffix: "", label: "שנות ניסיון" },
];

const Stats: React.FC = () => (
  <SceneShell durationInFrames={100}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 80 }}
    >
      {STATS.map((s, i) => (
        <Pop key={s.label} delay={6 + i * 14} from={i % 2 === 0 ? "right" : "left"} distance={140}>
          <div
            dir="rtl"
            style={{ display: "flex", alignItems: "baseline", gap: 36 }}
          >
            <CountUp
              to={s.to}
              delay={8 + i * 14}
              duration={34}
              suffix={s.suffix}
              style={{
                fontSize: 190,
                fontWeight: 900,
                background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1,
              }}
            />
            <span
              style={{
                fontFamily: FONT_HE,
                fontSize: 56,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              {s.label}
            </span>
          </div>
        </Pop>
      ))}
    </AbsoluteFill>
  </SceneShell>
);

/* Scene 3 — app segments */
const AppSegment: React.FC<{ app: App }> = ({ app }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const float = Math.sin(frame / 22) * 10;
  const pA = spring({ frame: frame - 4, fps, config: { damping: 17, stiffness: 90 } });
  const pB = spring({ frame: frame - 12, fps, config: { damping: 17, stiffness: 90 } });

  return (
    <SceneShell durationInFrames={SEG} fadeOut={10}>
      <AbsoluteFill>
        {/* header */}
        <div
          style={{
            position: "absolute",
            top: 165,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <Pop delay={2} from="down">
            <Chip accent={app.accent} size={28}>
              {app.code}
            </Chip>
          </Pop>
          <Pop delay={8} from="down">
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 110,
                fontWeight: 900,
                color: COLORS.white,
                letterSpacing: "0.06em",
                textShadow: `0 0 60px ${app.accent}66`,
                lineHeight: 1,
              }}
            >
              {app.name}
            </div>
          </Pop>
          <WordsIn
            text={app.tagline}
            delay={14}
            perWord={2}
            style={{ fontSize: 42, fontWeight: 700, padding: "0 50px" }}
          />
        </div>

        {/* phones */}
        <div
          style={{
            position: "absolute",
            top: 600,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 90 + float,
              opacity: pA,
              transform: `translateY(${(1 - pA) * 500}px) rotate(${-7 + (1 - pA) * -6}deg)`,
            }}
          >
            <PhoneFrame src={staticFile(app.shots[0])} width={470} glow={app.accent} />
          </div>
          <div
            style={{
              position: "absolute",
              right: 86,
              top: 230 - float,
              opacity: pB,
              transform: `translateY(${(1 - pB) * 500}px) rotate(${6 + (1 - pB) * 8}deg)`,
            }}
          >
            <PhoneFrame src={staticFile(app.shots[1])} width={440} glow={app.accent} />
          </div>
        </div>

        {/* stamp */}
        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MissionStamp delay={40} size={40} />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

/* Scene 4 — CTA */
const Cta: React.FC = () => (
  <SceneShell durationInFrames={80} fadeOut={6}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 50, padding: 70 }}
    >
      <WordsIn
        text="יש לכם משימה בשבילנו?"
        delay={4}
        style={{ fontSize: 88, fontWeight: 900 }}
      />
      <Pop delay={18} from="scale">
        <GradientText
          style={{ fontFamily: FONT_HE, fontSize: 110, fontWeight: 900, lineHeight: 1.25 }}
        >
          <span dir="rtl">בואו נשגר אותה.</span>
        </GradientText>
      </Pop>
      <Pop delay={32} from="up">
        <div
          dir="rtl"
          style={{
            padding: "30px 80px",
            borderRadius: 999,
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
            fontFamily: FONT_HE,
            fontSize: 54,
            fontWeight: 900,
            color: "#0B0B1A",
            boxShadow: `0 0 80px ${COLORS.purple}66`,
          }}
        >
          כתבו לנו "שיגור"
        </div>
      </Pop>
      <Pop delay={44} from="up">
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: 0.8 }}>
          <Img src={staticFile("assets/astro-logo-white.png")} style={{ height: 40 }} />
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 26,
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

export const ShowcaseReel: React.FC = () => {
  const montageStart = 165;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill>
          <SpaceBg starSpeed={5} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={90}>
        <AbsoluteFill>
          <SpaceBg starSpeed={1} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={0} durationInFrames={85}>
        <Intro />
      </Sequence>
      <Sequence from={80} durationInFrames={100}>
        <Stats />
      </Sequence>
      {APPS.map((app, i) => (
        <Sequence
          key={app.name}
          from={montageStart + i * SEG}
          durationInFrames={SEG}
        >
          <AppSegment app={app} />
        </Sequence>
      ))}
      <Sequence from={montageStart + APPS.length * SEG - 5} durationInFrames={80}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
