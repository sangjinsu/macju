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
import Home from "routes/Home";
import PageNotFound from "components/PageNotFound";
import ProfileEdit from "routes/User/ProfileEdit";
import LoginAuth from "routes/Auth/LoginAuth";
import PageAuth from "./hoc/auth";
import Search from "routes/Search"


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/post">
            <Switch>
              <Route exact path="/post/new" component={PostCreate} />
              <Route exact path="/post/:postId" component={PostDetail} />
              <Route exact path="/post" component={PostList} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Route>
          <Route path="/beer">
            <Switch>
              <Route exact path="/beer/:beerid" component={BeerDetail} />
              <Route exact path="/beer" component={BeerList} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Route>
          <Route path="/user">
            <Switch>
              <Route exact path="/user/login" component={Login} />
              <Route exact path="/user/signup" component={Signup} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Route>
          <Route path="/profile">
            <Switch>
              <Route exact path="/profile/:userid/edit" component={ProfileEdit} />
              <Route exact path="/profile/:userid/post" component={Profile} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Route>
          <Route exact path="/oauth/login/resopnse" component={LoginAuth}/>
          <Route path="/search" component={Search} />

          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}



export default App;
