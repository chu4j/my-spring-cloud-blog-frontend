import { Component, React } from "react";
import { Divider, Icon } from "semantic-ui-react";
import Spacing from "./Spacing";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <Spacing />
        <p>
          <a href="/">
            <img src="/logo38x38.png" alt="logo" width={38} height={38} />
            &nbsp;
          </a>
        </p>

        <p>
          build with <Icon name="react" color="teal" />
          <a href="https://github.com/facebook/react">
            <b>React</b>
          </a>
        </p>
        <p>
          <a href="https://www.github.com/konchoo">
            <Icon name="github square" />
            konchoo
            <Icon name="heart" color="red" size="small" />
          </a>
        </p>
        <p>Copyright &copy; 2021 zhuqigong.xyz.All rights reserved.</p>
      </div>
    );
  }
}
export default Footer;
