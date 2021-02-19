import React, { Component } from "react";
import { Container, Label, LabelGroup } from "semantic-ui-react";
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

  renderWords = (tag, size, color) => {
    return (
      <a
        key={tag.value}
        style={{
          //  animation: 'blinker 3s linear infinite',
          //  animationDelay: `${Math.random() * 2}s`,
          fontSize: `${size / 5}em`,

          display: "inline-block",
          color: color,
          fontWeight: "900",
        }}
        href={"/category/" + tag.value}
        className="tagsWord"
        title={tag.count > 1 ? tag.count + " posts" : tag.count + " post"}
      >
        {tag.value}{" "}
      </a>
    );
  };

  // render() {
  //     return (<Container fluid textAlign="justified" >
  //         <span style={{ fontWeight: '900' }}>Categories</span>
  //         <DivRow />
  //         <TagCloud tags={this.state.data}
  //             minSize={5}
  //             maxSize={10}
  //             renderer={this.renderWords}
  //             key="categoryTagCloud"
  //         />

  //     </Container>
  //     )
  // }
  render() {
    return (
      <Container fluid textAlign="justified">
        <span style={{ fontWeight: "900" }}>Categories</span>
        <DivRow />
        <LabelGroup>
          {this.state.data.map((e, index) => (
            <Label as="a" key={index} href={"/category/" + e.value}>
              {e.value}
              <Label.Detail color="olive">{e.count}</Label.Detail>
            </Label>
          ))}
        </LabelGroup>
      </Container>
    );
  }
}
export default CategoryComponent;
