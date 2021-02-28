import { useHistory } from "react-router-dom"
import { BLOG_TITLE, CATEGORY, ServerHost, TAG } from "../components/Vars";

export function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}
export function getHomeUrl(router, name, pageNumber) {
    let requestUrl = "";
    let pagePrefix = "";
    let title = "";
    let description = "";
    const path = router.path;
    switch (path) {
        case "/":
            requestUrl = ServerHost + "/v1/api/archive";
            pagePrefix = "/posts/page/";
            title = BLOG_TITLE;
            description = BLOG_TITLE;
            break;
        case "/category/:name":
            requestUrl = ServerHost + "/v1/api/category/" + name;
            pagePrefix = "/category/" + name + "/page/";
            title = CATEGORY + "：" + name + "-" + BLOG_TITLE;
            description = CATEGORY + "：" + name + "-" + BLOG_TITLE;
            break;
        case "/category/:name/page/:pageNumber":
            requestUrl =
                ServerHost + "/v1/api/category/" + name + "?page=" + pageNumber;
            pagePrefix = "/category/" + name + "/page/";
            title = CATEGORY + "：" + name + "-" + BLOG_TITLE;
            description = CATEGORY + "：" + name + "-" + BLOG_TITLE;
            break;
        case "/tag/:name":
            requestUrl = ServerHost + "/v1/api/tag/" + name;
            pagePrefix = "/tag/" + name + "/page/";
            title = TAG + "：" + name + "-" + BLOG_TITLE;
            description = TAG + "：" + name + "-" + BLOG_TITLE;
            break;
        case "/tag/:name/page/:pageNumber":
            requestUrl = ServerHost + "/v1/api/tag/" + name + "?page=" + pageNumber;
            pagePrefix = "/tag/" + name + "/page/";
            title = TAG + "：" + name + "-" + BLOG_TITLE;
            description = TAG + "：" + name + "-" + BLOG_TITLE;
            break;
        case "/posts/page/:pageNumber":
            requestUrl = ServerHost + "/v1/api/archive?page=" + pageNumber;
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