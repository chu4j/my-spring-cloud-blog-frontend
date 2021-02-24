import React, { Component } from "react";
import { ServerHost } from "./AppConfig";
import DivRow from "./Common";
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
        console.log(error);
      });
    console.log("category card render");
  }
  render() {
    return (
      <>
        <span>Categories : </span>
        <DivRow />
        <div className="common-label-container">
          {this.state.data.map((e, index) => (
            <a key={index} href={"/category/" + e.value} className="common-label">
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
