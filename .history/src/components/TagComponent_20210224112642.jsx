import React, { Component } from "react";
import { Container, Label, LabelGroup } from "semantic-ui-react";
import { ServerHost } from "./AppConfig";
import DivRow from "./Common";
class TagComponent extends Component {
  state = {
    data: [{}],
  };
  componentDidMount() {
    const axois = require("axios").default;
    axois
      .get(ServerHost + "/v1/api/tag/statistics/count")
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
        <span>Categories</span>
        <DivRow />
        <div>
          {this.state.data.map((e, index) => (
            <a
              key={index}
              href={"/tag/" + e.value}
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
export default TagComponent;
