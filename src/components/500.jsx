import { Button, Container, Header, Icon } from "semantic-ui-react";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import { TITLE_500 } from "./Vars";

export default function InternalError() {
  return (
    <>
      <DefaultLayout>
        <Container text textAlign="center" style={{ marginTop: "8rem" }}>
          <HeadMeta title={TITLE_500} />
          <Icon name="server" size="large" color="blue" />
          <Header as="h3" color="blue">
            Internal Server Error
          </Header>
          <Button basic color="blue" as="a" href="/">
            <Icon name="chevron left" color="blue" /> Back home
          </Button>
        </Container>
      </DefaultLayout>
    </>
  );
}
