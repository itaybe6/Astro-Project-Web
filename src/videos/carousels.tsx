import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_HE } from "./brand";
import {
  BrowserFrame,
  Chip,
  GradientText,
  PhoneFrame,
  SpaceBg,
  Vignette,
} from "./components";

export const SLIDE = { width: 1080, height: 1350 } as const;
const RED = "#FF6B6B";
const GREEN = "#3DFFA0";

/* ---------- slide model ---------- */

type CoverSlide = {
  kind: "cover";
  title: React.ReactNode;
  sub: string;
  img: string;
  isPhone?: boolean;
  url?: string;
};
type ProblemSlide = {
  kind: "problem";
  kicker: string;
  title: React.ReactNode;
  bullets: string[];
};
type FeatureSlide = {
  kind: "feature";
  step: string;
  title: string;
  desc: string;
  img: string;
  isPhone?: boolean;
  url?: string;
};
type StatsSlide = {
  kind: "stats";
  title: React.ReactNode;
  stats: { num: string; label: string }[];
};
type CtaSlide = {
  kind: "cta";
  title: React.ReactNode;
  sub: string;
  button: string;
  logo?: string;
};
type CoverTextSlide = {
  kind: "coverText";
  kicker?: string;
  icon: string;
  title: React.ReactNode;
  sub: string;
};
type ValueSlide = {
  kind: "value";
  step: string;
  kicker: string;
  icon: string;
  title: React.ReactNode;
  desc: string;
};
type ChecklistSlide = {
  kind: "checklist";
  kicker: string;
  title: React.ReactNode;
  bullets: string[];
};

export type Slide =
  | CoverSlide
  | ProblemSlide
  | FeatureSlide
  | StatsSlide
  | CtaSlide
  | CoverTextSlide
  | ValueSlide
  | ChecklistSlide;

export type Carousel = {
  key: string;
  code: string;
  accent: string;
  accent2: string;
  handle: string;
  slides: Slide[];
};

/* ---------- shared chrome ---------- */

const Planet: React.FC<{ accent: string }> = ({ accent }) => (
  <>
    <div
      style={{
        position: "absolute",
        bottom: -320,
        left: -280,
        width: 680,
        height: 680,
        borderRadius: "50%",
        background: `radial-gradient(circle at 38% 30%, ${accent}5e 0%, ${accent}1f 38%, #0a0a1c 75%)`,
        boxShadow: `0 0 140px ${accent}30`,
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: -340,
        width: 820,
        height: 190,
        borderRadius: "50%",
        border: `3px solid ${accent}40`,
        transform: "rotate(-18deg)",
      }}
    />
  </>
);

const SlideShell: React.FC<{
  c: Carousel;
  index: number;
  swipe?: boolean;
  children: React.ReactNode;
}> = ({ c, index, swipe = true, children }) => {
  const total = c.slides.length;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <SpaceBg accent={c.accent} accent2={c.accent2} starSpeed={0} />
      <Planet accent={c.accent} />

      {/* header */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 6,
        }}
      >
        <Chip accent={c.accent} size={24}>
          {c.code}
        </Chip>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={staticFile("assets/astro-logo-white.png")} style={{ height: 30 }} />
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 17,
              color: COLORS.dim,
              letterSpacing: "0.22em",
            }}
          >
            PROJECT
          </span>
        </div>
      </div>

      <AbsoluteFill style={{ zIndex: 4 }}>{children}</AbsoluteFill>

      {/* footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px 44px",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 22,
            color: COLORS.dim,
            letterSpacing: "0.12em",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        {/* progress segments */}
        <div style={{ display: "flex", gap: 10 }}>
          {new Array(total).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 40 : 14,
                height: 12,
                borderRadius: 999,
                background: i === index ? c.accent : "rgba(255,255,255,0.2)",
                boxShadow: i === index ? `0 0 16px ${c.accent}` : undefined,
              }}
            />
          ))}
        </div>
        {swipe ? (
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.white,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            החליקו <span style={{ color: c.accent, fontSize: 32 }}>←</span>
          </div>
        ) : (
          <div
            dir="rtl"
            style={{ fontFamily: FONT_HE, fontSize: 26, fontWeight: 700, color: c.accent }}
          >
            {c.handle}
          </div>
        )}
      </div>

      <Vignette />
    </AbsoluteFill>
  );
};

/* ---------- slide renderers ---------- */

const Cover: React.FC<{ c: Carousel; s: CoverSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        padding: "0 70px",
      }}
    >
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 84,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.18,
        }}
      >
        {s.title}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.dim,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {s.sub}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: s.isPhone ? 560 : 620,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {s.isPhone ? (
        <div style={{ transform: "rotate(-4deg)" }}>
          <PhoneFrame src={staticFile(s.img)} width={380} glow={c.accent} />
        </div>
      ) : (
        <BrowserFrame
          src={staticFile(s.img)}
          url={s.url ?? ""}
          width={920}
          glow={c.accent}
          style={{ transform: "perspective(1900px) rotateX(7deg)" }}
        />
      )}
    </div>
  </SlideShell>
);

const Problem: React.FC<{ c: Carousel; s: ProblemSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 200,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "0 80px",
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 30,
          fontWeight: 900,
          color: RED,
          letterSpacing: "0.3em",
        }}
      >
        {s.kicker}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 76,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        {s.title}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 100,
        right: 100,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {s.bullets.map((b, i) => (
        <div
          key={i}
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "28px 36px",
            borderRadius: 26,
            background: "rgba(28,14,18,0.6)",
            border: `1px solid ${RED}3a`,
          }}
        >
          <span
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,90,90,0.2)",
              border: `2px solid ${RED}`,
              color: RED,
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: 28,
            }}
          >
            ✗
          </span>
          <span
            style={{
              fontFamily: FONT_HE,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.3,
            }}
          >
            {b}
          </span>
        </div>
      ))}
    </div>
  </SlideShell>
);

const Feature: React.FC<{ c: Carousel; s: FeatureSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "0 70px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT_DISPLAY,
          fontSize: 26,
          fontWeight: 900,
          color: c.accent,
          letterSpacing: "0.2em",
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `3px solid ${c.accent}`,
            boxShadow: `0 0 22px ${c.accent}66`,
          }}
        >
          {s.step}
        </span>
        WHAT WE BUILT
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {s.title}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 34,
          fontWeight: 500,
          color: COLORS.dim,
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 860,
        }}
      >
        {s.desc}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: s.isPhone ? 500 : 640,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {s.isPhone ? (
        <div style={{ transform: "rotate(3deg)" }}>
          <PhoneFrame src={staticFile(s.img)} width={400} glow={c.accent} />
        </div>
      ) : (
        <BrowserFrame
          src={staticFile(s.img)}
          url={s.url ?? ""}
          width={920}
          glow={c.accent}
          style={{ transform: "perspective(1900px) rotateX(7deg)" }}
        />
      )}
    </div>
  </SlideShell>
);

const Stats: React.FC<{ c: Carousel; s: StatsSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        padding: "0 70px",
      }}
    >
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 76,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        {s.title}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 460,
        left: 90,
        right: 90,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 36,
      }}
    >
      {s.stats.map((st, i) => (
        <div
          key={i}
          style={{
            padding: "50px 30px",
            borderRadius: 34,
            background: "rgba(14,14,30,0.72)",
            border: `2px solid ${c.accent}3a`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 16px 44px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 110,
              fontWeight: 900,
              lineHeight: 1,
              background: `linear-gradient(120deg, ${c.accent}, ${c.accent2})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {st.num}
          </div>
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.white,
              textAlign: "center",
              lineHeight: 1.35,
            }}
          >
            {st.label}
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

const Cta: React.FC<{ c: Carousel; s: CtaSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index} swipe={false}>
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 46,
        padding: "0 80px",
      }}
    >
      {s.logo ? (
        <div
          style={{
            padding: "34px 60px",
            borderRadius: 38,
            background: "rgba(255,255,255,0.96)",
            boxShadow: `0 0 90px ${c.accent}50`,
          }}
        >
          <Img src={staticFile(s.logo)} style={{ height: 120 }} />
        </div>
      ) : null}
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {s.title}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 38,
          fontWeight: 500,
          color: COLORS.dim,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {s.sub}
      </div>
      <div
        dir="rtl"
        style={{
          padding: "30px 78px",
          borderRadius: 999,
          background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
          fontFamily: FONT_HE,
          fontSize: 50,
          fontWeight: 900,
          color: "#0B0B1A",
          boxShadow: `0 0 80px ${COLORS.purple}66`,
        }}
      >
        {s.button}
      </div>
    </div>
  </SlideShell>
);

const IconOrb: React.FC<{ icon: string; accent: string; size?: number }> = ({
  icon,
  accent,
  size = 200,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.48,
      lineHeight: 1,
      background: `radial-gradient(circle at 35% 28%, ${accent}45, rgba(12,12,28,0.92) 70%)`,
      border: `3px solid ${accent}70`,
      boxShadow: `0 0 80px ${accent}45, inset 0 0 40px ${accent}22`,
    }}
  >
    {icon}
  </div>
);

const CoverText: React.FC<{ c: Carousel; s: CoverTextSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 150,
        bottom: 150,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        padding: "0 80px",
      }}
    >
      <IconOrb icon={s.icon} accent={c.accent} size={230} />
      {s.kicker ? (
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 28,
            fontWeight: 900,
            color: c.accent,
            letterSpacing: "0.3em",
          }}
        >
          {s.kicker}
        </div>
      ) : null}
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 84,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.22,
        }}
      >
        {s.title}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 38,
          fontWeight: 500,
          color: COLORS.dim,
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 860,
        }}
      >
        {s.sub}
      </div>
    </div>
  </SlideShell>
);

const Value: React.FC<{ c: Carousel; s: ValueSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 160,
        bottom: 160,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "0 90px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT_DISPLAY,
          fontSize: 26,
          fontWeight: 900,
          color: c.accent,
          letterSpacing: "0.2em",
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `3px solid ${c.accent}`,
            boxShadow: `0 0 22px ${c.accent}66`,
          }}
        >
          {s.step}
        </span>
        {s.kicker}
      </div>
      <IconOrb icon={s.icon} accent={c.accent} />
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 70,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.22,
        }}
      >
        {s.title}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 38,
          fontWeight: 500,
          color: COLORS.dim,
          textAlign: "center",
          lineHeight: 1.55,
          maxWidth: 860,
        }}
      >
        {s.desc}
      </div>
    </div>
  </SlideShell>
);

const Checklist: React.FC<{ c: Carousel; s: ChecklistSlide; index: number }> = ({
  c,
  s,
  index,
}) => (
  <SlideShell c={c} index={index}>
    <div
      style={{
        position: "absolute",
        top: 200,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        padding: "0 80px",
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 30,
          fontWeight: 900,
          color: GREEN,
          letterSpacing: "0.3em",
        }}
      >
        {s.kicker}
      </div>
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 76,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        {s.title}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 100,
        right: 100,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {s.bullets.map((b, i) => (
        <div
          key={i}
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "28px 36px",
            borderRadius: 26,
            background: "rgba(12,26,20,0.6)",
            border: `1px solid ${GREEN}3a`,
          }}
        >
          <span
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(61,255,160,0.18)",
              border: `2px solid ${GREEN}`,
              color: GREEN,
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: 28,
            }}
          >
            ✓
          </span>
          <span
            style={{
              fontFamily: FONT_HE,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.3,
            }}
          >
            {b}
          </span>
        </div>
      ))}
    </div>
  </SlideShell>
);

export const SlideRenderer: React.FC<{ c: Carousel; index: number }> = ({
  c,
  index,
}) => {
  const s = c.slides[index];
  switch (s.kind) {
    case "cover":
      return <Cover c={c} s={s} index={index} />;
    case "problem":
      return <Problem c={c} s={s} index={index} />;
    case "feature":
      return <Feature c={c} s={s} index={index} />;
    case "stats":
      return <Stats c={c} s={s} index={index} />;
    case "cta":
      return <Cta c={c} s={s} index={index} />;
    case "coverText":
      return <CoverText c={c} s={s} index={index} />;
    case "value":
      return <Value c={c} s={s} index={index} />;
    case "checklist":
      return <Checklist c={c} s={s} index={index} />;
  }
};

/* ============================================================
   Carousel configs
   ============================================================ */

export const BRILLIANT_CAROUSEL: Carousel = {
  key: "Brilliant",
  code: "תיק משימה APP-02",
  accent: COLORS.cyan,
  accent2: COLORS.purple,
  handle: "לינק בביו",
  slides: [
    {
      kind: "cover",
      title: (
        <>
          איך הפכנו את שוק היהלומים
          <br />
          <GradientText>לאפליקציה אחת?</GradientText>
        </>
      ),
      sub: "Brilliant — זירת מסחר לתכשיטים, יהלומים ואבנים יקרות.",
      img: "assets/projects/brilliant/shot-1.jpeg",
      isPhone: true,
    },
    {
      kind: "problem",
      kicker: "THE PROBLEM",
      title: <>שוק שמתנהל על אמון — וכולו בטלפונים</>,
      bullets: [
        "עסקאות סגורות בהודעות וואטסאפ",
        "אין דרך לדעת מי סוחר אמיתי",
        "אין מפרט אחיד למוצר יקר ערך",
      ],
    },
    {
      kind: "feature",
      step: "1",
      title: "קטלוג מקצועי עם תעודה לכל פריט",
      desc: "9 קטגוריות — מטבעות, טבעות, יהלומים, שעוני יוקרה ועוד. כל מוצר עם משקל, צבע, ניקיון ותעודה.",
      img: "assets/projects/brilliant/shot-4.jpeg",
      isPhone: true,
    },
    {
      kind: "feature",
      step: "2",
      title: "כל סוחר מאומת — תג בורסה רשמי",
      desc: "אימות זהות לכל משתמש, וחברי בורסה מקבלים תג רשמי. סוף סוף יודעים עם מי סוגרים עסקה.",
      img: "assets/projects/brilliant/shot-3.jpeg",
      isPhone: true,
    },
    {
      kind: "feature",
      step: "3",
      title: "תהליך מודרך להעלאת מוצר",
      desc: "שלב-אחר-שלב פשוט שמלווה את המוכר — בחירת קטגוריה, מפרט, תמונות ופרסום. בלי בלבול.",
      img: "assets/projects/brilliant/shot-6.jpeg",
      isPhone: true,
    },
    {
      kind: "stats",
      title: (
        <>
          התוצאה?{" "}
          <GradientText>זירה אחת. בטוחה.</GradientText>
        </>
      ),
      stats: [
        { num: "9", label: "קטגוריות עם מפרט מלא" },
        { num: "100%", label: "סוחרים מאומתים" },
        { num: "2", label: "חנויות — iPhone ואנדרואיד" },
        { num: "3", label: "כלים מקצועיים מובנים" },
      ],
    },
    {
      kind: "cta",
      title: <>יש לכם רעיון לאפליקציה?</>,
      sub: "מהרעיון ועד החנויות — אנחנו הצוות שלכם.",
      button: 'כתבו לנו "רעיון"',
      logo: "assets/projects/brilliant/logo.png",
    },
  ],
};

export const HOMIE_CAROUSEL: Carousel = {
  key: "Homie",
  code: "תיק משימה APP-03",
  accent: COLORS.pink,
  accent2: COLORS.purple,
  handle: "לינק בביו",
  slides: [
    {
      kind: "cover",
      title: (
        <>
          איך הופכים חיפוש שותפים
          <br />
          <GradientText>למשחק של החלקה?</GradientText>
        </>
      ),
      sub: "Homie — מוצאים את השותף המושלם לדירה.",
      img: "assets/projects/homie/shot-1.png",
      isPhone: true,
    },
    {
      kind: "problem",
      kicker: "THE PROBLEM",
      title: <>למצוא שותף לדירה = סיוט</>,
      bullets: [
        "עשרות הודעות עם אנשים לא מתאימים",
        "פגישות מביכות שמובילות לכלום",
        "ובסוף — הפתעות אחרי שכבר עברת",
      ],
    },
    {
      kind: "feature",
      step: "1",
      title: "ציון התאמה מ־0 עד 100%",
      desc: "עונים על שאלון קצר — והאפליקציה מחשבת התאמה לכל מועמד. יודעים מיד עם מי שווה לדבר.",
      img: "assets/projects/homie/shot-1.png",
      isPhone: true,
    },
    {
      kind: "feature",
      step: "2",
      title: "מחליקים כמו באפליקציית היכרויות",
      desc: "כרטיסים, החלקה, בקשת חיבור — וגם פרופיל מלא לכל שותף. הכול נעים ומהיר.",
      img: "assets/projects/homie/shot-3.png",
      isPhone: true,
    },
    {
      kind: "feature",
      step: "3",
      title: "מפת דירות אינטראקטיבית",
      desc: "כל הדירות הפנויות לפי מיקום, עם תמונות ומחיר. בעלי דירות מפרסמים בקלות עם קוד הצטרפות.",
      img: "assets/projects/homie/shot-4.png",
      isPhone: true,
    },
    {
      kind: "stats",
      title: (
        <>
          התוצאה?{" "}
          <GradientText>פחות מביך. יותר התאמה.</GradientText>
        </>
      ),
      stats: [
        { num: "100%", label: "ציון התאמה מדויק" },
        { num: "10+", label: "שאלות שמכירות אותך" },
        { num: "1", label: "מפה של כל הדירות" },
        { num: "2", label: "חנויות — iPhone ואנדרואיד" },
      ],
    },
    {
      kind: "cta",
      title: <>רעיון שישנה תעשייה?</>,
      sub: "בנינו את Homie מאפס ועד החנויות. בואו נבנה את שלכם.",
      button: 'כתבו לנו "רעיון"',
      logo: "assets/projects/homie/logo.png",
    },
  ],
};

export const KERUR_CAROUSEL: Carousel = {
  key: "KerurDan",
  code: "תיק משימה WEB-06",
  accent: COLORS.cyan,
  accent2: COLORS.pink,
  handle: "לינק בביו",
  slides: [
    {
      kind: "cover",
      title: (
        <>
          איך ניהלנו עסק שלם
          <br />
          <GradientText>במערכת אחת?</GradientText>
        </>
      ),
      sub: "קירור דן — מכירה והובלה של מקררים מקצועיים לכל הארץ.",
      img: "assets/projects/kerur-dan/shot-1.png",
      url: "kerurdan.online",
    },
    {
      kind: "problem",
      kicker: "THE PROBLEM",
      title: <>מאות מוצרים, מחסנים ומובילים — בטלפונים ובאקסל</>,
      bullets: [
        "לידים מהאתר שנופלים בין הכיסאות",
        "מלאי שאף אחד לא יודע מה יש בו",
        "הובלות שמתואמות בשיחות טלפון",
      ],
    },
    {
      kind: "feature",
      step: "1",
      title: "קטלוג ומלאי — לפי מחסן ווריאנט",
      desc: "63 מוצרים עם וריאנטים, מידות ומחירים. המלאי מתעדכן לבד לכל מחסן. סוף לניחושים.",
      img: "assets/projects/kerur-dan/shot-2.png",
      url: "kerurdan.online",
    },
    {
      kind: "feature",
      step: "2",
      title: "לידים והצעות מחיר — זורם לבד",
      desc: "ליד נכנס מהאתר → הצעת מחיר מעוצבת ב-PDF → הזמנה בלחיצה → שיתוף ללקוח ב-WhatsApp.",
      img: "assets/projects/kerur-dan/shot-4.png",
      url: "kerurdan.online",
    },
    {
      kind: "feature",
      step: "3",
      title: "וגם דשבורד חי שמראה הכול",
      desc: "לידים, הזמנות ומלאי בזמן אמת — והכי מגניב: סידור הובלה בתלת־ממד וגוזר AI מובנה.",
      img: "assets/projects/kerur-dan/shot-1.png",
      url: "kerurdan.online",
    },
    {
      kind: "stats",
      title: (
        <>
          התוצאה?{" "}
          <GradientText>עסק שלם. מערכת אחת.</GradientText>
        </>
      ),
      stats: [
        { num: "20+", label: "מסכי מערכת" },
        { num: "3", label: "פורטלים — מנהל, מוביל ולקוח" },
        { num: "3D", label: "סידור משאית בתלת־ממד" },
        { num: "AI", label: "עוזר חכם מובנה" },
      ],
    },
    {
      kind: "cta",
      title: <>העסק שלכם מורכב?</>,
      sub: "בנינו מערכת שמנהלת הכול — מהזמנה ועד אספקה.",
      button: 'כתבו לנו "מערכת"',
      logo: "assets/projects/kerur-dan/logo.png",
    },
  ],
};

/* ============================================================
   Service carousels — about Astro Project itself
   ============================================================ */

export const WHY_CAROUSEL: Carousel = {
  key: "WhyAstro",
  code: "תיק צוות CREW-01",
  accent: COLORS.purple,
  accent2: COLORS.cyan,
  handle: "לינק בביו",
  slides: [
    {
      kind: "coverText",
      icon: "🚀",
      kicker: "WHY ASTRO PROJECT",
      title: (
        <>
          למה לבנות את המוצר
          <br />
          <GradientText>דווקא איתנו?</GradientText>
        </>
      ),
      sub: "4 דברים שתקבלו אצלנו — ולא בטוח שתקבלו בשום מקום אחר.",
    },
    {
      kind: "value",
      step: "1",
      kicker: "WHY ASTRO",
      icon: "🤖",
      title: "הטכנולוגיה הכי מתקדמת שיש",
      desc: "AI, אוטומציות והכלים שהחברות הגדולות בעולם עובדות איתם — נכנסים ישר למוצר שלכם. בלי פשרות.",
    },
    {
      kind: "value",
      step: "2",
      kicker: "WHY ASTRO",
      icon: "🤝",
      title: "יחס אישי — מדברים עם מי שבונה",
      desc: "בלי נציגים ובלי תיווך. אתם מדברים ישירות עם הצוות שמפתח את המוצר שלכם, ומחליטים יחד בכל שלב.",
    },
    {
      kind: "value",
      step: "3",
      kicker: "WHY ASTRO",
      icon: "📲",
      title: "זמינות אמיתית, לא סיסמה",
      desc: "שאלה? בעיה? רעיון חדש באמצע הלילה? אנחנו פה. גם הרבה אחרי שהמוצר כבר באוויר.",
    },
    {
      kind: "value",
      step: "4",
      kicker: "WHY ASTRO",
      icon: "📈",
      title: "מוצר מנצח שמכניס כסף",
      desc: "אנחנו לא בונים 'יפה בשביל יפה'. אנחנו בונים מוצר שעובד, מוכר — וגורם לעסק שלכם להרוויח.",
    },
    {
      kind: "checklist",
      kicker: "THE DEAL",
      title: <>מה מקבלים בשורה התחתונה</>,
      bullets: [
        "מוצר ברמה של החברות הגדולות",
        "צוות שזמין לכם — תמיד",
        "שותף שאכפת לו מהרווח שלכם",
      ],
    },
    {
      kind: "cta",
      title: <>מוכנים להמריא?</>,
      sub: "ספרו לנו על העסק — ונחזור אליכם עם תוכנית.",
      button: 'כתבו לנו "המראה"',
    },
  ],
};

export const HOME_CAROUSEL: Carousel = {
  key: "TechHome",
  code: "תיק צוות CREW-02",
  accent: COLORS.cyan,
  accent2: COLORS.purple,
  handle: "לינק בביו",
  slides: [
    {
      kind: "coverText",
      icon: "🛰️",
      kicker: "AFTER LAUNCH",
      title: (
        <>
          המוצר עלה לאוויר.
          <br />
          <GradientText>ואז... נעלמו לכם?</GradientText>
        </>
      ),
      sub: "ההבדל בין ספק פיתוח לבית טכנולוגי — בפנים.",
    },
    {
      kind: "problem",
      kicker: "SOUNDS FAMILIAR?",
      title: <>ככה זה נגמר אצל רבים</>,
      bullets: [
        "המוצר נמסר — והחברה נעלמה",
        "כל תיקון קטן עולה הון ולוקח שבועות",
        "אין עם מי לדבר כשמשהו נשבר",
      ],
    },
    {
      kind: "value",
      step: "1",
      kicker: "OUR PROMISE",
      icon: "🧭",
      title: "ליווי מהרעיון ועד ההשקה",
      desc: "אפיון, עיצוב, פיתוח והשקה — אתם מעודכנים בכל שלב, רואים התקדמות אמיתית ומחליטים יחד איתנו.",
    },
    {
      kind: "value",
      step: "2",
      kicker: "OUR PROMISE",
      icon: "🛠️",
      title: "תמיכה גם אחרי שהמוצר מוכן",
      desc: "תוספת? שדרוג? תקלה? שאלה? אנחנו נשארים לצידכם. המוצר שלכם אף פעם לא נשאר לבד.",
    },
    {
      kind: "value",
      step: "3",
      kicker: "OUR PROMISE",
      icon: "🌱",
      title: "המוצר גדל יחד עם העסק",
      desc: "העסק מתפתח — והמערכת מתפתחת איתו. פיצ'רים חדשים, מסכים חדשים, יכולות חדשות. בלי להתחיל מאפס.",
    },
    {
      kind: "cta",
      title: <>אנחנו לא ספק. אנחנו בית.</>,
      sub: "בית טכנולוגי לעסק שלכם — זמינות, מקצועיות ויחס אישי.",
      button: 'כתבו לנו "בית"',
    },
  ],
};

export const TECH_CAROUSEL: Carousel = {
  key: "WinningTech",
  code: "תיק צוות CREW-03",
  accent: COLORS.pink,
  accent2: COLORS.cyan,
  handle: "לינק בביו",
  slides: [
    {
      kind: "coverText",
      icon: "⚡",
      kicker: "NEXT-GEN TECH",
      title: (
        <>
          הטכנולוגיה של הגדולים
          <br />
          <GradientText>עכשיו בעסק שלכם</GradientText>
        </>
      ),
      sub: "מה באמת אפשר להכניס היום למוצר שלכם? החליקו ותראו.",
    },
    {
      kind: "value",
      step: "1",
      kicker: "WHAT YOU GET",
      icon: "🤖",
      title: "AI מובנה במוצר",
      desc: "עוזרים חכמים, מענה אוטומטי ללקוחות וניתוח נתונים — עובדים בשבילכם מסביב לשעון.",
    },
    {
      kind: "value",
      step: "2",
      kicker: "WHAT YOU GET",
      icon: "📱",
      title: "אפליקציה בשתי החנויות",
      desc: "iPhone ואנדרואיד — המוצר שלכם בכיס של כל לקוח, עם חוויה מהירה וחלקה.",
    },
    {
      kind: "value",
      step: "3",
      kicker: "WHAT YOU GET",
      icon: "📊",
      title: "מערכת ניהול בזמן אמת",
      desc: "דשבורד שמראה הכול — הזמנות, לידים, מלאי וכסף. בלי אקסל ובלי ניחושים.",
    },
    {
      kind: "value",
      step: "4",
      kicker: "WHAT YOU GET",
      icon: "🔁",
      title: "אוטומציות שחוסכות שעות",
      desc: "ליד נכנס ← הצעת מחיר ← הזמנה ← עדכון ללקוח. הכול קורה לבד, בלי שתיגעו.",
    },
    {
      kind: "stats",
      title: (
        <>
          השורה התחתונה?
          <br />
          <GradientText>עסק שעובד לבד.</GradientText>
        </>
      ),
      stats: [
        { num: "24/7", label: "המוצר עובד גם כשאתם ישנים" },
        { num: "AI", label: "מובנה בכל מוצר שאנחנו בונים" },
        { num: "2", label: "חנויות — iPhone ואנדרואיד" },
        { num: "100%", label: "מותאם בדיוק לעסק שלכם" },
      ],
    },
    {
      kind: "cta",
      title: <>העסק שלכם מוכן לקפיצה?</>,
      sub: "ספרו לנו מה חסר לכם — ונראה לכם מה אפשרי.",
      button: 'כתבו לנו "טכנולוגיה"',
    },
  ],
};

export const CAROUSELS = [
  BRILLIANT_CAROUSEL,
  HOMIE_CAROUSEL,
  KERUR_CAROUSEL,
  WHY_CAROUSEL,
  HOME_CAROUSEL,
  TECH_CAROUSEL,
];
