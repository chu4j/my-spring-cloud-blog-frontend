import { Container, Header, Icon } from "semantic-ui-react";
import { CustomButton } from "./Components";
import { TITLE_500 } from "./Contansts";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import Spacing from "./Spacing";

export default function InternalError() {
  return (
    <>
      <DefaultLayout>
        <Container text textAlign="center" style={{ marginTop: "14em" }}>
          <HeadMeta title={TITLE_500} />
          <Icon name="server" size="large" />
          <Header as="h3">Internal Server Error</Header>
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
      </DefaultLayout>
    </>
  );
}
