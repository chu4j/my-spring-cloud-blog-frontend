import { Button, Container, Header, Icon } from "semantic-ui-react";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import { TITLE_404 } from "./Vars";
const NotFoundComponent = () => (
  <>
    <DefaultLayout>
      <Container text textAlign="center" style={{ marginTop: "8rem" }}>
        <HeadMeta title={TITLE_404} />
        <Header as="h3" color="blue">
          <Icon name="search" color="blue" />
          Oops! not Found
        </Header>
        <div>&nbsp;</div>
        <Button basic as="a" href="/" color="blue">
          <Icon name="chevron left" color="blue" />
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
