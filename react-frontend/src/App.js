import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Users from './components/users/Users';
import axios from 'axios';
import Apps from "./components/apps/Apps";
import AppLocation from "./components/appLocations/AppLocation";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserView from "./components/UserView/UserView";


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(localStorage.getItem('token') !== "");
    }, []);

    const adminUI = () => {
        if(isLogged && localStorage.getItem('roles') === "ADMIN"){
            return (
            <>
                <Route path="/users">
                  <Users/>
                </Route>
                <Route path="/apps">
                  <Apps />
                </Route>
                <Route path="/appLocations/byApp/:id" component={AppLocation}>
                </Route>
            </>
        )
        }else if(isLogged && localStorage.getItem('roles') === "USER"){
          return(
              <>
                  <UserView />
              </>
          )
        } else return null;
    }

  return (
      <Router>
          <div className="App">
              <Navbar/>
          </div>
          <Switch>
              <Route path="/register">
                  <SignUp />
              </Route>
              <Route path="/login">
                  <SignIn />
              </Route>
              {adminUI()}
          </Switch>
      </Router>
  );
}

export default App;
