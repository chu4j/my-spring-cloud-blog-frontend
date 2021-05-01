import { BLOG_TITLE, CATEGORY, ServerHost, TAG } from "../components/Vars";
import API from "../data/DataUrl";
import RequestBuilder from "./RequestBuilder";
export function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
export function getHomeUrl(router, name, pageNumber) {
  let requestUrl = "";
  let pagePrefix = "";
  let title = "";
  let description = "";
  const path = router.path;
  switch (path) {
    case "/":
      requestUrl = new RequestBuilder()
        .setUrl(API.GET_POSTS_URL)
        .setPage(1)
        .setSize(3)
        .build()
        .toUrlString();
      pagePrefix = "/posts/page/";
      title = BLOG_TITLE + "- home page";
      description = BLOG_TITLE + "- home page";
      break;
    case "/category/:name":
      requestUrl = new RequestBuilder()
        .setUrl(API.GET_POST_BY_CATEGORY_URL)
        .setPathVar(name)
        .setPage(1)
        .setSize(3)
        .build()
        .toUrlString();
      pagePrefix = "/category/" + name + "/page/";
      title = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      description = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/category/:name/page/:pageNumber":
      requestUrl = new RequestBuilder()
        .setUrl(API.GET_POST_BY_CATEGORY_URL)
        .setPathVar(name)
        .setPage(pageNumber)
        .setSize(3)
        .build()
        .toUrlString();
      pagePrefix = "/category/" + name + "/page/";
      title = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      description = CATEGORY + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/tag/:name":
      requestUrl = new RequestBuilder()
        .setUrl(API.GET_POST_BY_TAG_URL)
        .setPathVar(name)
        .setPage(1)
        .setSize(3)
        .build()
        .toUrlString();
      pagePrefix = "/tag/" + name + "/page/";
      title = TAG + "：" + name + "-" + BLOG_TITLE;
      description = TAG + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/tag/:name/page/:pageNumber":
      requestUrl = new RequestBuilder()
        .setUrl(API.GET_POST_BY_TAG_URL)
        .setPathVar(name)
        .setPage(pageNumber)
        .setSize(3)
        .build()
        .toUrlString();
      pagePrefix = "/tag/" + name + "/page/";
      title = TAG + "：" + name + "-" + BLOG_TITLE;
      description = TAG + "：" + name + "-" + BLOG_TITLE;
      break;
    case "/posts/page/:pageNumber":
      requestUrl = new RequestBuilder()
        .setUrl(API.GET_POSTS_URL)
        .setPage(pageNumber)
        .setSize(3)
        .build()
        .toUrlString();
      pagePrefix = "/posts/page/";
      title = BLOG_TITLE;
      description = BLOG_TITLE;
      break;
    default:
      title = BLOG_TITLE;
      description = BLOG_TITLE;
      break;
  }
  return { requestUrl, pagePrefix, title, description };
}
