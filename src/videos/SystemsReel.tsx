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
  BrowserFrame,
  Chip,
  GradientText,
  MissionStamp,
  Pop,
  SceneShell,
  SpaceBg,
  Vignette,
  WordsIn,
} from "./components";

export const SYSTEMS_REEL_META = {
  id: "SystemsReel",
  ...REEL,
  durationInFrames: 470,
} as const;

type SystemSeg = {
  name: string;
  code: string;
  tagline: string;
  chips: [string, string];
  url: string;
  shots: [string, string];
  accent: string;
};

const SYSTEMS: SystemSeg[] = [
  {
    name: "KERUR DAN",
    code: "תיק משימה WEB-06",
    tagline: "מהזמנה ועד אספקה — עסק שלם במערכת אחת",
    chips: ["סידור משאית בתלת־ממד", "עוזר AI מובנה"],
    url: "kerurdan.online",
    shots: ["assets/projects/kerur-dan/shot-1.png", "assets/projects/kerur-dan/shot-2.png"],
    accent: COLORS.cyan,
  },
  {
    name: "SPE",
    code: "תיק משימה WEB-02",
    tagline: "ארבע תוכנות יצאו לפנסיה. נשארה אחת",
    chips: ["חשבוניות בלחיצה", "0 הקלדות כפולות"],
    url: "app.shitrit-pereg.com",
    shots: ["assets/projects/spe/shot-1.jpeg", "assets/projects/spe/shot-2.jpeg"],
    accent: "#7BE3A8",
  },
  {
    name: "ASH CLEANING",
    code: "תיק משימה WEB-04",
    tagline: "סידורי עבודה שנוצרים לבד — והשטח מדווח בצילום",
    chips: ["צילום קבלות מהשטח", "פורטל אישי לכל לקוח"],
    url: "ash-cleaning.co.il",
    shots: [
      "assets/projects/ash-cleaning/shot-1.jpeg",
      "assets/projects/ash-cleaning/shot-2.jpeg",
    ],
    accent: COLORS.purple,
  },
];

const SEG = 95;

/* Scene 1 — hook */
const Hook: React.FC = () => (
  <SceneShell durationInFrames={95}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 44, padding: 70 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={COLORS.pink} size={30}>
          WEB MISSIONS
        </Chip>
      </Pop>
      <WordsIn
        text="העסק שלך עדיין מתנהל"
        delay={8}
        style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.15 }}
      />
      <WordsIn
        text="באקסל ובווטסאפ?"
        delay={20}
        style={{ fontSize: 102, fontWeight: 900, lineHeight: 1.15, color: COLORS.pink }}
      />
      <Pop delay={42} from="scale">
        <GradientText
          style={{
            fontFamily: FONT_HE,
            fontSize: 66,
            fontWeight: 900,
            lineHeight: 1.4,
          }}
        >
          <span dir="rtl">יש דרך מעולם אחר.</span>
        </GradientText>
      </Pop>
    </AbsoluteFill>
  </SceneShell>
);

/* Scene 2 — system segments */
const SystemSegment: React.FC<{ seg: SystemSeg }> = ({ seg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pA = spring({ frame: frame - 4, fps, config: { damping: 18, stiffness: 80 } });
  const pB = spring({ frame: frame - 16, fps, config: { damping: 18, stiffness: 80 } });
  const pan = interpolate(frame, [0, SEG], [40, -40]);

  return (
    <SceneShell durationInFrames={SEG} fadeOut={10}>
      <AbsoluteFill>
        {/* header */}
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <Pop delay={2} from="down">
            <Chip accent={seg.accent} size={27}>
              {seg.code}
            </Chip>
          </Pop>
          <Pop delay={8} from="down">
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 84,
                fontWeight: 900,
                color: COLORS.white,
                letterSpacing: "0.05em",
                textShadow: `0 0 50px ${seg.accent}66`,
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              {seg.name}
            </div>
          </Pop>
          <WordsIn
            text={seg.tagline}
            delay={13}
            perWord={2}
            style={{ fontSize: 42, fontWeight: 700, padding: "0 80px" }}
          />
        </div>

        {/* dashboards */}
        <div style={{ position: "absolute", top: 640, left: 0, right: 0, bottom: 0 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              opacity: pA,
              transform: `translateX(calc(-50% + ${pan}px)) translateY(${
                (1 - pA) * 300
              }px) perspective(2200px) rotateX(8deg) rotateY(-5deg)`,
            }}
          >
            <BrowserFrame
              src={staticFile(seg.shots[0])}
              url={seg.url}
              width={1320}
              glow={seg.accent}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 380,
              opacity: pB,
              transform: `translateX(calc(-50% + ${-pan * 1.4}px)) translateY(${
                (1 - pB) * 300
              }px) perspective(2200px) rotateX(6deg) rotateY(6deg) scale(0.82)`,
            }}
          >
            <BrowserFrame
              src={staticFile(seg.shots[1])}
              url={seg.url}
              width={1320}
              glow={seg.accent}
            />
          </div>
        </div>

        {/* chips + stamp */}
        <div
          style={{
            position: "absolute",
            bottom: 175,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          <div style={{ display: "flex", gap: 26 }}>
            {seg.chips.map((c, i) => (
              <Pop key={c} delay={26 + i * 8} from="up">
                <Chip accent={seg.accent} size={31}>
                  {c}
                </Chip>
              </Pop>
            ))}
          </div>
          <MissionStamp delay={48} size={36} />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

/* Scene 3 — CTA */
const Cta: React.FC = () => (
  <SceneShell durationInFrames={90} fadeOut={6}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 48, padding: 70 }}
    >
      <Pop delay={2} from="scale">
        <Img
          src={staticFile("assets/astro-logo-white.png")}
          style={{ width: 600, filter: `drop-shadow(0 0 35px ${COLORS.cyan}50)` }}
        />
      </Pop>
      <WordsIn
        text="מערכות · אתרים · אפליקציות"
        delay={14}
        style={{ fontSize: 54, fontWeight: 700, color: COLORS.dim }}
      />
      <Pop delay={24} from="up">
        <GradientText
          style={{ fontFamily: FONT_HE, fontSize: 96, fontWeight: 900, lineHeight: 1.3 }}
        >
          <span dir="rtl">מעולם אחר.</span>
        </GradientText>
      </Pop>
      <Pop delay={38} from="up">
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
    </AbsoluteFill>
  </SceneShell>
);

export const SystemsReel: React.FC = () => {
  const segStart = 90;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={COLORS.pink} accent2={COLORS.cyan} />
      <Sequence from={0} durationInFrames={95}>
        <Hook />
      </Sequence>
      {SYSTEMS.map((seg, i) => (
        <Sequence key={seg.name} from={segStart + i * SEG} durationInFrames={SEG}>
          <SystemSegment seg={seg} />
        </Sequence>
      ))}
      <Sequence from={segStart + SYSTEMS.length * SEG - 5} durationInFrames={90}>
        <Cta />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
};
