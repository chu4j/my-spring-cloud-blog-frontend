import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Container, Grid, Header, TextArea } from "semantic-ui-react";
import API from "../../data/DataUrl";
import Spacing from "../Spacing";

export default function EditPost() {
  const axios = require("axios").default;
  const [markdwonHtml, setMarkdownHtml] = useState("");
  const [state, setState] = useState("");
  const { postId } = useParams();
  useEffect(() => {
    console.log(postId);
    axios
      .get(API.GET_POST_BY_ID_URL + postId)
      .then((res) => {
        setState(res.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const previewMarkdownEvent = (event) => {
    const params = new URLSearchParams();
    params.append("markdownText", state);
    console.log(JSON.stringify(state));
    axios
      .post(API.FORMAT_MARKDOWN_TO_HTML, params)
      .then((res) => {
        setMarkdownHtml(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Cmp = ({ state, setState }) => (
    <>
      <Container fluid style={{ margin: "5em 1em 0 1em" }}>
        <Grid>
          <Grid.Row textAlign="center">
            <Grid.Column width={16}>
              <Header as="h1" textAlign="center">
                Edit Your Markdown
              </Header>
              <Spacing />
              <Button positive onClick={previewMarkdownEvent}>
                Preview...
              </Button>
              <Spacing />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              {/* markdown content area */}
              <TextArea
                key="markdown-area"
                className="markdown-area"
                placeholder="Write your markdown in hear ..."
                onChange={(e) => setState(e.target.value)}
                value={state}
              ></TextArea>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              {/* html content area */}
              <div className="markdown-body">
                <div dangerouslySetInnerHTML={{ __html: markdwonHtml }}></div>
              </div>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={7} textAlign="center"></Grid.Column>
            <Grid.Column width={7}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
  return <>{Cmp({ state: state, setState: setState })}</>;
}
