import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import "./App.css";


import PrivateRoute from './components/common/PrivateRoute';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/profiles/Profiles";
import EditProfile from "./components/edit-profile/EditProfile"
import EditTransfer from "./components/edit-transfer/EditTransfer"
import Transfers from "./components/transfers/Transfers"



// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
 
    // Redirect to login
    window.location.href = '/login';
  }
} 


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profiles" component={Profiles} />
           
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/edit/:id"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/transfer/:id"
                  component={EditTransfer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/transfers"
                  component={Transfers}
                />
              </Switch>
          </div>
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
