import { React, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import '../css/App.css';
import { ServerHost } from "./AppConfig";
import BlogHeader from "./BlogHeader";
import CategoryComponent from "./CategoryComponent";
import DivRow from "./Common";
import ArchiveContent from "./Content";
import BlogFooter from "./Footer";
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
    <Container fluid className="appContainer">
      <Grid>
        <Grid.Row width={16}> 
          <Grid.Column>
            <BlogHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <CategoryComponent />
            <DivRow />
            <DivRow />
            <DivRow />
            <TagComponent />
          </Grid.Column>
          <Grid.Column width={12}>
            <ArchiveContent response={response} activePage={activePage} pagePrefix={params.pagePrefix} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <BlogFooter />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )

}

