import { Button, Container, Header, Icon } from "semantic-ui-react";
import HeadMeta from "./Meta";
import { TITLE_404 } from "./Vars";
const NotFoundComponent = () => (
  <>
    <Container text textAlign="center" style={{ paddingTop: "5em" }}>
      <HeadMeta title={TITLE_404} />
      <Header as="h1">Oops! not Found</Header>
      <div>&nbsp;</div>
      <Button basic as="a" href="/" color="blue">
        <Icon name="chevron left" color="blue" />
        Back home
      </Button>
    </Container>
  </>
);
export default function NotFound() {
  return (
    <>
      <NotFoundComponent />
    </>
  );
}
