import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Breadcrumb, Container, Divider, Icon } from "semantic-ui-react";
import SearchBox from "./SearchBox";
import Spacing from "./Spacing";
import {
  MENU_ABOUT,
  MENU_CATEGORIES,
  MENU_HOME,
  MENU_TAGS,
  POSTS,
  SEARCH_URL,
} from "./Vars";
const $ = require("jquery");
const BreadcrumbMenu = (props) => (
  <>
    <Container fluid className="breadmenu">
      {props.searchBoxData && props.searchBoxData.length > 0 && (
        <SearchBox
          data={props.searchBoxData}
          enter={props.enterHandler}
          enterExit={props.enterExitHandler}
          outFocus={props.outFocus}
        />
      )}
      <span>
        <a className="my-logo" href="/">
          <img src="/logo28x28.png" alt="logo" />
        </a>
      </span>
      <span className="breadmenu-content">
        {/* <span>
          <input
            placeholder="Searching ..."
            className="desktop-menu-search"
            onFocus={props.focusHandler}
            onBlur={props.blurHandler}
            onChange={props.autoCompeleteHandler}
            id="searchbox-input"
          />
        </span> */}
        <Breadcrumb>
          {/* <Breadcrumb.Divider>/</Breadcrumb.Divider> */}
          <Breadcrumb.Section href="/" active={"home" == props.active}>
            {MENU_HOME}
          </Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section
            href="/posts/timeline"
            active={"timeline" == props.active}
          >
            {POSTS}
          </Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section
            href="/categories"
            active={"categories" === props.active}
          >
            {MENU_CATEGORIES}
          </Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section href="/tags" active={"tags" === props.active}>
            {MENU_TAGS}
          </Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section href="/about" active={"about" === props.active}>
            {MENU_ABOUT}
          </Breadcrumb.Section>
        </Breadcrumb>
      </span>
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
        classNames="mobile-menu"
        timeout={2000}
        unmountOnExit
      >
        <div className="mobile-menu-content">
          <a href="/">Home</a>
          <Divider />
          <a href="/posts/timeline">Posts</a>
          <Divider />
          <a href="/categories">Categories</a>
          <Divider />
          <a href="/tags">Tags</a>
          <Divider />
          <a href="/about">About</a>
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
  const handlerSearchBoxOnFocus = () => {
    $(".desktop-menu-search").animate({ width: "400px" }, 200);
    handlerAutoCompelete();
  };
  const handlerSearchBoxOnBulr = () => {
    if (!enter) {
      $(".desktop-menu-search").animate({ width: "250px" }, 200);
      setSearchDataState([]);
    }
  };
  useEffect(() => {
    const activeItem = getActiveItem(router.path);
    setActiveItem(activeItem);
  }, []);
  const $ = require("jquery");
  const [enter, setEnterState] = useState(false);
  const handlerEnter = () => {
    setEnterState(true);
  };
  const handlerEnterExit = () => {
    setEnterState(false);
  };
  const handlerOutFocus = () => {
    console.log("test");
    $(".desktop-menu-search").animate({ width: "250px" }, 200);
    setSearchDataState([]);
  };
  const [searchData, setSearchDataState] = useState([]);
  const axios = require("axios").default;
  const handlerAutoCompelete = () => {
    setTimeout(function () {
      timeoutTigger.call();
    }, 1000);
  };
  function timeoutTigger() {
    const searchValue = $("#searchbox-input").val().trim();
    if ("" == searchValue) {
      setSearchDataState([]);
    } else {
      axios
        .get(SEARCH_URL + searchValue)
        .then((res) => setSearchDataState(res.data))
        .catch((error) => console.error(error));
    }
  }
  return width < 960 ? (
    <MobileMenu handler={handlerClick} show={show} />
  ) : (
    <BreadcrumbMenu
      active={activeItem}
      focusHandler={handlerSearchBoxOnFocus}
      blurHandler={handlerSearchBoxOnBulr}
      autoCompeleteHandler={handlerAutoCompelete}
      searchBoxData={searchData}
      enterHandler={handlerEnter}
      enterExitHandler={handlerEnterExit}
      outFocus={handlerOutFocus}
    />
  );
}
