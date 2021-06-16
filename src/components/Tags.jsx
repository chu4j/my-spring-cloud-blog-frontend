import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Icon, Table } from "semantic-ui-react";
import { ApiGet } from "../data/ApiGet";
import API from "../data/DataUrl";
import AnimationLayout from "./AnimationLayout";
import { BLOG_TITLE, TAG } from "./Contansts";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";

export default function Tags() {
  const [data, setDataState] = useState([]);
  const [show, setShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    ApiGet(API.GET_TAGS_URL)
      .then((res) => {
        setDataState(res);
        setShow(true);
      })
      .catch((error) => {
        console.error(error);
        history.push("/");
      });
  }, []);
  return (
    <>
      {data && data.length > 0 && (
        <DefaultLayout>
          <AnimationLayout isShow={show}>
            <Container className="tags-container">
              <HeadMeta title={TAG + "-" + BLOG_TITLE} />
              <Table className="common-table" selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell style={{ fontFamily: "sohne" }}>
                      <Icon name="tag" style={{ color: "#169E36" }} />
                      Tags
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.map((e, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <a
                          style={{ display: "inline-block", width: "100%" }}
                          href={"/tag/" + e.tagName}
                        >
                          {e.tagName}&nbsp;&nbsp;({e.count})
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
