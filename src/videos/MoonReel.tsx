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
  GradientText,
  MissionStamp,
  PhoneFrame,
  Pop,
  SceneShell,
  SpaceBg,
  Vignette,
  WordsIn,
} from "./components";
import { Slam } from "./kinetic";

export const MOON_REEL_META = {
  id: "MoonReel",
  ...REEL,
  durationInFrames: 900,
} as const;

const PURPLE = COLORS.purple;

const HOOK_DUR = 110;
const INTRO_DUR = 85;
const FEAT_DUR = 165;

type Feat = { src: string; title: string; sub: string };

const FEATS: Feat[] = [
  {
    src: "assets/projects/moon/shot-1.jpeg",
    title: "לוח בקרה חי לאירוע",
    sub: "מי אישר, מי טרם ענה, מי הביא פלוס אחד — בזמן אמת",
  },
  {
    src: "assets/projects/moon/shot-2.jpeg",
    title: "קישור אישי לכל אורח",
    sub: "מאשרים הגעה בלחיצה — בלי להתקין כלום",
  },
  {
    src: "assets/projects/moon/shot-3.jpeg",
    title: "מפת הושבה בגרירה",
    sub: "ותזכורות שיוצאות לבד ב־SMS וב־WhatsApp",
  },
];

const Hook: React.FC = () => (
  <SceneShell durationInFrames={HOOK_DUR}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 44, padding: 70 }}
    >
      <WordsIn
        text="לארגן חתונה?"
        delay={4}
        style={{ fontSize: 110, fontWeight: 900, lineHeight: 1.15 }}
      />
      <Slam delay={22}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 86,
            fontWeight: 900,
            color: PURPLE,
            textAlign: "center",
            lineHeight: 1.3,
            textShadow: `0 0 80px ${PURPLE}55`,
          }}
        >
          זה פרויקט
          <br />
          במשרה מלאה.
        </div>
      </Slam>
      <WordsIn
        text="מאות אורחים · אישורי הגעה · הושבה ברגע האחרון"
        delay={46}
        perWord={2}
        style={{ fontSize: 42, fontWeight: 700, color: COLORS.dim }}
      />
    </AbsoluteFill>
  </SceneShell>
);

const Intro: React.FC = () => (
  <SceneShell durationInFrames={INTRO_DUR} fadeOut={10}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 46, padding: 70 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={PURPLE} size={30}>
          תיק משימה APP-01
        </Chip>
      </Pop>
      <Pop delay={10} from="scale">
        <div
          style={{
            padding: "34px 64px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.96)",
            boxShadow: `0 0 90px ${PURPLE}50`,
          }}
        >
          <Img src={staticFile("assets/projects/moon/logo.png")} style={{ height: 120 }} />
        </div>
      </Pop>
      <WordsIn
        text="כל האירוע — במקום אחד."
        delay={26}
        style={{ fontSize: 64, fontWeight: 900 }}
      />
    </AbsoluteFill>
  </SceneShell>
);

const FeatScene: React.FC<{ feat: Feat; index: number }> = ({ feat, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 2, fps, config: { damping: 17, stiffness: 85 } });
  const float = Math.sin(frame / 24) * 10;
  const side = index % 2 === 0 ? 1 : -1;
  return (
    <SceneShell durationInFrames={FEAT_DUR} fadeOut={12}>
      <AbsoluteFill>
        {/* header */}
        <div
          style={{
            position: "absolute",
            top: 175,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <Pop delay={4} from="down">
            <div
              dir="rtl"
              style={{
                fontFamily: FONT_HE,
                fontSize: 72,
                fontWeight: 900,
                color: COLORS.white,
                textAlign: "center",
                textShadow: `0 0 60px ${PURPLE}55`,
              }}
            >
              {feat.title}
            </div>
          </Pop>
          <WordsIn
            text={feat.sub}
            delay={14}
            perWord={2}
            style={{ fontSize: 42, fontWeight: 700, color: COLORS.dim, padding: "0 70px" }}
          />
        </div>

        {/* phone */}
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 560 + float}px) rotate(${
                side * (4 - enter * 4 + 3)
              }deg)`,
            }}
          >
            <PhoneFrame src={staticFile(feat.src)} width={560} glow={PURPLE} />
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const Result: React.FC = () => (
  <SceneShell durationInFrames={95} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 56, padding: 70 }}
    >
      <MissionStamp delay={6} size={48} />
      <Slam delay={20}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          באוויר ב־App Store
          <br />
          <GradientText>וב־Google Play.</GradientText>
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
        text="מכירים זוג שמתחתן?"
        delay={4}
        style={{ fontSize: 84, fontWeight: 900 }}
      />
      <Pop delay={20} from="up">
        <div
          dir="rtl"
          style={{
            padding: "30px 80px",
            borderRadius: 999,
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
            fontFamily: FONT_HE,
            fontSize: 56,
            fontWeight: 900,
            color: "#0B0B1A",
            boxShadow: `0 0 80px ${COLORS.purple}66`,
          }}
        >
          תייגו אותם בתגובות
        </div>
      </Pop>
      <WordsIn
        text="ואם יש לכם רעיון לאפליקציה — דברו איתנו."
        delay={34}
        style={{ fontSize: 42, fontWeight: 500, color: COLORS.dim }}
      />
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

export const MoonReel: React.FC = () => {
  const introStart = HOOK_DUR - 5;
  const featsStart = introStart + INTRO_DUR;
  const featsEnd = featsStart + FEATS.length * FEAT_DUR;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={PURPLE} accent2={COLORS.pink} />
      <Sequence from={0} durationInFrames={HOOK_DUR}>
        <Hook />
      </Sequence>
      <Sequence from={introStart} durationInFrames={INTRO_DUR}>
        <Intro />
      </Sequence>
      {FEATS.map((f, i) => (
        <Sequence key={f.src} from={featsStart + i * FEAT_DUR} durationInFrames={FEAT_DUR}>
          <FeatScene feat={f} index={i} />
        </Sequence>
      ))}
      <Sequence from={featsEnd - 5} durationInFrames={95}>
        <Result />
      </Sequence>
      <Sequence from={featsEnd + 85} durationInFrames={115}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
