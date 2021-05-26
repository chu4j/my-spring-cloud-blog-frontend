export async function ApiGet(url) {
  if (!url) return null;
  else {
    const axois = require("axios").default;
    return axois.get(url).then((x) => {
      return x.data;
    });
  }
}
export async function ApiDelete(url) {
  if (!url) return null;
  else {
    const axios = require("axios").default;
    return axios.delete(url).then((x) => {
      return x.data;
    });
  }
}
export async function ApiPost(url) {
  if (!url) return null;
  else {
    const axios = require("axios").default;
    return axios.post(url).then((x) => {
      return x.data;
    });
  }
}
