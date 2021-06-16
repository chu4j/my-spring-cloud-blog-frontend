import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useHistory, useParams } from "react-router-dom";
import { Container, Grid, Icon, Pagination, Table } from "semantic-ui-react";
import { ApiGet } from "../data/ApiGet";
import API from "../data/DataUrl";
import RequestBuilder from "../util/RequestBuilder";
import AnimationLayout from "./AnimationLayout";
import { BLOG_TITLE, POSTS } from "./Contansts";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";

export default function Timeline(props) {
  let { pageNumber } = useParams();
  pageNumber = pageNumber ? pageNumber : 1;
  const [data, setDataState] = useState([]);
  const [show, setShow] = useState(false);
  // const url = TIMELINE_API_URL + "?page=" + pageNumber;
  const url = new RequestBuilder()
    .setUrl(API.GET_TIMELINE_URL)
    .setPage(pageNumber)
    .setSize(10)
    .build()
    .toUrlString();
  useEffect(() => {
    ApiGet(url).then((res) => {
      setDataState(res);
      setShow(true);
    });
  }, []);
  const history = useHistory();
  const handlerPageChange = (e, { activePage }) => {
    const url = "/timeline/page/" + activePage;
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
                <Table.HeaderCell style={{ fontFamily: "sohne" }}>
                  <Icon name="bookmark" style={{ color: "#169E36" }} />
                  Posts
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.list &&
                data.list.map((e, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Moment fromNow>{e.publishTime}</Moment>
                      &nbsp;&nbsp;
                      <a
                        href={"/post/" + e.id}
                        style={{ display: "inline-block", width: "100%" }}
                      >
                        {e.title}
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          {data.totalPage && data.totalPage > 1 && (
            <Grid textAlign="center" style={{ marginTop: "4em" }}>
              <Grid.Row columns={1}>
                <Pagination
                  totalPages={data.totalPage ? data.totalPage : 1}
                  firstItem={null}
                  lastItem={null}
                  secondary
                  activePage={pageNumber}
                  onPageChange={handlerPageChange}
                />
              </Grid.Row>
            </Grid>
          )}
        </Container>
      </AnimationLayout>
    </>
  );
  return (
    <>
      <DefaultLayout>{timelineContent}</DefaultLayout>
    </>
  );
}
