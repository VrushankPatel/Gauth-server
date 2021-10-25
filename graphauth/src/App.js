import './App.css';
import NavBarX from './components/NavBarX';
import Signup from './views/Signup';
import Login from './views/Login';
import Welcome from './views/Welcome';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    < Router >
      <div className="App" >        
        <Route path="/" strict exact component={Welcome}/>          
        <Route path="/login" >
        <NavBarX/>
          <Login />          
        </Route>
        <Route path="/signup" >
        <NavBarX page="home" />
          <Signup />          
        </Route>
      </div>
    </Router>
  );
}

export default App;
