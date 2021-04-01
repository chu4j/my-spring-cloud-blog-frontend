import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
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
        console.log("error" + error.response.data);
      });
  }
  render() {
    return (
      <>
        <div className="common-label-container">
          <span style={{ fontWeight: "900" }}>
            <Icon name="bookmark" style={{ color: "#52C75F" }} />
            Categories
          </span>
          <Spacing />
          <div>
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
        </div>
      </>
    );
  }
}
export default CategoryComponent;
