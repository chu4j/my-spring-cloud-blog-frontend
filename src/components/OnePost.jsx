import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Posts from "./Posts";
import { BLOG_TITLE, ServerHost } from "./Vars";
async function getPost(postId) {
  const axios = require("axios").default;
  const url = ServerHost + "/v1/api/archive/" + postId;
  return axios.get(url).then((res) => res.data);
}
export default function OnePost() {
  let { postId } = useParams();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  useEffect(() => {
    getPost(postId).then((data) => {
      let response = {
        list: Array(data),
      };
      setPost(response);
      Array(data).forEach((x) => setTitle(x.title));
    });
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title + "-" + BLOG_TITLE}</title>
        <meta name="description" content={title} />
      </Helmet>
      <DefaultLayout ContentComponent={<Posts response={post} focus />} />
    </>
  );
}
