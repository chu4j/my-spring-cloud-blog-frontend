import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { Container, Icon, Table } from "semantic-ui-react";
import { ApiGet } from "../data/ApiGet";
import AnimationLayout from "./AnimationLayout";
import { TIMELINE_API_URL } from "./Vars";

export default function PostArchives() {
  let { pageNumber } = useParams();
  pageNumber = pageNumber ? pageNumber : 1;
  const [data, setDataState] = useState([]);
  const [show, setShow] = useState(false);
  const url = TIMELINE_API_URL + "?page=" + pageNumber;
  useEffect(() => {
    ApiGet(url).then((res) => {
      setDataState(res);
      setShow(true);
    });
  }, []);
  return (
    <>
      <AnimationLayout isShow={show}>
        <Container>
          <Table className="common-table-1" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Icon name="hourglass" color="teal" />
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="bookmark" color="teal" />
                  Title
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.list &&
                data.list.map((e, index) => (
                  <>
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Moment fromNow>{e.time}</Moment>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          href={"/post/" + e.serialNumber}
                          style={{ display: "inline-block", width: "100%" }}
                        >
                          {e.title}
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))}
            </Table.Body>
          </Table>
        </Container>
      </AnimationLayout>
    </>
  );
}
