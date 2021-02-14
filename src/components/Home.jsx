import { React, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import '../css/App.css';
import { ServerHost } from "./AppConfig";
import BlogLayout from "./BlogLayout";
import CategoryComponent from "./CategoryComponent";
import ContentComponent from "./Content";
import TagComponent from "./TagComponent";
async function getArchive(path) {
  const axios = require('axios').default
  if (null == path) {
    return axios.get(ServerHost + "/v1/api/archive")
      .then(
        res => res.data
      )
  }
  else {
    return axios.get(path)
      .then(
        res => res.data
      )
  }
}
function countPath(router, name, pageNumber) {
  let requestUrl = ""
  let pagePrefix = ""
  const path = router.path
  switch (path) {
    case "/":
      requestUrl = ServerHost + "/v1/api/archive"
      pagePrefix = "/posts/page/"
      break;
    case "/category/:name":
      requestUrl = ServerHost + "/v1/api/category/" + name
      pagePrefix = "/category/" + name + "/page/"
      break;
    case "/category/:name/page/:pageNumber":
      requestUrl = ServerHost + "/v1/api/category/" + name + "?page=" + pageNumber
      pagePrefix = "/category/" + name + "/page/"
      break;
    case "/tag/:name":
      requestUrl = ServerHost + "/v1/api/tag/" + name
      pagePrefix = "/tag/" + name + "/page/"
      break;
    case "/tag/:name/page/:pageNumber":
      requestUrl = ServerHost + "/v1/api/tag/" + name + "?page=" + pageNumber
      pagePrefix = "/tag/" + name + "/page/"
      break;
    case "/posts/page/:pageNumber":
      requestUrl = ServerHost + "/v1/api/archive?page=" + pageNumber
      pagePrefix = "/posts/page/"
      break;
    default:
      break;
  }
  return { requestUrl, pagePrefix }
}
export default function Home() {
  let { name, pageNumber } = useParams()
  const router = useRouteMatch();
  console.log("router:" + JSON.stringify(router) + " type:" + typeof router)
  const params = countPath(router, name, pageNumber)
  console.log("returnPath:" + params.requestUrl)
  let activePage = 1
  if (null != pageNumber && undefined != pageNumber) activePage = pageNumber
  const [response, setData] = useState({})
  useEffect(() => {
    getArchive(params.requestUrl)
      .then(res => {
        setData(res)
      })
  }, [])
  return (
    <BlogLayout
      CategoryComponent={<CategoryComponent />}
      TagComponent={<TagComponent />}
      ContentComponent={
        <ContentComponent response={response} activePage={activePage} pagePrefix={params.pagePrefix}
        />}
    />
  )

}

