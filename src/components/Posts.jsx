import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Pagination
} from "semantic-ui-react";
import Spacing from "./Spacing";

export default function Posts(props) {
  const hljs = require("highlight.js");
  const [showComponent, setShowComponent] = useState(false);
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
        <>
          <Container className="base-post-container">
            {props.response.list &&
              props.response.list.map((a, index) => (
                <div
                  style={index > 0 ? { marginTop: "20px" } : {}}
                  className="post-container"
                  key={a.serialNumber}
                >
                  <Header as="h1" textAlign="center">
                    <a href={"/post/" + a.serialNumber} className="post-title">
                      {a.title}
                    </a>
                  </Header>
                  {
                    <div
                      style={{ maxWidth: "960px" }}
                      className="markdown-body"
                      dangerouslySetInnerHTML={{ __html: a.content }}
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
                                    <Icon name="linkify" color="black" />
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
                              <Icon
                                name="hashtag"
                                style={{ color: "#171923" }}
                              />
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
                      <Divider />
                    </>
                  )}
                  <Spacing />
                  <Spacing />
                </div>
              ))}
          </Container>
          {props.focus && props.response.list && (
            <Container style={{ marginTop: "2em" }}>
              <Grid textAlign="center">
                <Grid.Row>
                  <Grid.Column width={8}>
                    {props.response.list.map((e, index) => (
                      <>
                        {e.previous && (
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
                        {e.next && (
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
