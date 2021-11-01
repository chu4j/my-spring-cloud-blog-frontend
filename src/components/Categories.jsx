import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Container, Icon, Table} from "semantic-ui-react";
import {ApiGet} from "../data/ApiGet";
import API from "../data/DataUrl";
import AnimationLayout from "./AnimationLayout";
import {BLOG_TITLE, CATEGORY} from "./Contansts";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";

export default function Categories() {
    const [data, setDataState] = useState([]);
    const [show, setShow] = useState(false);
    const his = useHistory();
    useEffect(() => {
        ApiGet(API.GET_CATEGORIES_URL)
            .then((res) => {
                setDataState(res);
                setShow(true);
            })
            .catch((error) => {
                his.push("/error");
            });
    }, []);
    return (
        <>
            {data && data.length > 0 && (
                <DefaultLayout>
                    <AnimationLayout isShow={show}>
                        <Container className="categories-container">
                            <HeadMeta title={CATEGORY + "-" + BLOG_TITLE}/>
                            <Table selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell style={{fontFamily: "sohne"}}>
                                            <Icon name="bookmark" style={{color: "#169E36"}}/>
                                            Categories
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {data.map((e, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                <a
                                                    style={{display: "inline-block", width: "100%"}}
                                                    href={"/category/" + e.categoryName}
                                                >
                                                    {e.categoryName}&nbsp;&nbsp;({e.count})
                                                </a>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Container>
                    </AnimationLayout>
                </DefaultLayout>
            )}
        </>
    );
}
