import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Head";
import TagComponent from "./TagComponent";
import { BLOG_TITLE, TAG } from "./Vars";

export default function Tags() {
  return (
    <>
      <HeadMeta
        title={TAG + "-" + BLOG_TITLE}
        description={TAG + "-" + BLOG_TITLE}
      />
      <DefaultLayout ContentComponent={<TagComponent />} nonFooter/>
    </>
  );
}
