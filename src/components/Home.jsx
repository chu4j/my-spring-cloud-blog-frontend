import { React, useEffect, useLayoutEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "../css/App.css";
import CategoryComponent from "./CategoryComponent";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import Posts from "./Posts";
import TagComponent from "./TagComponent";
import { BLOG_TITLE, CATEGORY, ServerHost, TAG } from "./Vars";
async function getArchive(path) {
  const axios = require("axios").default;
  if (null == path) {
    return axios.get(ServerHost + "/v1/api/archive").then((res) => res.data);
  } else {
    return axios.get(path).then((res) => res.data);
  }
}
function countPath(router, name, pageNumber) {
  let requestUrl = "";
  let pagePrefix = "";
  let title = "";
  let description = "";
  const path = router.path;
  switch (path) {
    case "/":
      requestUrl = ServerHost + "/v1/api/archive";
      pagePrefix = "/posts/page/";
      title = BLOG_TITLE;
      description = BLOG_TITLE;
      break;
    case "/category/:name":
      requestUrl = ServerHost + "/v1/api/category/" + name;
      pagePrefix = "/category/" + name + "/page/";
      title = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      description = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/category/:name/page/:pageNumber":
      requestUrl =
        ServerHost + "/v1/api/category/" + name + "?page=" + pageNumber;
      pagePrefix = "/category/" + name + "/page/";
      title = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      description = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/tag/:name":
      requestUrl = ServerHost + "/v1/api/tag/" + name;
      pagePrefix = "/tag/" + name + "/page/";
      title = TAG + "：" + name + "-" + BLOG_TITLE;
      description = TAG + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/tag/:name/page/:pageNumber":
      requestUrl = ServerHost + "/v1/api/tag/" + name + "?page=" + pageNumber;
      pagePrefix = "/tag/" + name + "/page/";
      title = TAG + "：" + name + "-" + BLOG_TITLE;
      description = TAG + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/posts/page/:pageNumber":
      requestUrl = ServerHost + "/v1/api/archive?page=" + pageNumber;
      pagePrefix = "/posts/page/";
      title = BLOG_TITLE;
      description = BLOG_TITLE;
      break;
    default:
      title = BLOG_TITLE;
      description = BLOG_TITLE;
      break;
  }
  return { requestUrl, pagePrefix, title, description };
}
function useWindowSize(props) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
export default function Home() {
  let { name, pageNumber } = useParams();
  const router = useRouteMatch();
  const params = countPath(router, name, pageNumber);
  let activePage = 1;
  if (null != pageNumber && undefined != pageNumber) activePage = pageNumber;
  const [response, setData] = useState({});
  const [width, height] = useWindowSize();
  useEffect(() => {
    getArchive(params.requestUrl).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <>
      <HeadMeta
        title={params.title ? params.title : BLOG_TITLE}
        description={params.description ? params.description : BLOG_TITLE}
      />
      <DefaultLayout
        CategoryComponent={width > 960 ? <CategoryComponent /> : null}
        TagComponent={width > 960 ? <TagComponent /> : null}
        ContentComponent={
          <Posts
            response={response}
            activePage={activePage}
            pagePrefix={params.pagePrefix}
          />
        }
        style={{ margin: 0, padding: 0 }}
      />
    </>
  );
}
