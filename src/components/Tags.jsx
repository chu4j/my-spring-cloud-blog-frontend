import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Icon, Table } from "semantic-ui-react";
import { ApiGet } from "../data/ApiGet";
import AnimationLayout from "./AnimationLayout";
import DefaultLayout from "./DefaultLayout";
import HeadMeta from "./Meta";
import { BLOG_TITLE, TAG, TAG_STATISTICS_URL } from "./Vars";

export default function Tags() {
  const [data, setDataState] = useState([]);
  const [show, setShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    ApiGet(TAG_STATISTICS_URL)
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
                    <Table.HeaderCell>
                      <Icon name="tag" style={{ color: "#52C75F" }} />
                      Tags
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.map((e, index) => (
                    <>
                      <Table.Row key={index}>
                        <Table.Cell>
                          <a
                            style={{ display: "inline-block", width: "100%" }}
                            href={"/tag/" + e.value}
                          >
                            {e.value}&nbsp;&nbsp;({e.count})
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    </>
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
