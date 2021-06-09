import React, { useEffect, useState } from "react";
import { Divider, Icon, Loader } from "semantic-ui-react";
import API from "../data/DataUrl";
import { ServerHost } from "./Vars";
export default function CategoriesWidget() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const axois = require("axios").default;
    axois
      .get(API.GET_CATEGORIES_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("error" + error.response.data);
      });
    setShow(true);
  }, []);
  return (
    <>
      <div className="widget-container">
        <span style={{ fontWeight: "900" }} className="title">
          <Icon name="bookmark" style={{ color: "#169E36" }} />
          Categories
        </span>
        <Divider />
        <div>
          {console.log(data)}
          {data && data.length > 0 ? (
            data.map((e, index) => (
              <a
                key={index}
                href={"/category/" + e.category}
                className="widget-label"
              >
                {e.category}
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
