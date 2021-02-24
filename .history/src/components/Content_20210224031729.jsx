import { React, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Container, Grid, Header, Icon, Pagination } from "semantic-ui-react";
import DivRow from "./Common";

function ContentComponent(props) {
  const hljs = require("highlight.js");
  const [showComponent, setShowComponent] = useState(false);
  console.log("state : " + showComponent);
  useEffect(() => {
    let time = setTimeout(() => setShowComponent(true), 100);
    hljs.highlightAll();
    return () => {
      clearTimeout(time);
    };
  }, []);
  const history = useHistory();
  const handlePaginationClick = (e, { activePage }) => {
    const url = props.pagePrefix + activePage;
    history.push(url);
  };
  return (
    <>
      <CSSTransition
        in={showComponent}
        classNames="posts"
        timeout={200}
        unmountOnExit
      >
        <Container fluid style={{ padding: "4em" }}>
          {props.response.list &&
            props.response.list.map((a, index) => (
              <div
                className="post-container"
                style={index > 0 ? { marginTop: "3em" } : {}}
              >
                <Header as="h1" textAlign="center">
                  <a href={"/post/" + a.serialNumber} className="post-title">
                    {a.title}
                  </a>
                </Header>
                {
                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: a.content }}
                  ></div>
                }

                <DivRow />
                {a.category && a.tag && (
                  <>
                    <Container fluid>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={5}>
                            {a.category.map((c, index) => (
                              <>
                                {" "}
                                <div key={index}>
                                  <span>
                                    <Icon name="linkify" color="blue" />
                                    <a
                                      href={"/category/" + c.category}
                                      style={{ fontWeight: "900" }}
                                    >
                                      {c.category}
                                    </a>
                                  </span>
                                </div>
                              </>
                            ))}
                          </Grid.Column>

                          <Grid.Column width={11}>
                            {a.tag.map((t, index) => (
                              <>
                                {" "}
                                <span key={index}>
                                  <Icon name="hashtag" color="yellow" />
                                  <a
                                    href={"/tag/" + t.tag}
                                    style={{ fontWeight: "900" }}
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
                <DivRow />
                <DivRow />
              </div>
            ))}
          {props.response.totalPage > 1 && props.activePage && (
            <Container fluid textAlign="center" style={{ marginTop: "2em" }}>
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
          {props.focus && props.response.list && (
            <div style={{ marginTop: "1em" }}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={8}>
                    {props.response.list.map((e, index) => (
                      <>
                        {e.previous && (
                          <a
                            key={index}
                            href={"/post/" + e.previous.serialNumber}
                            style={{ fontWeight: "900" }}
                          >
                            <Icon name="angle left" size="big"></Icon>
                            &nbsp;&nbsp;{e.previous.title}
                          </a>
                        )}
                      </>
                    ))}
                  </Grid.Column>
                  <Grid.Column width={8} textAlign="right">
                    {props.response.list.map((e, index) => (
                      <>
                        {e.next && (
                          <a
                            key={index}
                            href={"/post/" + e.next.serialNumber}
                            style={{ fontWeight: "900" }}
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
            </div>
          )}
        </Container>
      </CSSTransition>
    </>
  );
}
export default withRouter(ContentComponent);
