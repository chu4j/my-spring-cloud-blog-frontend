import moment from "moment";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  GridColumn,
  Header,
  Icon,
  Loader,
  Pagination,
} from "semantic-ui-react";
import Spacing from "./Spacing";
export default function Posts(props) {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setShowComponent(true);
  }, []);
  const history = useHistory();
  const handlePaginationClick = (e, { activePage }) => {
    const url = props.pagePrefix + activePage;
    history.push(url);
  };
  const $ = require("jquery");
  $(() => {
    const ele = document.querySelectorAll("pre code");
    if (undefined !== ele && null !== ele) {
      ele.forEach((block) => {
        window.hljs.highlightBlock(block);
      });
    }
  });
  return (
    <>
      <>
        <Container>
          {props.response.list && props.response.list.length > 0 ? (
            props.response.list.map(
              (a, index) =>
                a && (
                  <div
                    key={index}
                    className="post-container"
                    key={a.serialNumber}
                  >
                    <Header as="h1" textAlign="center">
                      <a
                        href={"/post/" + a.serialNumber}
                        className="post-title"
                      >
                        {a.title}
                      </a>
                    </Header>
                    {props.focus && a.catalog && (
                      <>
                        <Header as="h3">
                          <Icon name="bookmark" style={{ color: "#52C75F" }} />
                          目录
                        </Header>

                        <div
                          style={{ display: "inline-block" }}
                          dangerouslySetInnerHTML={{ __html: a.catalog }}
                        ></div>
                        <Divider />
                      </>
                    )}
                    {
                      <div
                        style={{ maxWidth: "960px" }}
                        className="markdown-body"
                        dangerouslySetInnerHTML={{
                          __html: a.content,
                        }}
                      ></div>
                    }
                    <Spacing />
                    {a.category && a.tag && (
                      <>
                        <Container fluid>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={5}>
                                {a.category.map((c, index) => (
                                  <div key={c.serialNumber}>
                                    <span>
                                      <Icon name="bookmark" color="blue" />
                                      <a
                                        href={"/category/" + c.category}
                                        className="post-category"
                                      >
                                        {c.category}
                                      </a>
                                    </span>
                                  </div>
                                ))}
                              </Grid.Column>

                              <Grid.Column width={11}>
                                <Icon name="tag" color="blue" />
                                {a.tag.map((t, index) => (
                                  <>
                                    <span key={t.serialNumber}>
                                      <a
                                        href={"/tag/" + t.tag}
                                        className="post-tag"
                                      >
                                        {t.tag}
                                      </a>
                                    </span>
                                  </>
                                ))}
                              </Grid.Column>
                              <GridColumn width={11}>
                                <Spacing />
                                <div style={{ color: "#010102" }}>
                                  <Icon name="time" color="blue" />
                                  <em style={{ fontSize: "0.8em" }}>
                                    {moment(a.publishTime)
                                      .locale("en")
                                      .format("yyyy/MM/DD")}
                                  </em>
                                </div>
                              </GridColumn>
                            </Grid.Row>
                          </Grid>
                        </Container>
                      </>
                    )}
                    <Spacing />
                  </div>
                )
            )
          ) : (
            <Loader style={{ marginTop: "30%" }} active inline="centered" />
          )}
        </Container>
        {props.focus && props.response.list && (
          <Container style={{ marginTop: "2em" }}>
            <Grid textAlign="center">
              <Grid.Row>
                <Grid.Column width={8}>
                  {props.response.list.map((e, index) => (
                    <>
                      {e && e.previous && (
                        <a
                          key={e.previous.serialNumber}
                          href={"/post/" + e.previous.serialNumber}
                          className="post-previous-next"
                        >
                          <Icon name="angle left" size="big"></Icon>
                          {e.previous.title}
                        </a>
                      )}
                    </>
                  ))}
                </Grid.Column>
                <Grid.Column width={8}>
                  {props.response.list.map((e, index) => (
                    <>
                      {e && e.next && (
                        <a
                          key={e.next.serialNumber}
                          href={"/post/" + e.next.serialNumber}
                          className="post-previous-next"
                        >
                          {e.next.title}
                          <Icon name="angle right" size="big"></Icon>
                        </a>
                      )}
                    </>
                  ))}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
        {props.response.totalPage > 1 && props.activePage && (
          <Container textAlign="center" style={{ marginTop: "2em" }}>
            <Pagination
              totalPages={props.response.totalPage}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              activePage={props.activePage}
              onPageChange={handlePaginationClick}
            />
          </Container>
        )}
        {/* <Button className="back-to-top" icon="chevron up" size="big"></Button> */}
      </>
    </>
  );
}
