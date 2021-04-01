import { Component, React } from "react";
import { Divider, Icon } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <Divider />
        <p>
          <a href="/">
            <img src="/logo.svg" alt="logo" width={70} height={70} />
          </a>
        </p>
        <p>
          build by <Icon name="react" color="teal" size="big" />
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
