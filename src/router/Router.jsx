import { Route, Switch } from "react-router-dom";
import FocusPostComponent from "../components/FocusContent";
import Home from "../components/Home";
import LoginForm from "../components/owner/LoginForm";
export default function BlogRouter() {
    return (

        <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/owner/login" exact ><LoginForm /></Route>
            <Route path="/category/:name" exact><Home /></Route>
            <Route path="/tag/:name" exact><Home /></Route>
            <Route path="/posts/page/:pageNumber"><Home /></Route>
            <Route path="/category/:name/page/:pageNumber"><Home /></Route>
            <Route path="/tag/:name/page/:pageNumber"><Home /></Route>
            <Route path="/post/:postId" exact ><FocusPostComponent /></Route>
        </Switch>

    )
}
