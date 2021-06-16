import { useLayoutEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Footer from "./Footer";
import Header from "./Menu";
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
export default function DefaultLayout(props) {
  const [width, height] = useWindowSize();
  const $ = require("jquery");
  if (props.imgSrc) {
    $("#post-background-image").css("width", width);
  }
  if (width < 960) {
    $(".post-title").css("color", "#000");
  } else {
    if (props.background && props.imgSrc) {
      $(".post-title").css("color", "#fff");
    }
  }
  if (!props.division) {
    // $(".post-container").css("borderLeft", "0px").css("paddingLeft", "0.1em");
  } else {
    // $(".post-container")
    //   .css("borderLeft", "1px solid #e1e4e8")
    //   .css("paddingLeft", "2.5em");
  }
  const PostBackground = () => (
    <>
      <div className="post-background">
        <img
          id="post-background-image"
          className="image"
          src={props.background && props.imgSrc ? props.imgSrc : ""}
          alt="image"
        />
      </div>
    </>
  );
  return (
    <>
      <div className="layout-container">
        <Grid>
          <Grid.Row columns={1}>
            <Header />
          </Grid.Row>
          {props.background && props.imgSrc && width > 960 && (
            <Grid.Row>{PostBackground()}</Grid.Row>
          )}
          <Grid.Row className="layout-center-container">
            {!props.fullWidth && (
              <Grid.Column width={props.CategoriesWidget ? 1 : 4} />
            )}

            {props.CategoriesWidget && props.TagsWidget && (
              <>
                <Grid.Column width={3}>
                  {props.CategoriesWidget && props.CategoriesWidget}
                  {props.TagsWidget && props.TagsWidget}
                </Grid.Column>
                <Grid.Column width={1}>&nbsp;</Grid.Column>
              </>
            )}
            {props.CategoriesWidget &&
            props.TagsWidget &&
            props.CenterContent ? (
              <Grid.Column width={props.fullWidth ? 16 : 7}>
                {props.CenterContent}
              </Grid.Column>
            ) : (
              !props.children && (
                <Grid.Column width={props.fullWidth ? 16 : 7}>
                  {props.CenterContent}
                </Grid.Column>
              )
            )}
            {props.children && (
              <Grid.Column
                width={props.width ? props.width : 16}
                style={
                  props.background && props.imgSrc && width > 960
                    ? { marginTop: "-320px" }
                    : {}
                }
              >
                {props.children}
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </div>
      {!props.nonFooter && <Footer />}
    </>
  );
}
