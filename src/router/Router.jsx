import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFount";
import InternalError from "../components/Error";
import EditPost from "../components/admin/EditPost";
import AdminPostListCmp from "../components/admin/PostList";
import AdminSignIn from "../components/admin/SignIn";
import Upload from "../components/admin/Upload";
import Categories from "../components/Categories";
import Home from "../components/Home";
import OnePost from "../components/OnePost";
import Tags from "../components/Tags";
import Timeline from "../components/Timeline";
export default function BlogRouter() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/category/:name" exact>
        <Home />
      </Route>
      <Route path="/tag/:name" exact>
        <Home />
      </Route>
      <Route path="/post/page/:pageNumber" exact>
        <Home />
      </Route>
      <Route path="/category/:name/page/:pageNumber" exact>
        <Home />
      </Route>
      <Route path="/tag/:name/page/:pageNumber" exact>
        <Home />
      </Route>
      <Route path="/post/:postId" exact>
        <OnePost />
      </Route>
      <Route path="/categories" exact>
        <Categories />
      </Route>
      <Route path="/tags" exact>
        <Tags />
      </Route>
      <Route path="/timeline" exact>
        <Timeline />
      </Route>
      <Route path="/timeline/page/:pageNumber" exact>
        <Timeline />
      </Route>
      <Route path="/admin/posts" exact>
        <AdminPostListCmp />
      </Route>
      <Route path="/admin/post/page/:pageNum" exact>
        <AdminPostListCmp />
      </Route>
      <Route path="/admin/post/edit/:postId" exact>
        <EditPost />
      </Route>
      <Route path="/admin/signIn" exact>
        <AdminSignIn />
      </Route>
      <Route path="/admin/post/upload" exact>
        <Upload />
      </Route>
      <Route path="/error">
        <InternalError />
      </Route>
      <Route path="*" exact={true}>
        <NotFound />
      </Route>
    </Switch>
  );
}
