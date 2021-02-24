import { Component, React } from "react";
import { Divider, Header, Icon } from "semantic-ui-react";
import DivRow from "./Common";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <Divider />
        <DivRow />
        <Header as="h5" color="blue">
          <p>
            build by <Icon name="react" color="yellow" size="big" />
            <a href="#">
              <b>React</b>
            </a>
          </p>
        </Header>
        <Header as="h5">
          <a href="https://www.github.com/konchoo">
            <b>&copy;&nbsp;Konc Levis</b>
          </a>
        </Header>
      </div>
    );
  }
}
export default Footer;
