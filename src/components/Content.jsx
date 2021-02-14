import { React } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory, withRouter } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { Container, Grid, Header, Icon, Pagination } from "semantic-ui-react";
import DivRow from './Common';


const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={github} language={language} children={value} />
    }
}

function ArchiveContent(props) {
    const history = useHistory()
    const handlePaginationClick = (e, { activePage }) => {
        const url = props.pagePrefix + activePage
        history.push(url)
    }
    return (
        <Container fluid textAlign="left">
            {props.response.list && props.response.list.map((a, index) =>
                <div className="postContainer" style={index > 0 ? { marginTop: '3em' } : {}}>
                    <Header className="postHeader" as="a" textAlign="left" href="#" style={{fontSize:'1.5em',fontWeight:'900'}}>
                        {a.title}
                    </Header>
                    <DivRow />
                    <ReactMarkdown renderers={renderers} children={a.content} plugins={[remarkGfm]}>
                    </ReactMarkdown>
                    <DivRow />
                    {
                        a.category && a.tag &&

                        <>
                            <Container fluid>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={5}>

                                            {a.category.map(c =>

                                                <> <span><Icon name="linkify" color="blue" /><a href={"/category/" + c.category} style={{ fontWeight: '900' }}>{c.category}</a></span></>
                                            )
                                            }
                                        </Grid.Column>

                                        <Grid.Column width={11}>
                                            {
                                                a.tag.map(t =>
                                                    <> <span><Icon name="hashtag" color="yellow" /><a href={"/tag/" + t.tag} style={{ fontWeight: '900' }}>{t.tag}</a></span></>
                                                )
                                            }
                                        </Grid.Column>
                                    </Grid.Row>

                                </Grid>

                            </Container>
                        </>
                    }
                    <DivRow />
                    <DivRow />
                </div>

            )
            }
            {props.response.totalPage > 1 && <Container fluid textAlign="center" style={{ marginTop: '2em' }}>
                <Pagination totalPages={props.response.totalPage} firstItem={null} lastItem={null}
                    pointing secondary activePage={props.activePage} onPageChange={handlePaginationClick} />
            </Container>}

        </Container>

    )

}
export default withRouter(ArchiveContent)