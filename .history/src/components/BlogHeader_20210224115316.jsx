import React, { Component } from "react";
import { Container, Menu, Visibility } from "semantic-ui-react";
const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "4em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};

class BlogHeader extends Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    return (
      <Container fluid>
        <Menu borderless fixed="top" pointing secondary className="blog-header">
          <Menu.Item
            as="a"
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
            link
            href="/"
          ></Menu.Item>
          <Menu.Item
            as="a"
            name="archives"
            active={activeItem === "archives"}
            onClick={this.handleItemClick}
            link
            href="/posts/timeline"
          />
          <Menu.Item
            as="a"
            name="categories"
            active={activeItem === "categories"}
            onClick={this.handleItemClick}
            link
            href="/categories"
          />
          <Menu.Item
            name="tags"
            active={activeItem === "tags"}
            onClick={this.handleItemClick}
            as="a"
            href="/tags"
          />
          <Menu.Item
            name="about"
            active={activeItem === "about"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Container>
    );
  }
}

export default BlogHeader;
