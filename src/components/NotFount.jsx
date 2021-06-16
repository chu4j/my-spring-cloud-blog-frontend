import { Container, Header } from "semantic-ui-react";
import { CustomButton } from "./Components";
import { TITLE_404 } from "./Contansts";
import Footer from "./Footer";
import HeadMeta from "./Meta";
import Spacing from "./Spacing";
const NotFoundComponent = () => (
  <>
    <Container
      text
      textAlign="center"
      style={{ marginTop: "14em", height: "40vh" }}
    >
      <HeadMeta title={TITLE_404} />
      <Header as="h2">Oops ! not Found...</Header>
      <Spacing />
      <Spacing />
      <CustomButton
        paddingTop={2}
        height="38px"
        width="140px"
        content="Back Home"
        href="/"
        bold
      />
    </Container>
  </>
);
export default function NotFound() {
  return (
    <>
      <NotFoundComponent />
      <Footer />
    </>
  );
}
