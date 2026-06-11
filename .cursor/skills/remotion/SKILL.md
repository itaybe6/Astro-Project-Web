---
name: remotion
description: >-
  Sets up and works with Remotion (React video creation) in this project.
  Use when the user mentions Remotion, video rendering, remotion studio,
  Composition, staticFile, or wants to create or export MP4 videos from React.
---

# Remotion

## Project layout

```
remotion.config.ts          # entry: src/videos/index.tsx
src/videos/index.tsx        # registerRoot + Composition list
src/videos/MyVideo.tsx      # example composition + MY_VIDEO_META
public/                     # static assets → staticFile('path.png')
```

## Setup (new project)

1. התקנת Remotion
```bash
npm install remotion @remotion/cli @remotion/renderer @remotion/google-fonts
```

2. יצירת קובץ הגדרות — `remotion.config.ts` בשורש:
```ts
import { Config } from "@remotion/cli/config";
Config.setEntryPoint("src/videos/index.tsx");
```

3. קובץ כניסה (`src/videos/index.tsx`):
```tsx
import { registerRoot, Composition } from 'remotion';
import { MyVideo, MY_VIDEO_META } from './MyVideo';

export const RemotionRoot = () => (
  <>
    <Composition {...MY_VIDEO_META} component={MyVideo} />
  </>
);

registerRoot(RemotionRoot);
```

4. `tsconfig.json` — ודא שיש:
```json
"moduleResolution": "bundler"
```
(או `"node16"` — מה שיש כבר בפרויקט)

5. הרצה:
```bash
# פתיחת Studio (תצוגה חיה בדפדפן)
npm run remotion:studio

# רנדור לקובץ mp4
npm run remotion:render
# או:
npx remotion render src/videos/index.tsx MyVideo output.mp4
```

6. תמונות/נכסים — כל תמונה → `public/` ומגישים עם `staticFile('image.png')`.

## Adding a composition

1. Create `src/videos/YourVideo.tsx` with component + exported meta:
```tsx
export const YOUR_VIDEO_META = {
  id: "YourVideo",
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 150,
} as const;
```

2. Register in `src/videos/index.tsx`:
```tsx
<Composition {...YOUR_VIDEO_META} component={YourVideo} />
```

3. Render: `npx remotion render src/videos/index.tsx YourVideo out.mp4`

## Brand tokens (Astro Project)

| Token | Value |
|-------|-------|
| Background | `#090918` |
| Cyan | `#8BE9FF` |
| Purple | `#BE96FF` |
| Pink | `#FF8CDC` |
| Fonts | Orbitron (logo), Rubik/Heebo (Hebrew) via `@remotion/google-fonts` |

## Notes

- Remotion lives in `src/videos/` (TypeScript). The Vite site stays JavaScript elsewhere.
- `@remotion/renderer` is required for CLI render; Studio uses `@remotion/cli`.
- Do not commit large rendered `.mp4` files unless requested.
