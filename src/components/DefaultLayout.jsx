import { Grid } from "semantic-ui-react";
import Footer from "./Footer";
import Header from "./Menu";
export default function DefaultLayout(props) {
  const $ = require("jquery");
  if (!props.division) {
    $(".post-container").css("borderLeft", "0px").css("paddingLeft", "0.1em");
  } else {
    $(".post-container")
      .css("borderLeft", "1px solid #e1e4e8")
      .css("paddingLeft", "2.5em");
  }
  return (
    <>
      <div className="layout-container">
        <Grid>
          <Grid.Row columns={1}>
            <Header />
          </Grid.Row>
          <Grid.Row className="layout-center-container">
            {!props.fullWidth && (
              <Grid.Column width={props.CategoriesWidget ? 2 : 4} />
            )}

            {props.CategoriesWidget && props.TagsWidget && (
              <Grid.Column width={3}>
                {props.CategoriesWidget && props.CategoriesWidget}
                {props.TagsWidget && props.TagsWidget}
              </Grid.Column>
            )}
            {props.CategoriesWidget &&
            props.TagsWidget &&
            props.CenterContent ? (
              <Grid.Column width={props.fullWidth ? 16 : 8}>
                {props.CenterContent}
              </Grid.Column>
            ) : (
              !props.children && (
                <Grid.Column width={props.fullWidth ? 16 : 8}>
                  {props.CenterContent}
                </Grid.Column>
              )
            )}
            {props.children && (
              <Grid.Column width={16}>{props.children}</Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </div>
      {!props.nonFooter && <Footer />}
    </>
  );
}
