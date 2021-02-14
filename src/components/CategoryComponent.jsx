import React, { Component } from 'react'
import { TagCloud } from 'react-tagcloud'
import {
    Container,
    Icon
} from 'semantic-ui-react'
import { ServerHost } from './AppConfig'
import DivRow from './Common'
class CategoryComponent extends Component {
    state = {
        data: [{}]
    }
    componentDidMount() {
        const axois = require('axios').default
        axois.get(ServerHost + "/v1/api/category/statistics/count")
            .then(
                res => {
                    const data = res.data
                    this.setState({ data: data })
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
            console.log("category card render")
    }

    renderWords = (tag, size, color) => {
        return (
            <a 
                style={
                    {
                        //  animation: 'blinker 3s linear infinite',
                        //  animationDelay: `${Math.random() * 2}s`,
                        fontSize: `${size / 5}em`,

                        display: 'inline-block',
                        //color: color,
                        fontWeight: '900',

                    }

                }
                href={"/category/" + tag.value}
                className="tagsWord" title={tag.count > 1 ? tag.count + " posts" : tag.count + " post"}>{tag.value} </a>
        )
    }

    render() {
        return (<Container fluid textAlign="justified" >
            <span style={{ fontWeight: '900' }}> <Icon name="linkify" color="blue" size="big" />Categories</span>
            <DivRow />
            <TagCloud tags={this.state.data}
                minSize={5}
                maxSize={10}
                renderer={this.renderWords}
                disableRandomColor
            />

        </Container>
        )
    }

}
export default CategoryComponent