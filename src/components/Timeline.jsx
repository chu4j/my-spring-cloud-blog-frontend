import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useHistory, useParams } from "react-router-dom";
import { Container, Grid, Icon, Pagination, Table } from "semantic-ui-react";
import { ApiGet } from "../data/ApiGet";
import AnimationLayout from "./AnimationLayout";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import { BLOG_TITLE, POSTS, TIMELINE_API_URL } from "./Vars";

export default function Timeline(props) {
  let { pageNumber } = useParams();
  pageNumber = pageNumber ? pageNumber : 1;
  const [data, setDataState] = useState([]);
  const [show, setShow] = useState(false);
  const url = TIMELINE_API_URL + "?page=" + pageNumber;
  useEffect(() => {
    ApiGet(url).then((res) => {
      setDataState(res);
      setShow(true);
    });
  }, []);
  const history = useHistory();
  const handlerPageChange = (e, { activePage }) => {
    const url = "/posts/timeline/page/" + activePage;
    history.push(url);
  };
  const timelineContent = (
    <>
      <AnimationLayout isShow={show}>
        <Container className="timeline-container">
          <HeadMeta title={POSTS + "-" + BLOG_TITLE} />
          <Table selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Icon name="bookmark" style={{ color: "#52C75F" }} />
                  Posts
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.list &&
                data.list.map((e, index) => (
                  <>
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Moment fromNow>{e.time}</Moment>
                        &nbsp;&nbsp;
                        <a
                          href={"/post/" + e.serialNumber}
                          style={{ display: "inline-block", width: "100%" }}
                        >
                          {e.title}
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))}
            </Table.Body>
          </Table>
          <Grid textAlign="center" style={{ marginTop: "4em" }}>
            <Grid.Row columns={1}>
              <Pagination
                totalPages={data.totalPage}
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
      </AnimationLayout>
    </>
  );
  return (
    <>
      {props.isHome ? (
        <>{timelineContent}</>
      ) : (
        <DefaultLayout CenterContent={timelineContent} />
      )}
    </>
  );
}
