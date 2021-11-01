import React, {useState} from "react";
import Cookies from "js-cookie";
import {useHistory} from "react-router";
import {Button, Form, Grid, Header, Message} from "semantic-ui-react";
import API from "../../data/DataUrl";
import {CustomButton} from "../Components";
import Footer from "../Footer";
import Spacing from "../Spacing";
import {WEBSITE_NAME} from "../Contansts";

export default function AdminSignIn() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const cleanMessage = () => {
        setMessage("");
    };
    const axios = require("axios").default;
    const SignInOnClick = () => {
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        if (username === "") {
            setMessage("Username Can't be empty");
        } else if (password === "") {
            setMessage("Password Can't be empty");
        } else {
            axios
                .post(API.ADMIN_SIGN_IN, params, {withCredentials: true})
                .then((res) => {
                    //sign in success
                    if (res.status === 200 && res.data.accessToken) {
                        //cookie set up
                        Cookies.set("access_token", res.data.accessToken, {expires: 3});
                        Cookies.set("username", res.data.username, {expires: 3});
                        history.push("/admin/posts");
                    } else {
                        //sign in failed
                        setMessage(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    const LoginForm = () => (
        <Grid textAlign="center" style={{height: "80vh"}} verticalAlign="middle">
            <Grid.Column style={{maxWidth: 320}}>
                {/* <Header as="h3">
          <Image src="/logo.svg" />
        </Header> */}
                <Header as="h1" textAlign="center" style={{fontSize: "33px", fontFamily: "charter"}}>
                    {WEBSITE_NAME}
                </Header>
                <Spacing/>
                <Form size="large">
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
                    {/* <Button positive fluid size="large" onClick={SignInOnClick}>
            Sign In
          </Button> */}
                    <CustomButton
                        content="Sign In"
                        width={280}
                        height={35}
                        paddingTop={5}
                        onClick={SignInOnClick}
                        border={0}
                        bold
                    />
                </Form>
                {message && (
                    <>
                        <Message>
                            <Header as="h5" color="black">
                                {message}
                            </Header>
                        </Message>
                    </>
                )}
                <Spacing/>
                <Spacing/>
                <Button secondary as="a" href="/" content='Home' size={"small"} icon='arrow left' labelPosition='left'/>
            </Grid.Column>
        </Grid>
    );
    return (
        <>
            {LoginForm()}
            {/* {enableDarkReader()} */}
            <Footer/>
        </>
    );
}
