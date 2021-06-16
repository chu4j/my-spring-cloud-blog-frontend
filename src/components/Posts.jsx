import { React } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Loader,
  Pagination,
} from "semantic-ui-react";
import Spacing from "./Spacing";
export default function Posts(props) {
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
      <Container fluid>
        {props.response.list && props.response.list.length > 0 ? (
          props.response.list.map(
            (a, index) =>
              a && (
                <div
                  key={index}
                  className="post-container"
                  style={
                    index > 0 ? { marginTop: "2em" } : { marginTop: "13em" }
                  }
                >
                  <Header as="h1">
                    <a
                      href={"/post/" + a.id}
                      className="post-title"
                      style={
                        props.focus && props.colorTitle
                          ? { color: "#fff" }
                          : { color: "#212121" }
                      }
                    >
                      {a.title}
                    </a>
                  </Header>
                  <Spacing />
                  <Spacing />
                  <Spacing />
                  <Spacing />
                  {props.focus && a.catalogueBody && (
                    <>
                      <Header as="h3" style={{ fontFamily: "charter" }}>
                        <Icon
                          name="bookmark outline"
                          style={{ color: "#44337a" }}
                        />
                        Chapter
                      </Header>

                      <div
                        className="catalog"
                        style={{ display: "inline-block" }}
                        dangerouslySetInnerHTML={{ __html: a.catalogueBody }}
                      ></div>
                      <Divider />
                    </>
                  )}
                  {
                    <div
                      style={{ maxWidth: "960px" }}
                      className="markdown-body"
                      dangerouslySetInnerHTML={{
                        __html: a.contentBody,
                      }}
                    ></div>
                  }
                  <Spacing />
                  {a.categories && a.tags && (
                    <Container fluid>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={5}>
                            {/* <Icon name="bookmark" color="blue" /> */}
                            {a.categories.map((c, index) => (
                              <span key={index}>
                                <span>
                                  <a
                                    href={"/category/" + c.categoryName}
                                    className="post-category"
                                  >
                                    #{c.categoryName}
                                  </a>
                                </span>
                              </span>
                            ))}
                          </Grid.Column>

                          <Grid.Column width={11}>
                            {/* <Icon name="tag" color="blue" /> */}
                            {a.tags.map((t, index) => (
                              <span key={index}>
                                <a
                                  href={"/tag/" + t.tagName}
                                  className="post-tag"
                                >
                                  #{t.tagName}
                                </a>
                              </span>
                            ))}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Container>
                  )}
                  <Spacing />
                </div>
              )
          )
        ) : (
          <Loader style={{ marginTop: "30%" }} active inline="centered" />
        )}

        {props.focus &&
          props.response.list &&
          props.response.list.map((e, index) => (
            <Container key={index} fluid style={{ marginTop: "2.5em" }}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8} textAlign="left">
                    <div key={index}>
                      {e && e.prevPost && (
                        <a
                          key={e.prevPost.id}
                          href={"/post/" + e.prevPost.id}
                          className="post-previous-next"
                        >
                          <Icon name="chevron left"></Icon>
                          {e.prevPost.title}
                        </a>
                      )}
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8} textAlign="right">
                    <div key={index}>
                      {e && e.nextPost && (
                        <a
                          key={e.nextPost.id}
                          href={"/post/" + e.nextPost.id}
                          className="post-previous-next"
                        >
                          {e.nextPost.title}
                          <Icon name="chevron right"></Icon>
                        </a>
                      )}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          ))}
      </Container>
      {props.response.totalPage &&
        props.response.totalPage > 1 &&
        props.activePage && (
          <Container
            key="page-info"
            textAlign="center"
            style={{ marginTop: "2em" }}
          >
            <Pagination
              totalPages={props.response.totalPage}
              firstItem={null}
              lastItem={null}
              secondary
              activePage={props.activePage}
              onPageChange={handlePaginationClick}
            />
          </Container>
        )}
      {/* <Button className="back-to-top" icon="chevron up" size="big"></Button> */}
    </>
  );
}
