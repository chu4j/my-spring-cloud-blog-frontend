/*
Remember to change ServerHost as your server domain or ip
if you deploy project to your product server
 */
// export const ServerHost = "http://localhost:9000";
export const ServerHost = "https://data.zhuqigong.xyz";
export const BLOG_TITLE = "zhuqigong.xyz";
export const CATEGORY = "categories";
export const TAG = "tags";
export const POSTS = "Posts";
export const CATAGORY_STATISTICS_URL =
  ServerHost + "/v1/api/category/statistics/count";
export const TAG_STATISTICS_URL = ServerHost + "/v1/api/tag/statistics/count";
export const TIMELINE_API_URL = ServerHost + "/v1/api/archive/timeline";
export const NOT_FOUND_URL = "/404";
export const SEARCH_URL = ServerHost + "/v1/api/archive/search/";
export const MENU_HOME = "Home";
export const MENU_ARCHIVES = "Archives";
export const MENU_CATEGORIES = "Categories";
export const MENU_TAGS = "Tags";
export const MENU_ABOUT = "About";
export const TITLE_404 = "Not Found";
export const TITLE_500 = "Internal Server Error";
