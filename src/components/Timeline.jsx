import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Container, Divider, Grid, Pagination } from "semantic-ui-react";
import Spacing from "./Spacing";
import { ServerHost } from "./Vars";
async function fetchData(pageNumber) {
  const axois = require("axios").default;
  const url = ServerHost + "/v1/api/archive/timeline?page=" + pageNumber;
  return axois.get(url).then((res) => res.data);
}
export default function Timeline(props) {
  const [showTimeline, setShowTimeline] = useState(false);
  let { pageNumber } = useParams();
  if (null == pageNumber || undefined == pageNumber) pageNumber = 1;
  const [items, setItem] = useState({});
  useEffect(() => {
    fetchData(pageNumber).then((res) => {
      setItem(res);
    });
    const animate = setTimeout(setShowTimeline(true), 200);
    clearTimeout(animate);
  }, []);
  const history = useHistory();
  const handlerPageChange = (e, { activePage }) => {
    const url = "/posts/timeline/page/" + activePage;
    history.push(url);
  };
  return (
    <>
      <CSSTransition
        in={showTimeline}
        classNames="posts"
        timeout={300}
        unmountOnExit
      >
        <Container className="timeline-container">
          {items.list &&
            items.list.map((e, index) => (
              <div key={index}>
                <span className="timeline-label">{e.time}</span>
                &nbsp;&nbsp;&nbsp;
                <a
                  href={"/post/" + e.serialNumber}
                  className="timeline-post-title"
                >
                  {e.title}
                </a>
                <Divider />
                <Spacing />
              </div>
            ))}

          <Spacing />
          <Spacing />
          <Spacing />
          <Grid textAlign="center">
            <Grid.Row columns={1}>
              <Pagination
                totalPages={items.totalPage}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                activePage={pageNumber}
                onPageChange={handlerPageChange}
              />
            </Grid.Row>
          </Grid>
        </Container>
      </CSSTransition>
    </>
  );
}
