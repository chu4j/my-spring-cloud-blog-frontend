import { Grid } from "semantic-ui-react";
import "../css/index.css";
import Header from "./BlogHeader";
import DivRow from "./Common";
import Footer from "./Footer";
export default function BlogLayout(props) {
  return (
    <div className="customBackground">
      <Grid stackable>
        <Grid.Row columns={1}>
          <Header />
        </Grid.Row>
        <Grid.Row>
          {props.CategoryComponent && props.TagComponent && (
            <Grid.Column width={3}>
              {props.CategoryComponent}
              <DivRow />
              <DivRow />
              <DivRow />
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
