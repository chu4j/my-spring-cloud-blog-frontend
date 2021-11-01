// const SERVER_URL = "http://localhost:8084";
const SERVER_URL = "https://www.zhuqigong.xyz:8443";
// const SERVER_URL = "http://localhost:8084";
const API = {
    GET_POSTS_URL: SERVER_URL + "/blog/posts",
    GET_POST_BY_ID_URL: SERVER_URL + "/blog/post/id/",
    GET_POST_BY_TITLE_URL: "",
    GET_POST_BY_CATEGORY_URL: SERVER_URL + "/blog/category/",
    GET_POST_BY_TAG_URL: SERVER_URL + "/blog/tag/",
    GET_CATEGORIES_URL: SERVER_URL + "/blog/categories",
    GET_TAGS_URL: SERVER_URL + "/blog/tags",
    GET_TIMELINE_URL: SERVER_URL + "/blog/tiny/posts",
    DELETE_BY_POST_ID: SERVER_URL + "/admin/post/delete/id/",
    FORMAT_MARKDOWN_TO_HTML: SERVER_URL + "/admin/markdown/compileToHtml",
    SAVE_MARKDOWN_URL: SERVER_URL + "/admin/post/create",
    ADMIN_SIGN_IN: SERVER_URL + "/admin/signIn",
    ADMIN_GET_POSTS_URL: SERVER_URL + "/admin/posts",
    ADMIN_POSTS_UPLOAD_URL: SERVER_URL + "/admin/post/upload",
    GET_TABLE_NAME: SERVER_URL + "/blog/table/tables",
    DOWNLOAD_MYSQL_DICT: SERVER_URL + "/blog/table/download",
    MAX_PAGE: "10",
    MIN_PAGE: "3",
};
export default API;
