import React, { useEffect, useState } from "react";
import { Icon, Loader } from "semantic-ui-react";
import Spacing from "./Spacing";
import { ServerHost } from "./Vars";
export default function CategoriesWidget() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const axois = require("axios").default;
    axois
      .get(ServerHost + "/v1/api/category/statistics/count")
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
      <div className="common-label-container">
        <span style={{ fontWeight: "900" }}>
          <Icon name="bookmark" style={{ color: "#52C75F" }} />
          Categories
        </span>
        <Spacing />
        <div>
          {data && data.length > 0 ? (
            data.map((e, index) => (
              <a
                key={index}
                href={"/category/" + e.value}
                className="common-label"
              >
                {e.value}
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
