import { Composition, registerRoot } from "remotion";
import { MyVideo, MY_VIDEO_META } from "./MyVideo";

export const RemotionRoot = () => (
  <>
    <Composition {...MY_VIDEO_META} component={MyVideo} />
  </>
);

registerRoot(RemotionRoot);
