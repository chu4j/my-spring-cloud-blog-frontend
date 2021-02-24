import { Component, React } from "react";
import { Divider, Icon } from "semantic-ui-react";
import DivRow from "./Common";

class Footer extends Component {
  render() {
    return (
      <div style={{ marginTop: "2em", textAlign: "center" }}>
        <Divider />
        <DivRow />
        <p style={{ fontWeight: "900" }}>
          build by <Icon name="react" color="yellow" size="big" />
          <b>React</b>
        </p>

        <a href="https://www.github.com/konchoo">
          <b>&copy;&nbsp;Konc Levis</b>
        </a>
      </div>
    );
  }
}
export default Footer;
