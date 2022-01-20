import { useSelector } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PostList from "./routes/Post/PostList";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/v1/post/"><PostList /></Route>
      </Switch>
    </Router>
  );
}

export default App;
