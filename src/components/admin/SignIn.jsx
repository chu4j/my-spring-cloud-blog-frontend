import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import API from "../../data/DataUrl";
export default function AdminSignIn() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const cleanMessage = () => {
    setMessage("");
  };
  const axios = require("axios").default;
  const SignInOnClick = () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    axios
      .post(API.ADMIN_SIGN_IN, params, { withCredentials: true })
      .then((res) => {
        //sign in success
        if (res.status == 200 && res.data.accessToken) {
          //cookie set up
          Cookies.set("access_token", res.data.accessToken, { expires: 3 });
          Cookies.set("username", res.data.username, { expires: 3 });
          history.push("/admin/posts");
        } else {
          //sign in failed
          setMessage(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const LoginForm = () => (
    <Grid textAlign="center" style={{ height: "60vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <Header as="h2" textAlign="center">
          <Image src="/logo.svg" />
          Admin Sign In
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={cleanMessage}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={cleanMessage}
            />
            <Button positive fluid size="large" onClick={SignInOnClick}>
              Sign In
            </Button>
          </Segment>
        </Form>
        {message && (
          <>
            <Message>
              <Header as="h5" color="red">
                {message}
              </Header>
            </Message>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
  return <>{LoginForm()}</>;
}
