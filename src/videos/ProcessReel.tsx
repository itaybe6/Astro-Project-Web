import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { COLORS, FONT_DISPLAY, FONT_HE, REEL } from "./brand";
import {
  Chip,
  GradientText,
  Pop,
  SceneShell,
  SpaceBg,
  Vignette,
  WordsIn,
} from "./components";
import { LaunchTrack, Slam } from "./kinetic";

export const PROCESS_REEL_META = {
  id: "ProcessReel",
  ...REEL,
  durationInFrames: 1000,
} as const;

const HOOK_DUR = 100;
const STEP_DUR = 150;

type Step = {
  num: string;
  name: string;
  desc: string;
  chips: [string, string];
  accent: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    name: "שיחה",
    desc: "מתחילים בקפה. אתם מספרים — אנחנו מקשיבים.",
    chips: ["בלי ז'רגון", "בלי התחייבות"],
    accent: COLORS.cyan,
  },
  {
    num: "02",
    name: "תכנון",
    desc: "מתרגמים את החלום לתוכנית משימה מסודרת.",
    chips: ["אפיון מסך־מסך", "לוח זמנים שקוף"],
    accent: COLORS.purple,
  },
  {
    num: "03",
    name: "בנייה",
    desc: "הצוות נכנס לעבודה — ואתם רואים הכול תוך כדי.",
    chips: ["עדכון כל שבוע", "בלי הפתעות"],
    accent: COLORS.pink,
  },
  {
    num: "04",
    name: "שיגור",
    desc: "המערכת באוויר. אנחנו ליד הכפתור — ביחד.",
    chips: ["בדיקות מלאות", "יום שיגור מסודר"],
    accent: "#FFC36B",
  },
  {
    num: "05",
    name: "ליווי",
    desc: "וזה לא נגמר בשיגור. נשארים איתכם בחדר הבקרה.",
    chips: ["תמיכה שוטפת", "שדרוגים בהמשך"],
    accent: "#7BE3A8",
  },
];

const Hook: React.FC = () => (
  <SceneShell durationInFrames={HOOK_DUR}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 46, padding: 70 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={COLORS.cyan} size={30}>
          מסלול השיגור
        </Chip>
      </Pop>
      <Slam delay={10}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 100,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          מהרעיון
          <br />
          ועד השיגור
        </div>
      </Slam>
      <WordsIn
        text="5 שלבים. בלי הפתעות. בלי ז'רגון."
        delay={34}
        style={{ fontSize: 50, fontWeight: 700, color: COLORS.dim }}
      />
      <Pop delay={56} from="up">
        <div
          dir="rtl"
          style={{ fontFamily: FONT_HE, fontSize: 40, color: COLORS.cyan, fontWeight: 700 }}
        >
          ככה זה עובד אצלנו ↓
        </div>
      </Pop>
    </AbsoluteFill>
  </SceneShell>
);

const StepScene: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 26) * 8;
  return (
    <SceneShell durationInFrames={STEP_DUR} fadeOut={10}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* giant step number behind */}
        <div
          style={{
            position: "absolute",
            top: 120,
            fontFamily: FONT_DISPLAY,
            fontSize: 560,
            fontWeight: 900,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: `3px ${step.accent}30`,
            transform: `translateY(${float}px)`,
          }}
        >
          {step.num}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            marginTop: 60,
          }}
        >
          <Pop delay={4} from="down">
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 64,
                fontWeight: 900,
                background: `linear-gradient(100deg, ${step.accent}, ${COLORS.white})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "0.2em",
              }}
            >
              STEP {step.num}
            </div>
          </Pop>
          <Slam delay={10}>
            <div
              dir="rtl"
              style={{
                fontFamily: FONT_HE,
                fontSize: 170,
                fontWeight: 900,
                color: COLORS.white,
                lineHeight: 1,
                textShadow: `0 0 80px ${step.accent}55`,
              }}
            >
              {step.name}
            </div>
          </Slam>
          <WordsIn
            text={step.desc}
            delay={26}
            perWord={2}
            style={{ fontSize: 50, fontWeight: 700, padding: "0 80px", lineHeight: 1.45 }}
          />
          <div style={{ display: "flex", gap: 24, marginTop: 10 }}>
            {step.chips.map((c, i) => (
              <Pop key={c} delay={48 + i * 9} from="up">
                <Chip accent={step.accent} size={32}>
                  {c}
                </Chip>
              </Pop>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

/** Persistent launch track over all steps */
const TrackLayer: React.FC = () => {
  const frame = useCurrentFrame(); // starts at steps start
  const total = STEPS.length * STEP_DUR;
  const progress = interpolate(frame, [0, total - 20], [0.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const idx = Math.min(Math.floor(frame / STEP_DUR), STEPS.length - 1);
  const opacity = interpolate(frame, [0, 15, total - 12, total], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", opacity }}>
      <div style={{ marginBottom: 200 }}>
        <LaunchTrack progress={progress} steps={STEPS.length} accent={STEPS[idx].accent} />
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => (
  <SceneShell durationInFrames={155} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 50, padding: 70 }}
    >
      <Slam delay={4}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 110,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          מוכנים
          <br />
          <GradientText>לשלב 01?</GradientText>
        </div>
      </Slam>
      <WordsIn
        text="השיחה הראשונה לא עולה כלום — ושווה הרבה."
        delay={26}
        style={{ fontSize: 44, fontWeight: 500, color: COLORS.dim }}
      />
      <Pop delay={42} from="up">
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
            boxShadow: `0 0 80px ${COLORS.purple}66`,
          }}
        >
          מתחילים בשיחה — לינק בביו
        </div>
      </Pop>
      <Pop delay={56} from="up">
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: 0.8 }}>
          <Img src={staticFile("assets/astro-logo-white.png")} style={{ height: 38 }} />
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 25,
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

export const ProcessReel: React.FC = () => {
  const stepsStart = HOOK_DUR;
  const stepsEnd = stepsStart + STEPS.length * STEP_DUR;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={COLORS.purple} accent2={COLORS.cyan} />
      <Sequence from={0} durationInFrames={HOOK_DUR}>
        <Hook />
      </Sequence>
      {STEPS.map((s, i) => (
        <Sequence key={s.num} from={stepsStart + i * STEP_DUR} durationInFrames={STEP_DUR}>
          <StepScene step={s} index={i} />
        </Sequence>
      ))}
      <Sequence from={stepsStart} durationInFrames={STEPS.length * STEP_DUR}>
        <TrackLayer />
      </Sequence>
      <Sequence from={stepsEnd - 5} durationInFrames={155}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
