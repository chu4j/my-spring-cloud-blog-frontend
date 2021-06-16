import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Modal,
  Pagination,
  Table,
  TableHeader,
} from "semantic-ui-react";
import API from "../../data/DataUrl";
import AnimationLayout from "../AnimationLayout";
import { CustomButton } from "../Components";
import Footer from "../Footer";
import Spacing from "../Spacing";

export default function AdminPostListCmp() {
  const CreateNewPostButton = () => (
    <>
      <CustomButton
        content="Back Home"
        bold
        paddingTop={4}
        border={2}
        height={30}
        border={0}
        href="/"
      />
      <CustomButton
        content="New Post"
        paddingTop={4}
        height={30}
        href="/admin/post/edit/undefined"
        bold
        border={0}
      />
      <CustomButton
        content="Upload"
        href="/admin/post/upload"
        paddingTop={3}
        height={30}
        paddingTop={4}
        bold
        border={0}
      />
    </>
  );
  const List = (props) => (
    <>
      <Container style={{ marginTop: "100px" }} className="edit-post-container">
        <Spacing />
        {CreateNewPostButton()}
        {props.data.list && props.data.list.length > 0 && (
          <Table>
            <TableHeader>
              <Table.Row>
                <Table.HeaderCell>
                  <Icon name="bookmark" style={{ color: "#169E36" }} />
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="edit" style={{ color: "#169E36" }} />
                  Edit
                </Table.HeaderCell>
              </Table.Row>
            </TableHeader>
            <Table.Body>
              {props.data &&
                props.data.list &&
                props.data.list.length > 0 &&
                props.data.list.map((e, index) => (
                  <Table.Row key={e.id}>
                    <Table.Cell>
                      <a href={"/post/" + e.id}>{e.title}</a>
                    </Table.Cell>
                    <Table.Cell key={index}>
                      <CustomButton
                        content="Edit"
                        href={"/admin/post/edit/" + e.id}
                        height={26}
                        paddingTop={3}
                      />
                      <CustomButton
                        content="Delete"
                        height={26}
                        paddingTop={3}
                        onClick={(ev) => {
                          props.deletePostEvent(ev, e.id);
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        )}
        {props.data.totalPage > 1 && (
          <Grid textAlign="center" style={{ marginTop: "4em" }}>
            <Grid.Row columns={1}>
              <Pagination
                totalPages={props.data.totalPage}
                firstItem={null}
                lastItem={null}
                secondary
                activePage={reqPageNum}
                onPageChange={handlerPageChange}
              />
            </Grid.Row>
          </Grid>
        )}
      </Container>
    </>
  );
  const backToSignIn = () => {
    history.push("/admin/signIn");
  };
  const { pageNum } = useParams();
  const reqPageNum = pageNum ? pageNum : 1;
  const [postData, setPostData] = useState({});
  const [madalParams, setDeleteParams] = useState({});
  const history = useHistory();
  const [animationShow, setAnimationShow] = useState(false);
  //Checking Cookie
  const username = Cookies.get("username");
  const accessToken = Cookies.get("access_token");
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        backToSignIn();
      }
    }
  );
  useEffect(() => {
    if (!username && !accessToken) {
      backToSignIn();
    }
    //setSignInUsername
    axios
      .get(API.ADMIN_GET_POSTS_URL + "?page=" + reqPageNum + "&size=10", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setPostData(res.data);
        setAnimationShow(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  const handlerPageChange = (e, { activePage }) => {
    history.push("/admin/post/page/" + activePage);
  };
  const deletePostEvent = (e, deletePostId) => {
    setDeleteParams({ open: true, deletePostId: deletePostId });
  };
  const closeModal = () => {
    setDeleteParams({ open: false, deletePostId: 0 });
  };
  const confirmDeletePostEvent = (e, deletePostId) => {
    setDeleteParams({ open: false });
    axios
      .delete(API.DELETE_BY_POST_ID + deletePostId, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((data) => {
        history.push("/admin/posts");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const DeleteModal = () => (
    <>
      <Modal size="tiny" dimmer open={madalParams.open}>
        <Modal.Header>Delete Confirm?</Modal.Header>
        <Modal.Content>
          <p style={{ fontSize: "16px" }}>
            Are you sure you want to delete this post
          </p>
        </Modal.Content>
        <Modal.Actions>
          <CustomButton
            content="No"
            height={32}
            bold
            paddingTop={7}
            onClick={closeModal}
          />
          <CustomButton
            content="Yes"
            bold
            height={32}
            paddingTop={7}
            onClick={(event) => {
              confirmDeletePostEvent(event, madalParams.deletePostId);
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
  return (
    <AnimationLayout isShow={animationShow}>
      <>
        <List data={postData} deletePostEvent={deletePostEvent}></List>
        <DeleteModal />
        <Footer />
        {/* {enableDarkReader()} */}
      </>
    </AnimationLayout>
  );
}
