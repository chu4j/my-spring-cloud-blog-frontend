import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ServerHost } from "./AppConfig";
import BlogLayout from "./BlogLayout";
import ContentComponent from "./Content";
async function getPost(postId) {
  const axios = require("axios").default;
  const url = ServerHost + "/v1/api/archive/" + postId;
  console.log("request url is " + url);
  return axios.get(url).then((res) => res.data);
}
export default function FocusPostComponent() {
  let { postId } = useParams();
  const [post, setPost] = useState({});
  console.log("post id is " + postId);
  useEffect(() => {
    getPost(postId).then((data) => {
      let response = {
        list: Array(data),
      };
      setPost(response);
      console.log("response data is " + data);
    });
  }, []);
  return (
    <>
      <BlogLayout
        ContentComponent={<ContentComponent response={post} focus />}
      />
    </>
  );
}
