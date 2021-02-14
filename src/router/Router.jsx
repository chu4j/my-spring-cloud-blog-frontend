import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
export default function BlogRouter() {
    return (

        <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/category/:name" exact><Home /></Route>
            <Route path="/tag/:name" exact><Home /></Route>
            <Route path="/posts/page/:pageNumber"><Home /></Route>
            <Route path="/category/:name/page/:pageNumber"><Home /></Route>
            <Route path="/tag/:name/page/:pageNumber"><Home /></Route>
        </Switch>

    )
}
