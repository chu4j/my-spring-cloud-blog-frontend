import { Grid } from "semantic-ui-react";
import "../css/index.css";
import Footer from "./Footer";
import Header from "./Menu";
import Spacing from "./Spacing";
export default function DefaultLayout(props) {
  return (
    <div className="layout-container">
      <Grid>
        <Grid.Row columns={1}>
          <Header />
        </Grid.Row>
        <Grid.Row className="layout-center-container">
          {props.CategoryComponent && (
            <>
              <Grid.Column width={1} />
              <Grid.Column width={3}>
                {props.CategoryComponent}
                <Spacing />
                <Spacing />
                {props.TagComponent}
              </Grid.Column>
            </>
          )}
          {props.CategoryComponent &&
          props.TagComponent &&
          props.ContentComponent ? (
            <Grid.Column width={10}>{props.ContentComponent}</Grid.Column>
          ) : (
            <Grid.Column width={16}>{props.ContentComponent}</Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>{!props.nonFooter && <Footer />}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
