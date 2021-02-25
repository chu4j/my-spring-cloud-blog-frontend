import { Grid } from "semantic-ui-react";
import "../css/index.css";
import Spacing from "./Spacing";
import Footer from "./Footer";
import Header from "./Menu";
export default function DefaultLayout(props) {
  return (
    <div className="layout-container">
      <Grid stackable>
        <Grid.Row columns={1}>
          <Header />
        </Grid.Row>
        <Grid.Row className="layout-center-container">
          {props.CategoryComponent && props.TagComponent && (
            <Grid.Column width={3}>
              {props.CategoryComponent}
              <Spacing />
              <Spacing />
              <Spacing />
              {props.TagComponent}
            </Grid.Column>
          )}
          {props.CategoryComponent &&
          props.TagComponent &&
          props.ContentComponent ? (
            <Grid.Column width={12}>{props.ContentComponent}</Grid.Column>
          ) : (
            <Grid.Column width={16}>{props.ContentComponent}</Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Footer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
