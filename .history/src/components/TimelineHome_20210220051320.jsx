import BlogLayout from "./BlogLayout";
import MyTimeline from "./Timeline";

export default function TimelineHome() {
  return (
    <>
      <BlogLayout ContentComponent={<MyTimeline />} />
    </>
  );
}
