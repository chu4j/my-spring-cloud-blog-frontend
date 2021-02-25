import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import Timeline from "./Timeline";
import { BLOG_TITLE, TIMELINE } from "./Vars";
export default function TimelineLayout() {
  return (
    <>
      <HeadMeta title={TIMELINE + "-" + BLOG_TITLE} />
      <DefaultLayout ContentComponent={<Timeline />} />
    </>
  );
}
