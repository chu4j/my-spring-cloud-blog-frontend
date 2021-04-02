import { Grid } from "semantic-ui-react";
import Footer from "./Footer";
import Header from "./Menu";
export default function DefaultLayout(props) {
  return (
    <div className="layout-container">
      <Grid>
        <Grid.Row columns={1}>
          <Header />
        </Grid.Row>
        <Grid.Row className="layout-center-container">
          <>
            <Grid.Column width={1} />
            <Grid.Column width={3}>
              {props.CategoriesWidget && props.CategoriesWidget}
              {props.TagsWidget && props.TagsWidget}
            </Grid.Column>
          </>
          {props.CategoriesWidget && props.TagsWidget && props.CenterContent ? (
            <Grid.Column width={10}>{props.CenterContent}</Grid.Column>
          ) : (
            <Grid.Column width={16}>{props.CenterContent}</Grid.Column>
          )}
          {props.children && (
            <Grid.Column width={16}>{props.children}</Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>{!props.nonFooter && <Footer />}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
