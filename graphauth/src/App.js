import './App.css';
import NavBarX from './components/NavBarX';
import Signup from './views/Signup';
import Login from './views/Login';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    < Router >
      <div className="App" >
        <NavBarX page="home" />
        <Route exact path="/" >
          vrushank
          {/* <WelcomeView /> */}
        </Route>
        <Route path="/login" >
          <Login />
          {/* <AboutView /> */}
        </Route>
        <Route path="/signup" >
          <Signup />
          {/* <Api /> */}
        </Route>
      </div>
    </Router>
  );
}

export default App;
