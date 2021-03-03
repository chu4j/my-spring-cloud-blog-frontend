import { Button, Container, Header, Icon } from "semantic-ui-react";

export default function InternalError() {
  return (
    <>
      <Container text textAlign="center" style={{ paddingTop: "2em" }}>
        <Icon name="server" size="large" color="yellow" />
        <Header as="h1">Internal Server Error</Header>
        <Header as="h5">
          Internal server was ctach exception or shutdown by hostadmin
        </Header>
        <Button basic color="teal" as="a" href="/">
          <Icon name="chevron left" /> Back home
        </Button>
      </Container>
    </>
  );
}
