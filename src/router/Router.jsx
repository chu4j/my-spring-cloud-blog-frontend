import { Route, Switch } from "react-router-dom";
import Categories from "../components/Categories";
import Home from "../components/Home";
import OnePost from "../components/OnePost";
import Tags from "../components/Tags";
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
        <Categories />
      </Route>
      <Route path="/tags" exact>
        <Tags />
      </Route>
      <Route path="/posts/timeline" exact>
        <TimelineLayout />
      </Route>
      <Route path="/posts/timeline/page/:pageNumber" exact>
        <TimelineLayout />
      </Route>
    </Switch>
  );
}
