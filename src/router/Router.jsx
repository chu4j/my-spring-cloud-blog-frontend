import { Route, Switch } from "react-router-dom";
import Categories from "../components/Categories";
import FocusPostComponent from "../components/FocusContent";
import Home from "../components/Home";
import LoginForm from "../components/owner/LoginForm";
import Tags from "../components/Tags";
import MyTimeline from "../components/Timeline";
import TimelineHome from "../components/TimelineHome";
export default function BlogRouter() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/owner/login" exact>
        <LoginForm />
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
        <FocusPostComponent />
      </Route>
      <Route path="/categories" exact>
        <Categories />
      </Route>
      <Route path="/tags" exact>
        <Tags />
      </Route>
      <Route path="/posts/timeline" exact>
        <TimelineHome />
      </Route>
      <Route path="/posts/timeline/page/:pageNumber" exact>
        <TimelineHome />
      </Route>
    </Switch>
  );
}
