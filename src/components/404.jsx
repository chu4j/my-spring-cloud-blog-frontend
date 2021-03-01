import { Button, Container, Header, Icon } from "semantic-ui-react";
const NotFoundComponent = () => (
  <>
    <Container text textAlign="center" style={{ paddingTop: "5em" }}>
      <Header as="h1">Oops! Not Found</Header>
      <Header as="h5">
        Maybe this resource by deleted or removed forever!
      </Header>
      <Button basic as="a" href="/" color="teal">
        <Icon name="chevron left" color="teal" />
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
