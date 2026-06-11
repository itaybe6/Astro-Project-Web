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
import { OutlineNumber, ProgressDots, Slam } from "./kinetic";

export const EXCEL_REEL_META = {
  id: "ExcelReel",
  ...REEL,
  durationInFrames: 1010,
} as const;

const HOOK_DUR = 110;
const SIGN_DUR = 140;

type Sign = {
  title: string;
  sub: string;
  accent: string;
};

const SIGNS: Sign[] = [
  {
    title: "אתם מעתיקים את אותם נתונים ליותר ממקום אחד",
    sub: "כל העתקה = טעות שמחכה לקרות.",
    accent: COLORS.cyan,
  },
  {
    title: "רק אדם אחד יודע איך הקובץ באמת עובד",
    sub: "וכשהוא בחופש? העסק עומד.",
    accent: COLORS.purple,
  },
  {
    title: "לקוח שואל — ואתם מחפשים תשובה בוואטסאפ",
    sub: "היסטוריה של עסק לא אמורה לגור בצ'אט.",
    accent: COLORS.pink,
  },
  {
    title: "סוף החודש = לילה לבן של דוחות",
    sub: "דוח אמור להיווצר בלחיצה. לא בליל שישי.",
    accent: "#FFC36B",
  },
  {
    title: "העסק גדל — והאקסל נהיה איטי ומפחיד",
    sub: "זה הסימן שהכי אסור להתעלם ממנו.",
    accent: "#7BE3A8",
  },
];

const Hook: React.FC = () => (
  <SceneShell durationInFrames={HOOK_DUR}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 44, padding: 70 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={"#7BE3A8"} size={30}>
          ידע לבעלי עסקים
        </Chip>
      </Pop>
      <WordsIn
        text="האקסל של העסק שלך"
        delay={10}
        style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.15 }}
      />
      <Slam delay={26}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 180,
            fontWeight: 900,
            color: "#FF6B6B",
            lineHeight: 1,
            textShadow: "0 0 90px rgba(255,107,107,0.5)",
          }}
        >
          קורס?
        </div>
      </Slam>
      <WordsIn
        text="5 סימנים שהגיע הזמן למערכת אמיתית"
        delay={48}
        style={{ fontSize: 46, fontWeight: 700, color: COLORS.dim }}
      />
    </AbsoluteFill>
  </SceneShell>
);

const SignScene: React.FC<{ sign: Sign; index: number }> = ({ sign, index }) => (
  <SceneShell durationInFrames={SIGN_DUR} fadeOut={10}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <OutlineNumber
        value={String(index + 1)}
        accent={sign.accent}
        style={{ top: 110, right: index % 2 === 0 ? 40 : undefined, left: index % 2 === 1 ? 40 : undefined }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
          padding: "0 70px",
        }}
      >
        <Pop delay={2} from="down">
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 50,
              fontWeight: 900,
              color: sign.accent,
              letterSpacing: "0.25em",
            }}
          >
            {index + 1} / 5
          </div>
        </Pop>
        <Slam delay={8}>
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.white,
              textAlign: "center",
              lineHeight: 1.35,
              textShadow: `0 0 70px ${sign.accent}40`,
            }}
          >
            {sign.title}
          </div>
        </Slam>
        <WordsIn
          text={sign.sub}
          delay={34}
          perWord={2}
          style={{ fontSize: 50, fontWeight: 700, color: sign.accent }}
        />
      </div>
      <div style={{ position: "absolute", bottom: 210 }}>
        <ProgressDots total={5} current={index} accent={sign.accent} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const Verdict: React.FC = () => (
  <SceneShell durationInFrames={95} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: 70 }}
    >
      <WordsIn text="נשמע מוכר?" delay={4} style={{ fontSize: 96, fontWeight: 900 }} />
      <Slam delay={20}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 84,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.35,
            color: COLORS.white,
          }}
        >
          זה לא אתם.
          <br />
          <GradientText>זה הכלי.</GradientText>
        </div>
      </Slam>
    </AbsoluteFill>
  </SceneShell>
);

const Cta: React.FC = () => (
  <SceneShell durationInFrames={110} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 48, padding: 70 }}
    >
      <WordsIn
        text="בנינו עשרות מערכות בדיוק לרגע הזה."
        delay={4}
        style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.4 }}
      />
      <WordsIn
        text="קטנות, גדולות — תפורות לעסק שלכם."
        delay={20}
        style={{ fontSize: 44, fontWeight: 500, color: COLORS.dim }}
      />
      <Pop delay={36} from="up">
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
          כתבו לנו "אקסל" — ונחזור אליכם
        </div>
      </Pop>
      <Pop delay={50} from="up">
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

export const ExcelReel: React.FC = () => {
  const signsStart = HOOK_DUR;
  const signsEnd = signsStart + SIGNS.length * SIGN_DUR;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={"#7BE3A8"} accent2={COLORS.purple} />
      <Sequence from={0} durationInFrames={HOOK_DUR}>
        <Hook />
      </Sequence>
      {SIGNS.map((s, i) => (
        <Sequence key={i} from={signsStart + i * SIGN_DUR} durationInFrames={SIGN_DUR}>
          <SignScene sign={s} index={i} />
        </Sequence>
      ))}
      <Sequence from={signsEnd - 5} durationInFrames={95}>
        <Verdict />
      </Sequence>
      <Sequence from={signsEnd + 85} durationInFrames={110}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
