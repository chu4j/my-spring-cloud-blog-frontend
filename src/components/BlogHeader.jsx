import { enable as enableDarkReader } from "darkreader";
import React, { Component } from 'react';
import {
    Container,
    Header,
    Menu,

    Visibility
} from 'semantic-ui-react';
import '../css/main.css';
const style = {
    h1: {
        marginTop: '3em',
    },
    h3: {
        marginTop: '2em',
        padding: '2em 0em',
    }

};
const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '4em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const overlayStyle = {
    float: 'left',
    margin: '0em 3em 1em 0em',
}

const fixedOverlayStyle = {
    ...overlayStyle,
    position: 'fixed',
    top: '80px',
    zIndex: 10,
}

const overlayMenuStyle = {
    position: 'relative',
    left: 0,
    transition: 'left 0.5s ease',
}

const fixedOverlayMenuStyle = {
    ...overlayMenuStyle,
    left: '800px',
}

class BlogHeader extends Component {
    state = {
        activeItem: 'home',
        menuFixed: false,
        overlayFixed: false,
    }
    stickOverlay = () => this.setState({ overlayFixed: true })

    stickTopMenu = () => this.setState({ menuFixed: true })

    unStickOverlay = () => this.setState({ overlayFixed: false })

    unStickTopMenu = () => this.setState({ menuFixed: false })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem, menuFixed, overlayFixed, overlayRect } = this.state
        return (
            <div>
                <Container fluid>
                    <Header as='h1' content="Konc 's Blog" style={style.h1} textAlign='center' />
                    <Header as='h4' content='To be or not to be' style={style.h3} textAlign='center' />
                    <Visibility
                        onBottomPassed={this.stickTopMenu}
                        onBottomVisible={this.unStickTopMenu}
                        once={false}
                    />
                    <Menu
                        borderless
                        fixed={menuFixed ? 'top' : undefined}
                        style={menuFixed ? fixedMenuStyle : menuStyle}
                        secondary pointing
                    >
                        <Menu.Item
                            as="a"
                            name='home'
                            active={activeItem === 'home'}
                            onClick={this.handleItemClick}
                            position="right"
                            link
                            href="/"
                        >
                        </Menu.Item>
                        <Menu.Item
                            name='archives'
                            active={activeItem === 'archives'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='categories'
                            active={activeItem === 'categories'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='tags'
                            active={activeItem === 'tags'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='about'
                            active={activeItem === 'about'}
                            onClick={this.handleItemClick}
                        />
                        <a onLoad={enableDarkReader({
                                brightness: 100,
                                contrast: 105,
                                sepia: 25,
                            })}></a>
                    </Menu>
                    <Visibility
                        offset={80}
                        once={false}
                        onTopPassed={this.stickOverlay}
                        onTopVisible={this.unStickOverlay}
                        style={overlayFixed ? { ...overlayStyle, ...overlayRect } : {}} />
                </Container>

            </div>
        )
    }
}

export default BlogHeader