import { React, useEffect, useLayoutEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import "../css/App.css";
import { getHomeUrl, isNumeric } from "../util/Utils";
import CategoryComponent from "./CategoryComponent";
import CategoryTable from "./CategoryTable";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import Posts from "./Posts";
import TagComponent from "./TagComponent";
import TagTable from "./TagTable";
import { BLOG_TITLE, NOT_FOUND_URL, ServerHost } from "./Vars";
async function getArchive(path) {
  const axios = require("axios").default;
  if (null == path) {
    return axios.get(ServerHost + "/v1/api/archive").then((res) => res.data);
  } else {
    return axios.get(path).then((res) => res.data);
  }
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
  const params = getHomeUrl(router, name, pageNumber);
  const history = useHistory();
  let activePage = 1;
  if (null != pageNumber && undefined != pageNumber) {
    !isNumeric(pageNumber) && history.push(NOT_FOUND_URL);
    activePage = pageNumber;
  }
  const [response, setData] = useState({});
  const [width, height] = useWindowSize();
  useEffect(() => {
    getArchive(params.requestUrl)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error(error);
        history.push("/500");
      });
  }, []);

  return (
    <>
      <HeadMeta
        title={params.title ? params.title : BLOG_TITLE}
        description={params.description ? params.description : BLOG_TITLE}
      />
      <DefaultLayout
        CategoryComponent={width > 1200 ? <CategoryComponent /> : null}
        TagComponent={width > 1200 ? <TagComponent /> : null}
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
