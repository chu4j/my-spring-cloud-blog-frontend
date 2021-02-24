import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Container, Divider, Grid, Icon, Label, Pagination } from "semantic-ui-react";
import { ServerHost } from "./AppConfig";
import DivRow from "./Common";
async function fetchData(pageNumber) {
  const axois = require("axios").default;
  const url = ServerHost + "/v1/api/archive/timeline?page=" + pageNumber;
  console.log("url : " + url);
  return axois.get(url).then((res) => res.data);
}
export default function MyTimeline(props) {
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
              <>
                <span className="timeline-label">
                  {e.time}
                </span>
                &nbsp;&nbsp;&nbsp;
                <a
                  href={"/post/" + e.serialNumber}
                  style={{ fontSize: "1.5em", fontWeight: "900" }}
                >
                  {e.title}
                </a>
                <DivRow />
                <span>
                  <Icon name="linkify" color="blue" />
                  {e.category &&
                    e.category.map((c, index) => (
                      <>
                        <a key={index} href={"/category/" + c.category}>
                          {c.category}
                        </a>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </>
                    ))}
                </span>
                <span>
                  <Icon name="hashtag" color="yellow" />
                  {e.tag &&
                    e.tag.map((t, index) => (
                      <>
                        <a href={"/tag/" + t.tag}>{t.tag}</a>
                        &nbsp; &nbsp;
                      </>
                    ))}
                </span>
                <Divider />
              </>
            ))}

          <DivRow />
          <DivRow />
          <DivRow />
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
