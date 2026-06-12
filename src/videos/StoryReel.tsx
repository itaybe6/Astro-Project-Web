import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
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
import { Mark, OutlineNumber, ProgressDots, Slam } from "./kinetic";

/* ============================================================
   StoryReel — problem → turn → solution kinetic text template
   (same style as ExcelReel, which performed best)
   ============================================================ */

const RED = "#FF6B6B";
const GREEN = "#3DFFA0";

const HOOK_DUR = 105;
const PROBLEM_DUR = 100;
const TURN_DUR = 95;
const SOLUTION_DUR = 95;
const VERDICT_DUR = 90;
const CTA_DUR = 115;

type Beat = { title: string; sub: string };

export type StoryConfig = {
  chip: string;
  chipAccent: string;
  hookTop: string;
  hookSlam: string;
  hookSub: string;
  problems: Beat[];
  turn: string;
  solutions: Beat[];
  verdictTop: string;
  verdictGradient: string;
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;
};

const Hook: React.FC<{ c: StoryConfig }> = ({ c }) => (
  <SceneShell durationInFrames={HOOK_DUR}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 44, padding: 70 }}
    >
      <Pop delay={2} from="down">
        <Chip accent={c.chipAccent} size={30}>
          {c.chip}
        </Chip>
      </Pop>
      <WordsIn
        text={c.hookTop}
        delay={10}
        style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.2 }}
      />
      <Slam delay={26}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 110,
            fontWeight: 900,
            color: RED,
            textAlign: "center",
            lineHeight: 1.15,
            textShadow: "0 0 90px rgba(255,107,107,0.5)",
          }}
        >
          {c.hookSlam}
        </div>
      </Slam>
      <WordsIn
        text={c.hookSub}
        delay={48}
        style={{ fontSize: 44, fontWeight: 700, color: COLORS.dim }}
      />
    </AbsoluteFill>
  </SceneShell>
);

const ProblemScene: React.FC<{ beat: Beat; index: number; total: number }> = ({
  beat,
  index,
  total,
}) => (
  <SceneShell durationInFrames={PROBLEM_DUR} fadeOut={10}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <OutlineNumber
        value={String(index + 1)}
        accent={RED}
        style={{
          top: 120,
          right: index % 2 === 0 ? 40 : undefined,
          left: index % 2 === 1 ? 40 : undefined,
        }}
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
        <Slam delay={4}>
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 82,
              fontWeight: 900,
              color: COLORS.white,
              textAlign: "center",
              lineHeight: 1.35,
              textShadow: `0 0 70px ${RED}38`,
            }}
          >
            {beat.title}
          </div>
        </Slam>
        <WordsIn
          text={beat.sub}
          delay={28}
          perWord={2}
          style={{ fontSize: 50, fontWeight: 700, color: RED }}
        />
      </div>
      <div style={{ position: "absolute", bottom: 210 }}>
        <ProgressDots total={total} current={index} accent={RED} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const TurnScene: React.FC<{ c: StoryConfig }> = ({ c }) => (
  <SceneShell durationInFrames={TURN_DUR} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: 70 }}
    >
      <Slam delay={6}>
        <GradientText
          style={{
            fontFamily: FONT_HE,
            fontSize: 104,
            fontWeight: 900,
            lineHeight: 1.3,
          }}
        >
          <span dir="rtl" style={{ display: "block", textAlign: "center" }}>
            {c.turn}
          </span>
        </GradientText>
      </Slam>
    </AbsoluteFill>
  </SceneShell>
);

const SolutionScene: React.FC<{ beat: Beat; index: number; total: number }> = ({
  beat,
  index,
  total,
}) => (
  <SceneShell durationInFrames={SOLUTION_DUR} fadeOut={10}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
          padding: "0 70px",
        }}
      >
        <Pop delay={2} from="scale">
          <Mark good size={110} />
        </Pop>
        <Slam delay={10}>
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 86,
              fontWeight: 900,
              color: COLORS.white,
              textAlign: "center",
              lineHeight: 1.3,
              textShadow: `0 0 70px ${GREEN}38`,
            }}
          >
            {beat.title}
          </div>
        </Slam>
        <WordsIn
          text={beat.sub}
          delay={32}
          perWord={2}
          style={{ fontSize: 46, fontWeight: 700, color: COLORS.dim }}
        />
      </div>
      <div style={{ position: "absolute", bottom: 210 }}>
        <ProgressDots total={total} current={index} accent={GREEN} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);

const VerdictScene: React.FC<{ c: StoryConfig }> = ({ c }) => (
  <SceneShell durationInFrames={VERDICT_DUR} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 30, padding: 70 }}
    >
      <Slam delay={4}>
        <div
          dir="rtl"
          style={{
            fontFamily: FONT_HE,
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {c.verdictTop}
        </div>
      </Slam>
      <Slam delay={22}>
        <GradientText
          style={{ fontFamily: FONT_HE, fontSize: 110, fontWeight: 900, lineHeight: 1.3 }}
        >
          <span dir="rtl" style={{ display: "block", textAlign: "center" }}>
            {c.verdictGradient}
          </span>
        </GradientText>
      </Slam>
    </AbsoluteFill>
  </SceneShell>
);

const CtaScene: React.FC<{ c: StoryConfig }> = ({ c }) => (
  <SceneShell durationInFrames={CTA_DUR} fadeOut={8}>
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 46, padding: 70 }}
    >
      <WordsIn
        text={c.ctaTitle}
        delay={4}
        style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.4 }}
      />
      <WordsIn
        text={c.ctaSub}
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
            fontSize: 54,
            fontWeight: 900,
            color: "#0B0B1A",
            boxShadow: `0 0 80px ${COLORS.purple}66`,
          }}
        >
          {c.ctaButton}
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

export const storyDuration = (c: StoryConfig) =>
  HOOK_DUR +
  c.problems.length * PROBLEM_DUR +
  TURN_DUR +
  c.solutions.length * SOLUTION_DUR +
  VERDICT_DUR +
  CTA_DUR;

export const makeStoryReel = (c: StoryConfig): React.FC => {
  const problemsStart = HOOK_DUR;
  const turnStart = problemsStart + c.problems.length * PROBLEM_DUR;
  const solutionsStart = turnStart + TURN_DUR;
  const verdictStart = solutionsStart + c.solutions.length * SOLUTION_DUR;
  const ctaStart = verdictStart + VERDICT_DUR;

  const Reel: React.FC = () => (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={c.chipAccent} accent2={COLORS.purple} />
      <Sequence from={0} durationInFrames={HOOK_DUR}>
        <Hook c={c} />
      </Sequence>
      {c.problems.map((b, i) => (
        <Sequence
          key={`p${i}`}
          from={problemsStart + i * PROBLEM_DUR}
          durationInFrames={PROBLEM_DUR}
        >
          <ProblemScene beat={b} index={i} total={c.problems.length} />
        </Sequence>
      ))}
      <Sequence from={turnStart - 5} durationInFrames={TURN_DUR}>
        <TurnScene c={c} />
      </Sequence>
      {c.solutions.map((b, i) => (
        <Sequence
          key={`s${i}`}
          from={solutionsStart + i * SOLUTION_DUR - 5}
          durationInFrames={SOLUTION_DUR}
        >
          <SolutionScene beat={b} index={i} total={c.solutions.length} />
        </Sequence>
      ))}
      <Sequence from={verdictStart - 5} durationInFrames={VERDICT_DUR}>
        <VerdictScene c={c} />
      </Sequence>
      <Sequence from={ctaStart - 5} durationInFrames={CTA_DUR}>
        <CtaScene c={c} />
      </Sequence>
      <Vignette />
    </AbsoluteFill>
  );
  return Reel;
};

/* ============================================================
   The three story reels
   ============================================================ */

const DREAM_CONFIG: StoryConfig = {
  chip: "מהרעיון לחנויות",
  chipAccent: COLORS.cyan,
  hookTop: "תמיד חלמת",
  hookSlam: "על אפליקציה משלך?",
  hookSub: "כזאת שמסתובבת לך בראש כבר שנים.",
  problems: [
    { title: "כולם אומרים: \"איזה רעיון מעולה!\"", sub: "אבל אף אחד לא אומר איך." },
    { title: "אתה לא מתכנת.", sub: "ולא אמור להיות." },
    { title: "שמעת שזה עולה מיליונים.", sub: "אז אפילו לא בדקת." },
    { title: "והרעיון? נשאר בראש.", sub: "כבר כמה שנים." },
  ],
  turn: "אצלנו זה עובד אחרת.",
  solutions: [
    { title: "שיחה ראשונה — עלינו", sub: "מספרים לנו את הרעיון. בלי ז'רגון, בלי התחייבות." },
    { title: "תוכנית משימה שקופה", sub: "מחיר ולוח זמנים — לפני שמתחילים." },
    { title: "צוות אחד עד החנויות", sub: "מהשרטוט הראשון ועד App Store ו־Google Play." },
  ],
  verdictTop: "הרעיון שלך.",
  verdictGradient: "המשימה שלנו.",
  ctaTitle: "120+ מערכות ואפליקציות כבר שיגרנו.",
  ctaSub: "עכשיו תורך.",
  ctaButton: "כתבו לנו \"רעיון\"",
};

const TORI_STORY_CONFIG: StoryConfig = {
  chip: "TORI · המוצר שלנו",
  chipAccent: "#FF9D5C",
  hookTop: "הטלפון של העסק",
  hookSlam: "לא מפסיק לצלצל?",
  hookSub: "ככה נראה יום בלי מערכת תורים.",
  problems: [
    { title: "לקוחה מתקשרת באמצע טיפול", sub: "ואתה עם הידיים תפוסות." },
    { title: "\"יש מקום מחר?\" — בשתיים בלילה", sub: "הוואטסאפ לא ישן אף פעם." },
    { title: "לקוח קבע. לקוח שכח.", sub: "ושעה שלמה הלכה לפח." },
    { title: "והיומן? מחברת עם קשקושים", sub: "שרק אתה יודע לקרוא." },
  ],
  turn: "תכירו את Tori.",
  solutions: [
    { title: "הלקוחות קובעים לבד", sub: "באפליקציה ממותגת — עם השם והלוגו שלך." },
    { title: "תזכורות SMS אוטומטיות", sub: "פחות הברזות. הרבה פחות." },
    { title: "רשימת המתנה חכמה", sub: "מישהו ביטל? הבא בתור מקבל הצעה לבד." },
  ],
  verdictTop: "אתה בעבודה.",
  verdictGradient: "היא מנהלת את היומן.",
  ctaTitle: "באוויר תוך 72 שעות. מ־200 ₪ לחודש.",
  ctaSub: "אפליקציה משלך, בחנויות, עם המיתוג שלך.",
  ctaButton: "כתבו לנו \"תורים\"",
};

const GROWTH_CONFIG: StoryConfig = {
  chip: "ידע לבעלי עסקים",
  chipAccent: "#7BE3A8",
  hookTop: "העסק שלך גדל —",
  hookSlam: "והבלאגן גדל איתו?",
  hookSub: "הצלחה לא אמורה להרגיש ככה.",
  problems: [
    { title: "יותר לקוחות. יותר פתקים.", sub: "יותר דברים שנופלים בין הכיסאות." },
    { title: "העובדים שואלים אותך הכול", sub: "כל היום. על הכול." },
    { title: "אתה צוואר הבקבוק", sub: "של העסק של עצמך." },
    { title: "ובסוף היום?", sub: "אין לך מושג מה באמת קרה בו." },
  ],
  turn: "עסק שגדל צריך מערכת שגדלה איתו.",
  solutions: [
    { title: "הכול במקום אחד", sub: "לקוחות, משימות, כסף — מערכת אחת." },
    { title: "כל עובד רואה את שלו", sub: "מסך משלו, הרשאות משלו — בלי לשאול אותך." },
    { title: "ואתה רואה הכול", sub: "דשבורד חי. בזמן אמת. מכל מקום." },
  ],
  verdictTop: "שליטה. שקט.",
  verdictGradient: "וצמיחה.",
  ctaTitle: "בנינו את זה לעשרות עסקים בישראל.",
  ctaSub: "מערכת תפורה בדיוק לעסק שלכם.",
  ctaButton: "כתבו לנו \"מערכת\"",
};

export const DreamReel = makeStoryReel(DREAM_CONFIG);
export const ToriStoryReel = makeStoryReel(TORI_STORY_CONFIG);
export const GrowthReel = makeStoryReel(GROWTH_CONFIG);

export const DREAM_REEL_META = {
  id: "DreamReel",
  ...REEL,
  durationInFrames: storyDuration(DREAM_CONFIG),
} as const;

export const TORI_STORY_REEL_META = {
  id: "ToriStoryReel",
  ...REEL,
  durationInFrames: storyDuration(TORI_STORY_CONFIG),
} as const;

export const GROWTH_REEL_META = {
  id: "GrowthReel",
  ...REEL,
  durationInFrames: storyDuration(GROWTH_CONFIG),
} as const;
