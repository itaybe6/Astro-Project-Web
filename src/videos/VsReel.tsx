import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
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
import { Mark, ProgressDots, Slam } from "./kinetic";

export const VS_REEL_META = {
  id: "VsReel",
  ...REEL,
  durationInFrames: 920,
} as const;

const HOOK_DUR = 95;
const INTRO_DUR = 95;
const ROUND_DUR = 130;

type Round = { bad: string; good: string };

const ROUNDS: Round[] = [
  { bad: "הלוגו של מישהו אחר על המסך", good: "הלוגו שלך — על מסך הבית של הלקוח" },
  { bad: "המתחרים שלך באותה אפליקציה", good: "רק אתה. אפס מתחרים" },
  { bad: "הלקוחות שייכים לפלטפורמה", good: "הלקוחות שלך. הנתונים שלך. נקודה" },
  { bad: "תזכורת SMS מ'מערכת תורים'", good: "SMS שיוצא מהשם של העסק שלך" },
];

const RED = "#FF6B6B";
const GREEN = "#3DFFA0";

const Hook: React.FC = () => (
  <SceneShell durationInFrames={HOOK_DUR}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 46, padding: 70 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={"#FF9D5C"} size={30}>
          TORI · המוצר שלנו
        </Chip>
      </Pop>
      <WordsIn
        text="לעסק שלך יש"
        delay={10}
        style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.15 }}
      />
      <Slam delay={24}>
        <GradientText
          style={{ fontFamily: FONT_HE, fontSize: 130, fontWeight: 900, lineHeight: 1.2 }}
        >
          <span dir="rtl">שתי אפשרויות.</span>
        </GradientText>
      </Slam>
      <WordsIn
        text="ורק אחת מהן באמת שלך."
        delay={46}
        style={{ fontSize: 48, fontWeight: 700, color: COLORS.dim }}
      />
    </AbsoluteFill>
  </SceneShell>
);

const Intro: React.FC = () => (
  <SceneShell durationInFrames={INTRO_DUR} fadeOut={10}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 56, padding: 70 }}
    >
      <Pop delay={4} from="right" distance={160}>
        <div
          dir="rtl"
          style={{
            padding: "44px 70px",
            borderRadius: 36,
            border: `3px solid ${RED}55`,
            background: "rgba(30,14,18,0.75)",
            fontFamily: FONT_HE,
            fontSize: 62,
            fontWeight: 900,
            color: "rgba(255,255,255,0.75)",
            transform: "rotate(2deg)",
          }}
        >
          אפליקציה משותפת
        </div>
      </Pop>
      <Slam delay={18}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 110,
            fontWeight: 900,
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.pink})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          VS
        </div>
      </Slam>
      <Pop delay={28} from="left" distance={160}>
        <div
          dir="rtl"
          style={{
            padding: "44px 70px",
            borderRadius: 36,
            border: `3px solid ${GREEN}`,
            background: "rgba(10,26,18,0.8)",
            fontFamily: FONT_HE,
            fontSize: 62,
            fontWeight: 900,
            color: COLORS.white,
            transform: "rotate(-2deg)",
            boxShadow: `0 0 70px ${GREEN}33`,
          }}
        >
          אפליקציה משלך
        </div>
      </Pop>
    </AbsoluteFill>
  </SceneShell>
);

const RoundScene: React.FC<{ round: Round; index: number }> = ({ round, index }) => (
  <SceneShell durationInFrames={ROUND_DUR} fadeOut={10}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 50 }}>
      <Pop delay={2} from="down">
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 44,
            fontWeight: 900,
            color: COLORS.dim,
            letterSpacing: "0.3em",
          }}
        >
          ROUND {index + 1}/4
        </div>
      </Pop>

      <Pop delay={8} from="down" distance={120}>
        <div
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 34,
            maxWidth: 900,
            padding: "40px 54px",
            borderRadius: 36,
            border: `3px solid ${RED}50`,
            background: "rgba(30,14,18,0.72)",
            transform: "rotate(1.5deg)",
          }}
        >
          <Mark good={false} size={70} />
          <div
            style={{
              fontFamily: FONT_HE,
              fontSize: 56,
              fontWeight: 700,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.35,
            }}
          >
            {round.bad}
          </div>
        </div>
      </Pop>

      <Slam delay={26}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 60,
            fontWeight: 900,
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.pink})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          VS
        </div>
      </Slam>

      <Pop delay={36} from="up" distance={120}>
        <div
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 34,
            maxWidth: 900,
            padding: "44px 54px",
            borderRadius: 36,
            border: `3px solid ${GREEN}`,
            background: "rgba(10,26,18,0.85)",
            transform: "rotate(-1.5deg)",
            boxShadow: `0 0 80px ${GREEN}30`,
          }}
        >
          <Mark good size={70} />
          <div
            style={{
              fontFamily: FONT_HE,
              fontSize: 60,
              fontWeight: 900,
              color: COLORS.white,
              lineHeight: 1.35,
            }}
          >
            {round.good}
          </div>
        </div>
      </Pop>

      <div style={{ position: "absolute", bottom: 200 }}>
        <ProgressDots total={4} current={index} accent={GREEN} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const Verdict: React.FC = () => (
  <SceneShell durationInFrames={100} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 44, padding: 70 }}
    >
      <Pop delay={2} from="scale">
        <div
          style={{
            padding: "36px 64px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 0 90px rgba(255,157,92,0.4)",
          }}
        >
          <Img src={staticFile("assets/projects/tori/logo.png")} style={{ height: 120 }} />
        </div>
      </Pop>
      <Slam delay={16}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 80,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          אפליקציה משלך.
          <br />
          <GradientText>באוויר תוך 72 שעות.</GradientText>
        </div>
      </Slam>
    </AbsoluteFill>
  </SceneShell>
);

const Cta: React.FC = () => (
  <SceneShell durationInFrames={115} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 48, padding: 70 }}
    >
      <WordsIn
        text="מסלולים מ־200 ₪ לחודש"
        delay={4}
        style={{ fontSize: 66, fontWeight: 900 }}
      />
      <WordsIn
        text="רוצים לראות איך זה נראה עם הלוגו שלכם?"
        delay={18}
        style={{ fontSize: 46, fontWeight: 500, color: COLORS.dim }}
      />
      <Pop delay={34} from="up">
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
          כתבו לנו "תורים"
        </div>
      </Pop>
      <Pop delay={48} from="up">
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

export const VsReel: React.FC = () => {
  const introStart = HOOK_DUR - 5;
  const roundsStart = introStart + INTRO_DUR;
  const roundsEnd = roundsStart + ROUNDS.length * ROUND_DUR;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={"#FF9D5C"} accent2={GREEN} />
      <Sequence from={0} durationInFrames={HOOK_DUR}>
        <Hook />
      </Sequence>
      <Sequence from={introStart} durationInFrames={INTRO_DUR}>
        <Intro />
      </Sequence>
      {ROUNDS.map((r, i) => (
        <Sequence key={i} from={roundsStart + i * ROUND_DUR} durationInFrames={ROUND_DUR}>
          <RoundScene round={r} index={i} />
        </Sequence>
      ))}
      <Sequence from={roundsEnd - 5} durationInFrames={100}>
        <Verdict />
      </Sequence>
      <Sequence from={roundsEnd + 90} durationInFrames={115}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
