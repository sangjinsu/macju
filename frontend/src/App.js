import {BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import PostList from "./routes/Post/PostList";
import PostDetail from "./routes/Post/PostDetail";
import PostCreate from "./routes/Post/PostCreate";
import CommentList from "./routes/Post/CommentList";
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
import InputCss from "components/InputCss";

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/inputcss"><InputCss /></Route>
          <Route path="/post/new"><PostCreate /></Route>
          <Route path="/post/:postid"><PostDetail /><CommentList /></Route>
          <Route path="/post"><PostList /></Route>
          <Route path='/beer/:beerid'><BeerDetail /></Route>
          <Route path='/beer'><BeerList /></Route>
          <Route path='/login'><Login /></Route>
          <Route path='/signup'><Signup /></Route>
          <Route path="/home"><RecommendBeer /></Route>
          <Route path='/:username/edit'><ProfileEdit /></Route>
          <Route path="/:username"><Profile /></Route>
          <Route path='/'><PageNotFound /></Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}



export default App;
