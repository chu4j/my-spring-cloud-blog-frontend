import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Container, Grid, Header, Icon, Pagination } from "semantic-ui-react";
import NoData from "./NoData";
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
      <CSSTransition
        in={showComponent}
        classNames="posts"
        timeout={300}
        unmountOnExit
      >
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
              <NoData />
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
                            &nbsp;&nbsp;{e.previous.title}
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
                            {e.next.title}&nbsp;&nbsp;
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
        </>
      </CSSTransition>
    </>
  );
}
