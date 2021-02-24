import BlogLayout from "./BlogLayout";
import CategoryComponent from "./CategoryComponent";

export default function Categories() {
  return (
    <>
      <BlogLayout ContentComponent={<CategoryComponent />} />
    </>
  );
}
