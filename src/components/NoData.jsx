import React from "react";
import {Container, Header} from "semantic-ui-react";

export default function NoData() {
    return (
        <>
            <Container style={{marginTop: "2em"}} textAlign="center">
                <Header as="h2">Oops! Something was wrong</Header>
                <Header as="h4" style={{color: "white"}}>
                    No data was found!
                </Header>
            </Container>
        </>
    );
}
