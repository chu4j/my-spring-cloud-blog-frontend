import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  Table,
  TableHeader,
} from "semantic-ui-react";
import { ApiDelete, ApiGet } from "../../data/ApiGet";
import API from "../../data/DataUrl";
import RequestBuilder from "../../util/RequestBuilder";

export default function AdminPostListCmp() {
  const List = (props) => (
    <>
      <Container style={{ marginTop: "9em" }}>
        <Table celled striped padded>
          <TableHeader>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Operation</Table.HeaderCell>
          </TableHeader>
          <Table.Body>
            {props.data &&
              props.data.list &&
              props.data.list.length > 0 &&
              props.data.list.map((e, index) => (
                <>
                  <Table.Row>
                    <Table.Cell>
                      <a href={"/post/" + e.id}>{e.title}</a>
                    </Table.Cell>
                    <Table.Cell>
                      <Button as="a" color="blue" secondary size="tiny">
                        <a href={"/admin/post/edit/" + e.id}> Edit</a>
                      </Button>
                      <Button
                        color="red"
                        size="tiny"
                        onClick={(ev) => {
                          props.deletePostEvent(ev, e.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
  const [postData, setPostData] = useState({});
  const [madalParams, setDeleteParams] = useState({});
  useEffect(() => {
    ApiGet(
      new RequestBuilder()
        .setPage(1)
        .setSize(10)
        .setUrl(API.GET_POSTS_URL)
        .build()
        .toUrlString()
    )
      .then((res) => setPostData(res))
      .catch((e) => {
        console.error(e);
      });
  }, []);
  const deletePostEvent = (e, deletePostId) => {
    setDeleteParams({ open: true, deletePostId: deletePostId });
  };
  const closeModal = () => {
    setDeleteParams({ open: false, deletePostId: 0 });
  };
  const confirmDeletePostEvent = (e, deletePostId) => {
    setDeleteParams({ open: false });
    ApiDelete(
      new RequestBuilder()
        .setUrl(API.DELETE_BY_POST_ID)
        .setPathVar(deletePostId)
        .build()
        .toUrlString()
    )
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const DeleteModal = () => (
    <>
      <Modal size="mini" open={madalParams.open}>
        <Modal.Header>Delete Your Post Confirm?</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your post</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeModal}>
            No
          </Button>
          <Button
            positive
            onClick={(event) => {
              confirmDeletePostEvent(event, madalParams.deletePostId);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
  return (
    <>
      <List data={postData} deletePostEvent={deletePostEvent}></List>
      <DeleteModal />
    </>
  );
}
