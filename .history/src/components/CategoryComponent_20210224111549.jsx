import React, { Component } from "react";
import { Label } from "semantic-ui-react";
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
        <span>Categories</span>
        <DivRow />
        <div>
          {this.state.data.map((e, index) => (
            <Label as="a" key={index} href={"/category/" + e.value}>
              {e.value}
              <Label.Detail color="olive">{e.count}</Label.Detail>
            </Label>
          ))}
        </div>
      </>
    );
  }
}
export default CategoryComponent;
