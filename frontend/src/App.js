import {BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import PostList from "./routes/Post/PostList";
import PostDetail from "./routes/Post/PostDetail";
// import CommentList from "./routes/Post/CommentList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/v1/post/new"><PostList /></Route>
        <Route path="/post/:num"><PostDetail /></Route>
      </Switch>
    </Router>
  );
}

export default App;

