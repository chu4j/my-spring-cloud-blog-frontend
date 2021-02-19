import BlogLayout from "./BlogLayout";
import TagComponent from "./TagComponent";

export default function Tags() {
  return (
    <>
      <BlogLayout ContentComponent={<TagComponent />} />
    </>
  );
}
