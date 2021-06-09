import React, { useEffect, useState } from "react";
import { Divider, Icon, Loader } from "semantic-ui-react";
import API from "../data/DataUrl";
export default function TagsWidget() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const axois = require("axios").default;
    axois
      .get(API.GET_TAGS_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setShow(true);
  }, []);
  return (
    <>
      <div className="widget-container widget-tags-container">
        <span style={{ fontWeight: "900" }} className="title">
          <Icon name="tag" style={{ color: "#169E36" }} />
          Tags
        </span>
        <Divider />
        <div>
          {data && data.length > 0 ? (
            data.map((e, index) => (
              <a key={index} href={"/tag/" + e.tag} className="widget-label">
                {e.tag}
                &nbsp;
                {e.count}
              </a>
            ))
          ) : (
            <Loader style={{ marginTop: "1em" }} active inline="centered" />
          )}
        </div>
      </div>
    </>
  );
}
