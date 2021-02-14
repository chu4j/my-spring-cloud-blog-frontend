import { Component, React } from "react";
import { Container, Divider, Header, Icon } from "semantic-ui-react";

class Footer extends Component {

    render() {
        return (
            <Container fluid textAlign="center">
                <Divider/>
               <p style={{fontWeight:'900'}}>build by <Icon name="react" color="yellow" size="big"/><b>React</b> & </p>
               <Header  as="h5">
               <a href="https://www.github.com/konchoo"><Icon name="github" color="yellow"/>@konchoo</a>
               <p></p>
               </Header>
               <Header as="h5">
                <a><Icon name="mail" color="yellow"></Icon>konchoo.us@gmail.com</a>
               </Header>
            </Container>
        )
    }
}
export default Footer