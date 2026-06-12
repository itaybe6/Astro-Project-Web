import { Composition, Still, registerRoot } from "remotion";
import { MyVideo, MY_VIDEO_META } from "./MyVideo";
import { ToriReel, TORI_REEL_META } from "./ToriReel";
import { ShowcaseReel, SHOWCASE_REEL_META } from "./ShowcaseReel";
import { SystemsReel, SYSTEMS_REEL_META } from "./SystemsReel";
import { ProcessReel, PROCESS_REEL_META } from "./ProcessReel";
import { ExcelReel, EXCEL_REEL_META } from "./ExcelReel";
import { VsReel, VS_REEL_META } from "./VsReel";
import { MoonReel, MOON_REEL_META } from "./MoonReel";
import { POST, POSTS } from "./posts";
import {
  DreamReel,
  DREAM_REEL_META,
  ToriStoryReel,
  TORI_STORY_REEL_META,
  GrowthReel,
  GROWTH_REEL_META,
} from "./StoryReel";
import { CAROUSELS, SLIDE, SlideRenderer } from "./carousels";

export const RemotionRoot = () => (
  <>
    <Composition {...TORI_REEL_META} component={ToriReel} />
    <Composition {...SHOWCASE_REEL_META} component={ShowcaseReel} />
    <Composition {...SYSTEMS_REEL_META} component={SystemsReel} />
    <Composition {...PROCESS_REEL_META} component={ProcessReel} />
    <Composition {...EXCEL_REEL_META} component={ExcelReel} />
    <Composition {...VS_REEL_META} component={VsReel} />
    <Composition {...MOON_REEL_META} component={MoonReel} />
    <Composition {...DREAM_REEL_META} component={DreamReel} />
    <Composition {...TORI_STORY_REEL_META} component={ToriStoryReel} />
    <Composition {...GROWTH_REEL_META} component={GrowthReel} />
    {POSTS.map((p) => (
      <Still key={p.id} id={p.id} component={p.component} {...POST} />
    ))}
    {CAROUSELS.flatMap((c) =>
      c.slides.map((_, i) => (
        <Still
          key={`${c.key}-${i}`}
          id={`${c.key}-S${i + 1}`}
          component={() => <SlideRenderer c={c} index={i} />}
          {...SLIDE}
        />
      ))
    )}
    <Composition {...MY_VIDEO_META} component={MyVideo} />
  </>
);

registerRoot(RemotionRoot);
