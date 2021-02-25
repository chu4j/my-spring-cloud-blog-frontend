import { Component, React } from "react";
import { Divider, Icon } from "semantic-ui-react";
import Spacing from "./Spacing";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <Divider />
        <Spacing />
        <p>
          build by <Icon name="react" color="yellow" size="big" />
          <a href="https://github.com/facebook/react">
            <b>React</b>
          </a>
        </p>

        <a href="https://www.github.com/konchoo">&copy;&nbsp;konchoo</a>
      </div>
    );
  }
}
export default Footer;
