import { React, useEffect, useLayoutEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { getHomeUrl } from "../util/Utils";
import CategoriesWidget from "./CategoriesWidget";
import { BLOG_TITLE } from "./Contansts";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import Posts from "./Posts";
import TagsWidget from "./TagsWidget";
async function getArchive(path) {
  const axios = require("axios").default;
  return axios.get(path).then((res) => res.data);
}
function useWindowSize() {
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
    // !isNumeric(pageNumber) && history.push(NOT_FOUND_URL);
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
        history.push("/error");
      });
  }, []);

  return (
    <>
      <HeadMeta
        title={params.title ? params.title : BLOG_TITLE + "- home page"}
        description={params.description ? params.description : BLOG_TITLE}
      />
      <DefaultLayout
        CategoriesWidget={width > 1200 ? <CategoriesWidget /> : null}
        TagsWidget={width > 1200 ? <TagsWidget /> : null}
        CenterContent={
          <Posts
            response={response}
            activePage={activePage}
            pagePrefix={params.pagePrefix}
          />
        }
        fullWidth={width > 1200 ? false : true}
        division={width > 1200 ? true : false}
        style={{ margin: 0, padding: 0 }}
      />
    </>
  );
}
