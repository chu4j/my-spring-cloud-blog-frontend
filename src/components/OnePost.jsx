import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import API from "../data/DataUrl";
import RequestBuilder from "../util/RequestBuilder";
import { isNumeric } from "../util/Utils";
import DefaultLayout from "./DefaultLayout";
import Posts from "./Posts";
import { BLOG_TITLE, NOT_FOUND_URL, ServerHost } from "./Vars";
async function getPost(postId) {
  const axios = require("axios").default;
  const url = new RequestBuilder()
    .setUrl(API.GET_POST_BY_ID_URL)
    .setPathVar(postId)
    .build()
    .toUrlString();
  return axios.get(url).then((res) => res.data);
}
export default function OnePost() {
  let { postId } = useParams();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const history = useHistory();
  useEffect(() => {
    const checkNumberic = isNumeric(postId);
    if (!checkNumberic) {
      history.push(NOT_FOUND_URL);
    }
    getPost(postId).then((data) => {
      let response = {
        list: Array(data),
      };
      setPost(response);
      data && Array(data).forEach((x) => setTitle(x.title));
    });
  }, []);
  const $ = require("jquery");
  $(document).on("click", 'a[href^="#"]', function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 120,
      },
      500
    );
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title + "-" + BLOG_TITLE}</title>
        <meta name="description" content={title} />
      </Helmet>
      <DefaultLayout>
        <Posts response={post} focus />
      </DefaultLayout>
    </>
  );
}
