import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Breadcrumb, Container } from "semantic-ui-react";
const BreadcrumbExampleDivider = (props) => (
  <>
    <Container
      textAlign="center"
      fluid
      style={{ paddingTop: "1rem" }}
      className="breadmenu"
    >
      <Breadcrumb size="large">
        <Breadcrumb.Section href="/" active={"home" == props.active}>
          Home
        </Breadcrumb.Section>
        <Breadcrumb.Divider> / </Breadcrumb.Divider>
        <Breadcrumb.Section
          href="/posts/timeline"
          active={"timeline" == props.active}
        >
          Timeline
        </Breadcrumb.Section>
        <Breadcrumb.Divider> / </Breadcrumb.Divider>
        <Breadcrumb.Section
          href="/categories"
          active={"categories" === props.active}
        >
          Categories
        </Breadcrumb.Section>
        <Breadcrumb.Divider> / </Breadcrumb.Divider>
        <Breadcrumb.Section href="/tags" active={"tags" === props.active}>
          Tags
        </Breadcrumb.Section>
      </Breadcrumb>
    </Container>
  </>
);
function getActiveItem(path) {
  let name = undefined;
  if (new String(path).indexOf("timeline") > 0) return "timeline";
  switch (path) {
    case "/":
      name="home"
      break;
    case "/categories":
      name = "categories";
      break;
    case "/posts/timeline":
      name = "timeline";
      break;
    case "/tags":
      name = "tags";
      break;
    case "/about":
      name = "about";
      break;
    default:
      name = "";
      break;
  }
  return name;
}
export default function BreadMenu() {
  const router = useRouteMatch();
  const name = getActiveItem(router.path);
  const [activeItem, setActiveItem] = useState(false);
  useEffect(() => {
    const activeItem = getActiveItem(router.path);
    setActiveItem(activeItem);
  }, []);
  return <BreadcrumbExampleDivider active={activeItem} />;
}
