import React, { Component } from 'react'
import {
    Container, Label, LabelGroup
} from 'semantic-ui-react'
import { ServerHost } from './AppConfig'
import DivRow from './Common'
class TagComponent extends Component {
    state = {
        data: [{}]
    }
    componentDidMount() {
        const axois = require('axios').default
        axois.get(ServerHost + "/v1/api/tag/statistics/count")
            .then(
                res => {
                    const data = res.data
                    this.setState({ data: data })
                }
            )
            .catch(
                error => {
                    console.error(error)
                }
            )
    }
    renderWords = (tag, size, color) => {
        return (
            <a key={tag.value}
                style={
                    {
                        fontSize: `${size / 4.5}em`,
                        display: 'inline-block',
                        color: color,
                        fontWeight: '700',
                    }

                }
                href={"/tag/" + tag.value}
                className="tagsWord" title={tag.count > 1 ? tag.count + " posts" : tag.count + " post"}> { tag.value} </a>
        )
    }

    // render() {
    //     return (<Container fluid textAlign="justified" >
    //         <span style={{ fontWeight: '900' }}>Tags</span>
    //         <DivRow />
    //         <TagCloud tags={this.state.data}
    //             minSize={4}
    //             maxSize={9}
    //             renderer={this.renderWords}
    //         />
    //     </Container>
    //     )
    // }
    render() {
        return (<Container fluid textAlign="justified" >
            <span style={{ fontWeight: '900' }}>Tags</span>
            <DivRow />
            <LabelGroup>
                {

                    this.state.data.map((e, index) =>
                        <Label as="a" key={index} href={"/tag/" + e.value}>
                            {e.value}
                            <Label.Detail color="olive">{e.count}</Label.Detail>
                        </Label>
                    )

                }
            </LabelGroup>
        </Container>
        )
    }

}
export default TagComponent