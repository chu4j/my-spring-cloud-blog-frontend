import { Route, Switch } from "react-router-dom";
import NotFound from "../components/404";
import InternalError from "../components/500";
import Categories from "../components/Categories";
import DefaultLayout from "../components/DefaultLayout";
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
      <Route path="/posts/page/:pageNumber">
        <Home />
      </Route>
      <Route path="/category/:name/page/:pageNumber">
        <Home />
      </Route>
      <Route path="/tag/:name/page/:pageNumber">
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
      <Route path="/posts/timeline" exact>
        <Timeline />
      </Route>
      <Route path="/posts/timeline/page/:pageNumber" exact>
        <Timeline />
      </Route>
      <Route path="/500">
        <InternalError />
      </Route>
      <Route path="*" exact={true}>
        <NotFound />
      </Route>
    </Switch>
  );
}
