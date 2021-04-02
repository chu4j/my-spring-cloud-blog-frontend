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
            <img src="/logo48x48.png" alt="logo" width={48} height={48} />
            &nbsp;
          </a>
          <b>風立ちぬ、いざ生きめやも。</b>
        </p>
        <Divider />
        <p>
          build with <Icon name="react" color="teal" size="big" />
          <a href="https://github.com/facebook/react">
            <b>React</b>
          </a>
        </p>
        <a href="https://www.github.com/konchoo">
          &copy;&nbsp;konchoo <Icon name="heart" color="red" size="small" />
        </a>
      </div>
    );
  }
}
export default Footer;
