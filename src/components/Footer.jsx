import { Component, React } from "react";
import { Container, Divider, Icon } from "semantic-ui-react";

class Footer extends Component {

    render() {
        return (
            <Container fluid textAlign="center" style={{marginTop:'2em'}}>
                <Divider />
                <p style={{ fontWeight: '900' }}>build by <Icon name="react" color="yellow" size="big" /><b>React</b></p>

                <a href="https://www.github.com/konchoo"><Icon name="github" color="yellow" />@konchoo</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a><Icon name="google" color="yellow"></Icon>konchoo.us@gmail.com</a>

            </Container>
        )
    }
}
export default Footer