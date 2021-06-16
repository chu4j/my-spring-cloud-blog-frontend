import { Component, React } from "react";
import { Divider, Icon } from "semantic-ui-react";
import Spacing from "./Spacing";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        {/* <p className="logo">
          <a href="/">
            <img src="/logo.svg" alt="logo" width={48} height={48} />
          </a>
        </p>
        <p>
          build with <Icon name="react" color="teal" />
          <a href="https://github.com/facebook/react">
            <b>React</b>
          </a>
        </p>
        <p>
          <a href="https://www.github.com/zhuqigong">
            <Icon color="green" name="github" size="big" />
            @zhuqigong
          </a>
        </p> */}
        {/* <Divider /> */}
        <Divider />
        <div>
          <div className="footer-website-name">
            <a href="/">Canteen</a>
          </div>
          <Spacing />
          <div className="footer-website-info">
            <p>
              Copyright &copy; zhuqigong.xyz 2021
              {/* <a href="https://www.github.com/zhuqigong"> @zhuqigong</a> */}
            </p>
            <p>
              build with <Icon name="react" color="teal" />
              <a href="https://github.com/facebook/react">
                <b>React</b>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
