import React, { Component } from "react";
import Spacing from "./Spacing";
import { ServerHost } from "./Vars";
class CategoryComponent extends Component {
  state = {
    data: [{}],
  };
  componentDidMount() {
    const axois = require("axios").default;
    axois
      .get(ServerHost + "/v1/api/category/statistics/count")
      .then((res) => {
        const data = res.data;
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <>
        <span style={{ fontWeight: "900" }}>Categories : </span>
        <Spacing />
        <div className="common-label-container">
          {this.state.data.map((e, index) => (
            <a
              key={index}
              href={"/category/" + e.value}
              className="common-label"
            >
              {e.value}
              &nbsp;
              {e.count}
            </a>
          ))}
        </div>
      </>
    );
  }
}
export default CategoryComponent;
