import CategoryComponent from "./CategoryComponent";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Head";
import { BLOG_TITLE, CATEGORY } from "./Vars";

export default function Categories() {
  return (
    <>
      <HeadMeta
        title={CATEGORY + "-" + BLOG_TITLE}
        description={CATEGORY + "-" + BLOG_TITLE}
      />
      <DefaultLayout ContentComponent={<CategoryComponent />} nonFooter/>
    </>
  );
}
