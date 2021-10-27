import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Form, Grid, Header, TextArea } from "semantic-ui-react";
import API from "../../data/DataUrl";
import { CustomButton } from "../Components";
import Spacing from "../Spacing";
export default function EditPost() {
  const axios = require("axios").default;
  const history = useHistory();
  const $ = require("jquery");
  $(() => {
    const ele = document.querySelectorAll("pre code");
    if (undefined !== ele && null !== ele) {
      ele.forEach((block) => {
        window.hljs.highlightBlock(block);
      });
    }
  });
  const backToSignIn = () => {
    history.push("/admin/signIn");
  };
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
  const [markdwonHtml, setMarkdownHtml] = useState("");
  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    content: "",
    categories: "",
    tags: "",
    publishTime: "",
  });
  const defaultMarkdownContent = `---
title: markdown title
date: 1970-01-01
author: konchoo
categories:
 - category1
 - category2
tags:
 - tag1
 - tag2
---`;
  const [title, setTitle] = useState();
  const [content, setContent] = useState(defaultMarkdownContent);
  const { postId } = useParams();
  const signInUsername = Cookies.get("username");
  const accessToken = Cookies.get("access_token");
  useEffect(() => {
    if (!signInUsername && !accessToken) {
      backToSignIn();
    }
    if ("undefined" != postId) {
      axios
        .get(API.GET_POST_BY_ID_URL + postId, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          const title = res.data.title;
          const content = res.data.content;
          const publishTime = res.data.publishTime;
          const categories = Array.from(res.data.categories)
            .map((x) => x.categoryName)
            .join("#")
            .toString();
          const tags = Array.from(res.data.tags)
            .map((x) => x.tagName)
            .join("#")
            .toString();
          setNewPost({
            id: postId,
            title: title,
            content: content,
            categories: categories,
            tags: tags,
            publishTime: publishTime,
          });
          setTitle(res.data.title);
          setContent(res.data.content);
          setMarkdownHtml(res.data.contentBody);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  const previewMarkdownEvent = () => {
    const params = new URLSearchParams();
    params.append("markdownText", content);
    axios
      .post(API.FORMAT_MARKDOWN_TO_HTML, params, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setMarkdownHtml(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const saveMarkdownEvent = () => {
    const params = new URLSearchParams();
    if ("undefined" != postId) params.append("id", postId);
    if (title != "") params.append("title", title);
    if (content != "") params.append("content", content);
    axios
      .post(API.SAVE_MARKDOWN_URL, params, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        history.push("/admin/post/edit/" + res.data.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const PostInfoForm = () => (
    <>
      <Container>
        <Form>
          <Form.Group widths="4">
            <Form.Input
              label="Title"
              placeholder="Markdown title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Input>
            <Form.Input
              label="Categories"
              placeholder="Categories"
              disabled
              value={newPost.categories}
              onChange={(e) => setNewPost({ categories: e.target.value })}
            ></Form.Input>
            <Form.Input
              label="Tags"
              placeholder="Tags"
              disabled
              value={newPost.tags}
              onChange={(e) => setNewPost({ tags: e.target.value })}
            ></Form.Input>
            <Form.Input
              label="Publish Time"
              placeholder="Publish Time"
              disabled
              value={newPost.publishTime}
              onChange={(e) => setNewPost({ publishTime: e.target.value })}
            ></Form.Input>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
  const Cmp = () => (
    <>
      <Container fluid style={{ margin: "5em 1em 0 1em" }}>
        <Grid>
          <Grid.Row textAlign="center">
            <Grid.Column width={16} textAlign="center">
              <Header as="h1" textAlign="center">
                Edit Your Markdown
              </Header>
              <Spacing />
              {PostInfoForm()}
              <CustomButton
                content="preview"
                height={32}
                border={0}
                onClick={previewMarkdownEvent}
              />
              <CustomButton
                content="save markdown"
                height={32}
                onClick={saveMarkdownEvent}
              />
              <CustomButton
                content="target"
                height={32}
                href={"/post/" + postId}
              />
              <CustomButton
                content="Back manage page"
                height={32}
                href="/admin/posts"
              />
              <Spacing />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              {/* markdown content area */}
              <TextArea
                key="markdown-area"
                className="markdown-area"
                placeholder="Write your markdown in hear ..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></TextArea>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              {/* html content area */}
              <div className="markdown-body">
                <div dangerouslySetInnerHTML={{ __html: markdwonHtml }}></div>
              </div>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={7} textAlign="center"></Grid.Column>
            <Grid.Column width={7}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
  return (
    <>
      {Cmp()}
      {/* {enableDarkReader()} */}
    </>
  );
}
