import Cookies from "js-cookie";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Breadcrumb, Divider, Dropdown, Icon } from "semantic-ui-react";
import { CustomButton } from "./Components";
import {
  MENU_ABOUT,
  MENU_CATEGORIES,
  MENU_HOME,
  MENU_TAGS,
  POSTS,
  SEARCH_URL,
} from "./Contansts";
import SearchBox from "./SearchBox";
import Spacing from "./Spacing";
const username = Cookies.get("username");
const accessToken = Cookies.get("access_token");
const handleLogout = () => {
  Cookies.remove("username");
  Cookies.remove("access_token");
  window.location.href = "/";
};
const AccountDropdown = () => (
  <>
    <Dropdown text="admin" style={{ paddingTop: "6px" }}>
      <Dropdown.Menu>
        <Dropdown.Item
          icon="settings"
          text="Post Manage"
          as="a"
          href="/admin/posts"
        />
        <Dropdown.Item icon="log out" text="Logout" onClick={handleLogout} />
      </Dropdown.Menu>
    </Dropdown>
  </>
);
const BreadcrumbMenu = (props) => (
  <>
    <div className="breadmenu-container">
      <div className="website-title">
        <a href="/">Canteen</a>
      </div>
      <div className="breadmenu">
        {props.searchBoxData && props.searchBoxData.length > 0 && (
          <SearchBox
            data={props.searchBoxData}
            enter={props.enterHandler}
            enterExit={props.enterExitHandler}
            outFocus={props.outFocus}
          />
        )}
        <span className="breadmenu-content">
          <Breadcrumb>
            <Breadcrumb.Section href="/" active={"home" == props.active}>
              {MENU_HOME}
            </Breadcrumb.Section>
            <Breadcrumb.Divider>&nbsp;</Breadcrumb.Divider>
            <Breadcrumb.Section
              href="/timeline"
              active={"timeline" == props.active}
            >
              {POSTS}
            </Breadcrumb.Section>
            <Breadcrumb.Divider>&nbsp;</Breadcrumb.Divider>
            <Breadcrumb.Section
              href="/categories"
              active={"categories" === props.active}
            >
              {MENU_CATEGORIES}
            </Breadcrumb.Section>
            <Breadcrumb.Divider>&nbsp;</Breadcrumb.Divider>
            <Breadcrumb.Section href="/tags" active={"tags" === props.active}>
              {MENU_TAGS}
            </Breadcrumb.Section>
            <Breadcrumb.Divider>&nbsp;</Breadcrumb.Divider>
            <Breadcrumb.Section href="/about" active={"about" === props.active}>
              {MENU_ABOUT}
            </Breadcrumb.Section>
            <Breadcrumb.Divider>&nbsp;</Breadcrumb.Divider>
            <Breadcrumb.Divider>&nbsp;</Breadcrumb.Divider>
            {username && accessToken ? (
              AccountDropdown()
            ) : (
              <CustomButton
                content="Sign In"
                href="/admin/signIn"
                paddingTop={7}
                width="80px"
                border={0}
                bold
              />
            )}
          </Breadcrumb>
          {/* {enableDarkReader()} */}
        </span>
      </div>
    </div>
  </>
);
const MobileMenu = (props) => {
  return (
    <>
      <div className="mobile-menu">
        <div onClick={props.handler}>
          <Icon
            name="bars"
            color="blue"
            size="large"
            className="mobile-menu-button"
          />
        </div>
        <span>
          <a href="/" className="title">
            <span className="logo">
              {/* <img src="/logo.svg" alt="logo" width={32} height={32} /> */}
            </span>
          </a>
        </span>
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
          <a href="/timeline">Posts</a>
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
function getActiveItem(router) {
  const path = router.url;
  let name = undefined;
  switch (path) {
    case "/":
      name = "home";
      break;
    case "/categories":
      name = "categories";
      break;
    case "/timeline":
      name = "timeline";
      break;
    case "/tags":
      name = "tags";
      break;
    case "/about":
      name = "about";
      break;
    default:
      name = "timeline";
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
  };
  const handlerSearchBoxOnBulr = () => {
    if (!enter) {
      $(".desktop-menu-search").animate({ width: "250px" }, 200);
    }
  };
  useEffect(() => {
    const activeItem = getActiveItem(router);
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
    $(".desktop-menu-search").animate({ width: "250px" }, 200);
  };
  return width < 960 ? (
    <MobileMenu handler={handlerClick} show={show} />
  ) : (
    <BreadcrumbMenu
      active={activeItem}
      focusHandler={handlerSearchBoxOnFocus}
      blurHandler={handlerSearchBoxOnBulr}
      enterHandler={handlerEnter}
      enterExitHandler={handlerEnterExit}
      outFocus={handlerOutFocus}
    />
  );
}
