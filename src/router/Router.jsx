import { Route, Switch } from "react-router-dom";
import NotFound from "../components/404";
import InternalError from "../components/500";
import CategoryTable from "../components/CategoryTable";
import DefaultLayout from "../components/DefaultLayout";
import Home from "../components/Home";
import OnePost from "../components/OnePost";
import TagTable from "../components/TagTable";
import TimelineLayout from "../components/TimelineLayout";
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
        <DefaultLayout ContentComponent={<CategoryTable />} />
      </Route>
      <Route path="/tags" exact>
        <DefaultLayout ContentComponent={<TagTable />} />
      </Route>
      <Route path="/posts/timeline" exact>
        <TimelineLayout />
      </Route>
      <Route path="/posts/timeline/page/:pageNumber" exact>
        <TimelineLayout />
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
