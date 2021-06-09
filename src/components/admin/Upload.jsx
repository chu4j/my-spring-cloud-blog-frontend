import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import API from "../../data/DataUrl";
import { enableDarkReader } from "../../theme/dark-mode";
import Footer from "../Footer";

export default function Upload() {
  const history = useHistory();
  const backToSignIn = () => {
    history.push("/admin/signIn");
  };
  const axios = require("axios").default;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        backToSignIn();
      }
    }
  );
  const accessToken = Cookies.get("access_token");
  const username = Cookies.get("username");
  useEffect(() => {
    if (!accessToken || !username) {
      backToSignIn();
    }
  }, []);
  const [message, setMessage] = useState();
  const uploadFileEvent = () => {
    const formData = new FormData();
    const fileField = document.querySelector("#files");
    if (!(Array.from(fileField.files).length > 0)) {
      setMessage("Please select your mackdown file");
    } else {
      Array.from(fileField.files).forEach((f) => {
        formData.append("files", f);
      });
      axios
        .post(API.ADMIN_POSTS_UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  const uploadForm = () => (
    <>
      <Container style={{ marginTop: "25vh" }}>
        <Grid textAlign="center">
          <GridRow>
            <GridColumn width={6}>
              <Segment textAlign="left">
                <Form>
                  <Form.Field>
                    <label htmlFor="">Select your markdown file</label>
                    <input
                      id="files"
                      type="file"
                      name="files"
                      multiple="multiple"
                      accept=".md"
                    />
                  </Form.Field>
                  <Button positive onClick={uploadFileEvent}>
                    Upload
                  </Button>
                </Form>
                {message && <Message as="h4">{message}</Message>}
              </Segment>
              <Button positive as="a" href="/admin/posts">
                <Icon name="arrow left" />
                Back Home
              </Button>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
    </>
  );
  return (
    <>
      <Container>
        {uploadForm()}
        {/* {enableDarkReader()} */}
      </Container>
    </>
  );
}
