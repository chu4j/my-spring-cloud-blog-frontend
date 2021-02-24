import { useEffect, useState } from "react";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { useHistory, useParams } from "react-router-dom";
import { Container, Grid, Icon, Pagination } from "semantic-ui-react";
import { ServerHost } from "./AppConfig";
import DivRow from "./Common";
async function fetchData(pageNumber) {
  const axois = require("axios").default;
  const url = ServerHost + "/v1/api/archive/timeline?page=" + pageNumber;
  console.log("url : " + url);
  return axois.get(url).then((res) => res.data);
}
export default function MyTimeline(props) {
  let { pageNumber } = useParams();
  if (null == pageNumber || undefined == pageNumber) pageNumber = 1;
  const [items, setItem] = useState({});
  useEffect(() => {
    fetchData(pageNumber).then((res) => {
      setItem(res);
    });
  }, []);
  const history = useHistory();
  const handlerPageChange = (e, { activePage }) => {
    const url = "/posts/timeline/page/" + activePage;
    history.push(url);
  };
  return (
    <>
      <Container fluid>
        <Timeline>
          {items.list &&
            items.list.map((e, index) => (
              <>
                <TimelineEvent
                  title={""}
                  createdAt={e.time}
                  style={{ fontSize: "1em" }}
                  icon={<Icon name="time" size="big" color="yellow" />}
                  bubbleStyle={{ border: 0 }}
                >
                  <Container fluid textAlign="left">
                    <div>
                      <a
                        href={"/post/" + e.serialNumber}
                        style={{ fontSize: "1.5em", fontWeight: "900" }}
                      >
                        {e.title}
                      </a>
                    </div>
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
                  </Container>
                </TimelineEvent>
              </>
            ))}
        </Timeline>
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
    </>
  );
}
