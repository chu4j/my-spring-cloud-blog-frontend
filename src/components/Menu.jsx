import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Breadcrumb, Container, Divider, Icon } from "semantic-ui-react";
import Spacing from "./Spacing";
const BreadcrumbMenu = (props) => (
  <>
    <Container fluid className="breadmenu">
      <Breadcrumb>
        <Breadcrumb.Section href="/" active={"home" == props.active}>
          Home
        </Breadcrumb.Section>
        <Breadcrumb.Divider> </Breadcrumb.Divider>
        <Breadcrumb.Section
          href="/posts/timeline"
          active={"timeline" == props.active}
        >
          Timeline
        </Breadcrumb.Section>
        <Breadcrumb.Divider> </Breadcrumb.Divider>
        <Breadcrumb.Section
          href="/categories"
          active={"categories" === props.active}
        >
          Categories
        </Breadcrumb.Section>
        <Breadcrumb.Divider> </Breadcrumb.Divider>
        <Breadcrumb.Section href="/tags" active={"tags" === props.active}>
          Tags
        </Breadcrumb.Section>
        <Breadcrumb.Divider> </Breadcrumb.Divider>
        <Breadcrumb.Section href="/about" active={"about" === props.active}>
          About
        </Breadcrumb.Section>
      </Breadcrumb>
    </Container>
  </>
);
const MobileMenu = (props) => {
  return (
    <>
      <div className="mobile-menu">
        <div onClick={props.handler}>
          <Icon name="bars" size="large" className="mobile-menu-button" />
        </div>
      </div>
      <CSSTransition
        in={props.show}
        classNames="posts"
        timeout={300}
        unmountOnExit
      >
        <div className="mobile-menu-content">
          <a href="/" style={{ color: "white" }}>
            Home
          </a>
          <Divider />
          <a href="/posts/timeline" style={{ color: "white" }}>
            Timeline
          </a>
          <Divider />
          <a href="/categories" style={{ color: "white" }}>
            Categories
          </a>
          <Divider />
          <a href="/tags" style={{ color: "white" }}>
            Tags
          </a>
          <Divider />
          <a href="/about" style={{ color: "white" }}>
            About
          </a>
          <Spacing />
        </div>
      </CSSTransition>
    </>
  );
};
function getActiveItem(path) {
  let name = undefined;
  if (new String(path).indexOf("timeline") > 0) return "timeline";
  switch (path) {
    case "/":
      name = "home";
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
export default function BreadMenu() {
  const router = useRouteMatch();
  const [activeItem, setActiveItem] = useState(false);
  const [width, height] = useWindowSize();
  const [show, setShowMobileMenu] = useState(false);
  const handlerClick = () => {
    show ? setShowMobileMenu(false) : setShowMobileMenu(true);
  };
  useEffect(() => {
    const activeItem = getActiveItem(router.path);
    setActiveItem(activeItem);
  }, []);
  return width < 960 ? (
    <MobileMenu handler={handlerClick} show={show} />
  ) : (
    <BreadcrumbMenu active={activeItem} />
  );
}
