import {BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import PostList from "./routes/Post/PostList";
import PostDetail from "./routes/Post/PostDetail";
import PostCreate from "./routes/Post/PostCreate";
import BeerList from './routes/Beer/BeerList.js';
import Signup from './routes/User/Signup';
import Login from './routes/User/Login';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import BeerDetail from './routes/Beer/BeerDetail';
import Profile from "routes/User/Profile";
import RecommendBeer from "components/Main/RecommendBeer";
import PageNotFound from "components/PageNotFound";
import ProfileEdit from "routes/User/ProfileEdit";
import BeerTest from "routes/Beer/BeerTest";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/beer/test" component={BeerTest} />
          <Route path="/post/new" component={PostCreate} />
          <Route path="/post/:postid" component={PostDetail} />
          <Route path="/post" component={PostList} />
          <Route path="/beer/:beerid" component={BeerDetail} />
          <Route path="/beer" component={BeerList} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={RecommendBeer} />
          <Route path="/profile">
            <Switch>
              <Route path="/:username/edit" component={ProfileEdit} />
              <Route path="/:username" component={Profile} />
            </Switch>
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}



export default App;
