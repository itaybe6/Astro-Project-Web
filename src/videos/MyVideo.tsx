import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const MY_VIDEO_META = {
  id: "MyVideo",
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 90,
} as const;

export const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 30], [0.95, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090918",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#8BE9FF",
          }}
        >
          ASTRO PROJECT
        </h1>
        <p
          style={{
            margin: "24px 0 0",
            fontSize: 36,
            color: "#BE96FF",
          }}
        >
          מעולם אחר
        </p>
      </div>
    </AbsoluteFill>
  );
};
