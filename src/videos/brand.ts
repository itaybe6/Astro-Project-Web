import { loadFont as loadHeebo } from "@remotion/google-fonts/Heebo";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const heebo = loadHeebo("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["hebrew", "latin"],
});

const orbitron = loadOrbitron("normal", {
  weights: ["600", "800", "900"],
  subsets: ["latin"],
});

export const FONT_HE = heebo.fontFamily;
export const FONT_DISPLAY = orbitron.fontFamily;

export const COLORS = {
  bg: "#090918",
  bgDeep: "#040410",
  cyan: "#8BE9FF",
  purple: "#BE96FF",
  pink: "#FF8CDC",
  white: "#F4F6FF",
  dim: "rgba(244,246,255,0.65)",
};

export const REEL = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;
