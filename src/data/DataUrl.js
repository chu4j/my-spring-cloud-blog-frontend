// const API = {
//   SERVER_URL: "http://localhost:9000",
//   GET_POSTS_URL: "http://localhost:9000/v1/api/archive",
//   GET_POST_BY_ID_URL: "http://localhost:9000/v1/api/archive/",
//   GET_POST_BY_TITLE_URL: "",
//   GET_POST_BY_CATEGORY_URL: "http://localhost:9000/v1/api/category/",
//   GET_POST_BY_TAG_URL: "http://localhost:9000/v1/api/tag/",
//   GET_CATEGORIES_URL: "http://localhost:9000/v1/api/category/statistics/count",
//   GET_TAGS_URL: "http://localhost:9000/v1/api/tag/statistics/count",
//   GET_TIMELINE_URL: "http://localhost:9000/v1/api/archive/timeline",
//   MAX_PAGE: "10",
//   MIN_PAGE: "3",
// };
const SERVER_URL = "http://localhost:8084";
// const SERVER_URL = "https://data.zhuqigong.xyz";
const API = {
  GET_POSTS_URL: SERVER_URL + "/blog/posts",
  GET_POST_BY_ID_URL: SERVER_URL + "/blog/post/id/",
  GET_POST_BY_TITLE_URL: "",
  GET_POST_BY_CATEGORY_URL: SERVER_URL + "/blog/category/",
  GET_POST_BY_TAG_URL: SERVER_URL + "/blog/tag/",
  GET_CATEGORIES_URL: SERVER_URL + "/blog/categories",
  GET_TAGS_URL: SERVER_URL + "/blog/tags",
  GET_TIMELINE_URL: SERVER_URL + "/blog/tiny/posts",
  MAX_PAGE: "10",
  MIN_PAGE: "3",
};
export default API;
