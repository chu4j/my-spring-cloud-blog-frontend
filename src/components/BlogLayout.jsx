import { Container, Grid } from "semantic-ui-react";
import Header from "./BlogHeader";
import DivRow from "./Common";
import Footer from './Footer'
export default function BlogLayout(props) {
    return (
        <>
            <Container fluid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {
                            props.CategoryComponent &&
                            props.TagComponent &&
                            <Grid.Column width={4}>{props.CategoryComponent}<DivRow /><DivRow /><DivRow />{props.TagComponent}</Grid.Column>
                        }
                        {
                            props.CategoryComponent && props.TagComponent && props.ContentComponent ?
                                <Grid.Column width={12}>{props.ContentComponent}</Grid.Column>
                                :
                                <Grid.Column width={16}>{props.ContentComponent}</Grid.Column>
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <Footer />
                    </Grid.Row>
                </Grid>

            </Container>
        </>

    )
}