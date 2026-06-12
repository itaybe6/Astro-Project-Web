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
import { Mark } from "./kinetic";

export const POST = { width: 1080, height: 1350 } as const;

/* ---------- shared shell ---------- */

const Planet: React.FC<{ accent?: string }> = ({ accent = COLORS.purple }) => (
  <>
    {/* planet sphere, bottom-left corner */}
    <div
      style={{
        position: "absolute",
        bottom: -340,
        left: -300,
        width: 720,
        height: 720,
        borderRadius: "50%",
        background: `radial-gradient(circle at 38% 30%, ${accent}66 0%, ${accent}22 38%, #0a0a1c 75%)`,
        boxShadow: `0 0 140px ${accent}30`,
      }}
    />
    {/* ring */}
    <div
      style={{
        position: "absolute",
        bottom: -10,
        left: -360,
        width: 860,
        height: 200,
        borderRadius: "50%",
        border: `3px solid ${accent}45`,
        transform: "rotate(-18deg)",
      }}
    />
  </>
);

const STAMP_GREEN = "#3DFFA0";

const Stamp: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 30,
  style,
}) => (
  <div
    dir="rtl"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.4,
      padding: `${size * 0.4}px ${size * 0.8}px`,
      borderRadius: size * 0.4,
      border: `3px solid ${STAMP_GREEN}`,
      color: STAMP_GREEN,
      fontFamily: FONT_HE,
      fontWeight: 900,
      fontSize: size,
      background: "rgba(61,255,160,0.08)",
      boxShadow: "0 0 36px rgba(61,255,160,0.22)",
      transform: "rotate(-3deg)",
      ...style,
    }}
  >
    ✓ המשימה הושלמה
  </div>
);

const PostShell: React.FC<{
  code?: string;
  accent?: string;
  accent2?: string;
  footer?: string;
  children: React.ReactNode;
}> = ({
  code,
  accent = COLORS.purple,
  accent2 = COLORS.cyan,
  footer = "יש לכם משימה בשבילנו? שגרו הודעה",
  children,
}) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <SpaceBg accent={accent} accent2={accent2} starSpeed={0} />
    <Planet accent={accent} />

    {/* header */}
    <div
      style={{
        position: "absolute",
        top: 54,
        left: 64,
        right: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 5,
      }}
    >
      {code ? (
        <Chip accent={accent} size={26}>
          {code}
        </Chip>
      ) : (
        <div />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Img src={staticFile("assets/astro-logo-white.png")} style={{ height: 34 }} />
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 19,
            color: COLORS.dim,
            letterSpacing: "0.22em",
          }}
        >
          PROJECT
        </span>
      </div>
    </div>

    {/* content */}
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
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        paddingBottom: 46,
      }}
    >
      <div
        style={{
          width: 880,
          height: 3,
          borderRadius: 999,
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink}, transparent)`,
          opacity: 0.75,
        }}
      />
      <div
        dir="rtl"
        style={{
          fontFamily: FONT_HE,
          fontSize: 30,
          fontWeight: 700,
          color: COLORS.white,
        }}
      >
        {footer} <span style={{ color: COLORS.cyan }}>· לינק בביו</span>
      </div>
    </div>

    <Vignette />
  </AbsoluteFill>
);

const Title: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 76, style }) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FONT_HE,
      fontSize: size,
      fontWeight: 900,
      color: COLORS.white,
      textAlign: "center",
      lineHeight: 1.25,
      ...style,
    }}
  >
    {children}
  </div>
);

const Sub: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 36,
  style,
}) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FONT_HE,
      fontSize: size,
      fontWeight: 500,
      color: COLORS.dim,
      textAlign: "center",
      lineHeight: 1.5,
      ...style,
    }}
  >
    {children}
  </div>
);

/* ================= POST 01 — TORI ================= */
const TORI_ORANGE = "#FF9D5C";

export const Post01Tori: React.FC = () => (
  <PostShell code="TORI · המוצר שלנו" accent={TORI_ORANGE} footer='רוצים לראות? כתבו "תורים"'>
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 26,
      }}
    >
      <Title size={72}>
        האפליקציה של העסק שלך —
        <br />
        <GradientText>באוויר תוך 72 שעות</GradientText>
      </Title>
      <Sub>אפליקציית תורים ממותגת. רק השם והלוגו שלך.</Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 480,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: "rotate(-4deg)" }}>
        <PhoneFrame
          src={staticFile("assets/projects/tori/shot-1.jpeg")}
          width={360}
          glow={TORI_ORANGE}
        />
      </div>
    </div>
    {/* side chips */}
    <div
      style={{
        position: "absolute",
        top: 560,
        right: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "flex-end",
      }}
    >
      <Chip accent={TORI_ORANGE} size={26}>
        מיתוג מלא שלך
      </Chip>
      <Chip accent={TORI_ORANGE} size={26} style={{ marginRight: 30 }}>
        רשימת המתנה חכמה
      </Chip>
    </div>
    <div
      style={{
        position: "absolute",
        top: 620,
        left: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "flex-start",
      }}
    >
      <Chip accent={TORI_ORANGE} size={26}>
        תזכורות SMS
      </Chip>
      <Chip accent={TORI_ORANGE} size={26} style={{ marginLeft: 30 }}>
        מ־200 ₪ לחודש
      </Chip>
    </div>
  </PostShell>
);

/* ================= POST 02 — SPE ================= */
export const Post02Spe: React.FC = () => (
  <PostShell code="תיק משימה WEB-02" accent="#7BE3A8" footer="נשמע מוכר? דברו איתנו">
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
      <Title size={92}>
        ארבע תוכנות.
        <br />
        <GradientText>מערכת אחת.</GradientText>
      </Title>
      <Sub>
        משימות, חשבוניות, מייל ולקוחות — בלי להעתיק
        <br />
        נתונים ממקום למקום. הכול מתעדכן לבד.
      </Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 600,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BrowserFrame
        src={staticFile("assets/projects/spe/shot-1.jpeg")}
        url="app.shitrit-pereg.com"
        width={900}
        glow="#7BE3A8"
        style={{ transform: "perspective(1800px) rotateX(6deg)" }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        top: 1110,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <Chip accent="#7BE3A8" size={26}>
        0 הקלדות כפולות
      </Chip>
      <Chip accent="#7BE3A8" size={26}>
        עוזר חכם
      </Chip>
      <Stamp size={26} />
    </div>
  </PostShell>
);

/* ================= POST 03 — KERUR DAN ================= */
export const Post03KerurDan: React.FC = () => (
  <PostShell code="תיק משימה WEB-06" accent={COLORS.cyan} footer="רוצים מערכת כזו? דברו איתנו">
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
      <Title size={88}>
        עסק שלם.
        <br />
        <GradientText>מערכת אחת.</GradientText>
      </Title>
      <Sub>
        קירור דן: קטלוג, מלאי, לידים והובלות —
        <br />
        מהזמנה ועד שהמקרר אצל הלקוח.
      </Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 590,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <BrowserFrame
        src={staticFile("assets/projects/kerur-dan/shot-1.png")}
        url="kerurdan.online"
        width={900}
        glow={COLORS.cyan}
        style={{ transform: "perspective(1800px) rotateX(6deg)" }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        top: 1085,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", gap: 22 }}>
        <Chip accent={COLORS.cyan} size={26}>
          סידור משאית בתלת־ממד
        </Chip>
        <Chip accent={COLORS.cyan} size={26}>
          עוזר AI מובנה
        </Chip>
      </div>
      <Stamp size={26} />
    </div>
  </PostShell>
);

/* ================= POST 04 — EXCEL SIGNS ================= */
const EXCEL_SIGNS = [
  "מעתיקים את אותם נתונים ליותר ממקום אחד",
  "רק אדם אחד יודע איך הקובץ עובד",
  "תשובות ללקוחות מחפשים בוואטסאפ",
  "סוף החודש = לילה לבן של דוחות",
  "העסק גדל — והאקסל מאט אתכם",
];

export const Post04Excel: React.FC = () => (
  <PostShell code="ידע לבעלי עסקים" accent="#7BE3A8" footer="נשמע מוכר? דברו איתנו">
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
      }}
    >
      <Title size={66}>
        5 סימנים שהאקסל
        <br />
        <span style={{ color: "#FF6B6B" }}>כבר לא מספיק לעסק שלכם</span>
      </Title>
    </div>
    <div
      style={{
        position: "absolute",
        top: 430,
        left: 90,
        right: 90,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      {EXCEL_SIGNS.map((s, i) => (
        <div
          key={i}
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "26px 34px",
            borderRadius: 28,
            background: "rgba(14,14,30,0.78)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
          }}
        >
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 56,
              fontWeight: 900,
              background: `linear-gradient(120deg, ${COLORS.cyan}, ${COLORS.pink})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              width: 64,
              flexShrink: 0,
              textAlign: "center",
            }}
          >
            {i + 1}
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
            {s}
          </span>
        </div>
      ))}
    </div>
  </PostShell>
);

/* ================= POST 05 — PROCESS ================= */
const PROC_STEPS = [
  { num: "01", name: "שיחה", desc: "מתחילים בקפה. בלי התחייבות", accent: COLORS.cyan },
  { num: "02", name: "תכנון", desc: "החלום הופך לתוכנית משימה", accent: COLORS.purple },
  { num: "03", name: "בנייה", desc: "עדכונים חיים כל שבוע", accent: COLORS.pink },
  { num: "04", name: "שיגור", desc: "המערכת באוויר — ביחד", accent: "#FFC36B" },
  { num: "05", name: "ליווי", desc: "נשארים איתכם בחדר הבקרה", accent: "#7BE3A8" },
];

export const Post05Process: React.FC = () => (
  <PostShell code="מסלול השיגור" accent={COLORS.purple} footer="מוכנים לשלב 01? מתחילים בשיחה">
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <Title size={70}>
        מהרעיון ועד השיגור —
        <br />
        <GradientText>5 שלבים. בלי הפתעות.</GradientText>
      </Title>
    </div>
    <div
      style={{
        position: "absolute",
        top: 420,
        left: 110,
        right: 110,
      }}
    >
      {/* vertical line */}
      <div
        style={{
          position: "absolute",
          top: 30,
          bottom: 30,
          right: 47,
          width: 4,
          borderRadius: 999,
          background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink}, #FFC36B, #7BE3A8)`,
          opacity: 0.6,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {PROC_STEPS.map((s) => (
          <div
            key={s.num}
            dir="rtl"
            style={{ display: "flex", alignItems: "center", gap: 30 }}
          >
            <div
              style={{
                width: 98,
                height: 98,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#10101f",
                border: `3px solid ${s.accent}`,
                boxShadow: `0 0 30px ${s.accent}55`,
                fontFamily: FONT_DISPLAY,
                fontSize: 34,
                fontWeight: 900,
                color: s.accent,
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                flex: 1,
                padding: "20px 32px",
                borderRadius: 26,
                background: "rgba(14,14,30,0.78)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "baseline",
                gap: 22,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HE,
                  fontSize: 46,
                  fontWeight: 900,
                  color: COLORS.white,
                }}
              >
                {s.name}
              </span>
              <span
                style={{
                  fontFamily: FONT_HE,
                  fontSize: 30,
                  fontWeight: 500,
                  color: COLORS.dim,
                }}
              >
                {s.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PostShell>
);

/* ================= POST 06 — HOMIE ================= */
export const Post06Homie: React.FC = () => (
  <PostShell code="תיק משימה APP-03" accent={COLORS.pink} footer="יש לכם רעיון לאפליקציה? דברו איתנו">
    <div
      style={{
        position: "absolute",
        top: 155,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
      }}
    >
      <Title size={70}>השותף המושלם לדירה?</Title>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 130,
          fontWeight: 900,
          background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          lineHeight: 1,
        }}
      >
        0–100%
      </div>
      <Sub>Homie מחשבת ציון התאמה לכל מועמד — עוד לפני שנפגשתם.</Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <div style={{ transform: "rotate(-5deg) translateY(30px)" }}>
        <PhoneFrame
          src={staticFile("assets/projects/homie/shot-1.png")}
          width={320}
          glow={COLORS.pink}
        />
      </div>
      <div style={{ transform: "rotate(4deg)" }}>
        <PhoneFrame
          src={staticFile("assets/projects/homie/shot-2.png")}
          width={320}
          glow={COLORS.purple}
        />
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 1130,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <Chip accent={COLORS.pink} size={25}>
        שאלון קצר ונעים
      </Chip>
      <Chip accent={COLORS.pink} size={25}>
        מפת דירות חיה
      </Chip>
      <Stamp size={25} />
    </div>
  </PostShell>
);

/* ================= POST 07 — VS ================= */
const VS_ROWS: { bad: string; good: string }[] = [
  { bad: "הלוגו של מישהו אחר", good: "הלוגו שלך על מסך הבית" },
  { bad: "מתחרים באותה אפליקציה", good: "רק אתה. אפס מתחרים" },
  { bad: "הלקוחות של הפלטפורמה", good: "הלקוחות שלך. הנתונים שלך" },
  { bad: "SMS מ'מערכת תורים'", good: "SMS מהשם של העסק שלך" },
];

export const Post07Vs: React.FC = () => (
  <PostShell code="TORI · המוצר שלנו" accent={TORI_ORANGE} footer='רוצים אפליקציה משלכם? כתבו "תורים"'>
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Title size={64}>
        אפליקציה משותפת
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            margin: "0 22px",
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.pink})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          VS
        </span>
        אפליקציה משלך
      </Title>
    </div>
    <div
      style={{
        position: "absolute",
        top: 380,
        left: 80,
        right: 80,
        display: "flex",
        flexDirection: "column",
        gap: 26,
      }}
    >
      {VS_ROWS.map((r, i) => (
        <div key={i} dir="rtl" style={{ display: "flex", gap: 22 }}>
          <div
            dir="rtl"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "24px 26px",
              borderRadius: 24,
              border: "2px solid rgba(255,107,107,0.4)",
              background: "rgba(30,14,18,0.72)",
            }}
          >
            <Mark good={false} size={44} />
            <span
              style={{
                fontFamily: FONT_HE,
                fontSize: 29,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.3,
              }}
            >
              {r.bad}
            </span>
          </div>
          <div
            dir="rtl"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "24px 26px",
              borderRadius: 24,
              border: `2px solid ${STAMP_GREEN}`,
              background: "rgba(10,26,18,0.82)",
              boxShadow: `0 0 40px ${STAMP_GREEN}22`,
            }}
          >
            <Mark good size={44} />
            <span
              style={{
                fontFamily: FONT_HE,
                fontSize: 29,
                fontWeight: 900,
                color: COLORS.white,
                lineHeight: 1.3,
              }}
            >
              {r.good}
            </span>
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        top: 1095,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        dir="rtl"
        style={{ fontFamily: FONT_HE, fontSize: 44, fontWeight: 900, color: COLORS.white }}
      >
        Tori — אפליקציה משלך. <GradientText>תוך 72 שעות.</GradientText>
      </div>
    </div>
  </PostShell>
);

/* ================= POST 08 — TEAM ================= */
export const Post08Team: React.FC = () => (
  <PostShell code="הצוות" accent={COLORS.cyan} footer="מתחילים בשיחה — אנחנו על זה">
    <div
      style={{
        position: "absolute",
        top: 165,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Title size={72}>
        הצוות מאחורי
        <br />
        <GradientText>+120 השיגורים</GradientText>
      </Title>
      <Sub>מ־2017. לא ספקים — צוות המשימה שלכם.</Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 545,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 70,
      }}
    >
      {[
        { src: "assets/team/adir-bokobza.png", name: "אדיר בוקובזה", accent: COLORS.cyan },
        { src: "assets/team/itay-ben-yair.png", name: "איתי בן יאיר", accent: COLORS.purple },
      ].map((m) => (
        <div
          key={m.name}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}
        >
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: "50%",
              padding: 8,
              background: `linear-gradient(135deg, ${m.accent}, ${COLORS.pink})`,
              boxShadow: `0 0 70px ${m.accent}44`,
            }}
          >
            <Img
              src={staticFile(m.src)}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            dir="rtl"
            style={{
              fontFamily: FONT_HE,
              fontSize: 42,
              fontWeight: 900,
              color: COLORS.white,
            }}
          >
            {m.name}
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 21,
              letterSpacing: "0.22em",
              color: COLORS.dim,
            }}
          >
            CO-FOUNDER
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        top: 1090,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <Chip accent={COLORS.cyan} size={26}>
        +87 לקוחות
      </Chip>
      <Chip accent={COLORS.purple} size={26}>
        9 שנות ניסיון
      </Chip>
      <Chip accent={COLORS.pink} size={26}>
        99.9% זמינות
      </Chip>
    </div>
  </PostShell>
);

/* ================= POST 09 — HOW LONG ================= */
const TIMES = [
  { name: "אתר תדמית", time: "2–4 שבועות", accent: COLORS.cyan },
  { name: "מערכת ניהול", time: "6–12 שבועות", accent: COLORS.purple },
  { name: "אפליקציית מובייל", time: "8–16 שבועות", accent: COLORS.pink },
  { name: "אפליקציית Tori", time: "72 שעות", accent: "#FF9D5C" },
];

export const Post09Time: React.FC = () => (
  <PostShell code="ידע לבעלי עסקים" accent={COLORS.cyan} footer="רוצים הערכה למשימה שלכם? דברו איתנו">
    <div
      style={{
        position: "absolute",
        top: 160,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Title size={70}>
        כמה זמן באמת לוקח
        <br />
        <GradientText>לבנות מערכת?</GradientText>
      </Title>
      <Sub>התשובה האמיתית — תלוי במשימה. אצלנו יודעים מראש:</Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 500,
        left: 110,
        right: 110,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      {TIMES.map((t) => (
        <div
          key={t.name}
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px 40px",
            borderRadius: 28,
            background: "rgba(14,14,30,0.78)",
            border: `2px solid ${t.accent}45`,
            boxShadow: `0 14px 40px rgba(0,0,0,0.35)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_HE,
              fontSize: 42,
              fontWeight: 900,
              color: COLORS.white,
            }}
          >
            {t.name}
          </span>
          <span
            style={{
              fontFamily: FONT_HE,
              fontSize: 42,
              fontWeight: 900,
              color: t.accent,
            }}
          >
            {t.time}
          </span>
        </div>
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        top: 1115,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Sub size={32}>לוח זמנים שקוף מהיום הראשון. בלי הפתעות.</Sub>
    </div>
  </PostShell>
);

/* ================= POST 10 — MOON ================= */
export const Post10Moon: React.FC = () => (
  <PostShell code="תיק משימה APP-01" accent={COLORS.purple} footer="מכירים זוג שמתחתן? תייגו אותם">
    <div
      style={{
        position: "absolute",
        top: 155,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
      }}
    >
      <Title size={80}>
        חתונה —
        <br />
        <GradientText>בלי כאב ראש.</GradientText>
      </Title>
      <Sub>Moon מנהלת את כל האירוע במקום אחד.</Sub>
    </div>
    <div
      style={{
        position: "absolute",
        top: 530,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <div style={{ transform: "rotate(-5deg) translateY(30px)" }}>
        <PhoneFrame
          src={staticFile("assets/projects/moon/shot-1.jpeg")}
          width={320}
          glow={COLORS.purple}
        />
      </div>
      <div style={{ transform: "rotate(4deg)" }}>
        <PhoneFrame
          src={staticFile("assets/projects/moon/shot-3.jpeg")}
          width={320}
          glow={COLORS.pink}
        />
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 1100,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <Chip accent={COLORS.purple} size={25}>
          קישור אישי לכל אורח
        </Chip>
        <Chip accent={COLORS.purple} size={25}>
          מפת הושבה בגרירה
        </Chip>
        <Chip accent={COLORS.purple} size={25}>
          תזכורות SMS·WhatsApp
        </Chip>
      </div>
    </div>
  </PostShell>
);

export const POSTS = [
  { id: "Post01Tori", component: Post01Tori },
  { id: "Post02Spe", component: Post02Spe },
  { id: "Post03KerurDan", component: Post03KerurDan },
  { id: "Post04Excel", component: Post04Excel },
  { id: "Post05Process", component: Post05Process },
  { id: "Post06Homie", component: Post06Homie },
  { id: "Post07Vs", component: Post07Vs },
  { id: "Post08Team", component: Post08Team },
  { id: "Post09Time", component: Post09Time },
  { id: "Post10Moon", component: Post10Moon },
] as const;
