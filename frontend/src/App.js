import {BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import PostList from "./routes/Post/PostList";
import PostDetail from "./routes/Post/PostDetail";
import PostCreate from "./routes/Post/PostCreate";
import CommentList from "./routes/Post/CommentList";
import BeerList from './routes/Beer/BeerList.js';
import Signup from './routes/Signup';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import BeerDetail from './routes/Beer/BeerDetail';
import Profile from "routes/User/Profile";
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/post/new"><PostCreate /></Route>
          <Route path="/post/:num"><PostDetail /><CommentList /></Route>
          <Route path="/post"><PostList /></Route>
          <Route path='/beer/:num'><BeerDetail /></Route>
          <Route path='/beer'><BeerList /></Route>
          <Route path='/signup'><Signup /></Route>
          <Route path="/user/:username"><Profile /></Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </>
  );
}



export default App;
