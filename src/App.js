import React, { Component } from 'react';
import './App.css';
import { Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import SideBar from './components/side-bar/SideBar';
import MainComp from './components/main-comp/MainComp';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import Login from './components/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <SemanticToastContainer />
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <div className="App">
                <div className="sideBar">
                  <SideBar />
                </div>
                <div className="mainComp">
                  <Container fluid>
                    <MainComp />
                  </Container>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
