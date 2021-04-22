import { Button, Container, Header, Icon } from "semantic-ui-react";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import Spacing from "./Spacing";
import { TITLE_404 } from "./Vars";
const NotFoundComponent = () => (
  <>
    <DefaultLayout>
      <Container text textAlign="center" style={{ marginTop: "14em" }}>
        <HeadMeta title={TITLE_404} />
        <Header as="h3">Oops ! not Found...</Header>
        <Spacing />
        <Spacing />
        <Button as="a" href="/" color="facebook">
          <Icon name="chevron left" />
          Back home
        </Button>
      </Container>
    </DefaultLayout>
  </>
);
export default function NotFound() {
  return (
    <>
      <NotFoundComponent />
    </>
  );
}
