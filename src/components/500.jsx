import { Button, Container, Header, Icon } from "semantic-ui-react";
import HeadMeta from "./Meta";
import { TITLE_500 } from "./Vars";

export default function InternalError() {
  return (
    <>
      <Container text textAlign="center" style={{ paddingTop: "2em" }}>
        <HeadMeta title={TITLE_500} />
        <Icon name="server" size="large" color="blue" />
        <Header as="h1">Internal Server Error</Header>
        <Button basic color="blue" as="a" href="/">
          <Icon name="chevron left" color="blue" /> Back home
        </Button>
      </Container>
    </>
  );
}
