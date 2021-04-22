import { Button, Container, Header, Icon } from "semantic-ui-react";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import { TITLE_500 } from "./Vars";

export default function InternalError() {
  return (
    <>
      <DefaultLayout>
        <Container text textAlign="center" style={{ marginTop: "14em" }}>
          <HeadMeta title={TITLE_500} />
          <Icon name="server" size="large" />
          <Header as="h3">Internal Server Error</Header>
          <Button color="facebook" as="a" href="/">
            <Icon name="chevron left" /> Back home
          </Button>
        </Container>
      </DefaultLayout>
    </>
  );
}
