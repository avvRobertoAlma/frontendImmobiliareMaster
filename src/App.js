import React, { Component } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import ProposalsBox from "./components/ProposalsBox";
import AcceptProposal from "./components/AcceptProposal";
import VerifyMember from "./components/VerifyMember";
import RegisterRealEstate from "./components/RegisterRealEstate";
import SendProposal from "./components/SendProposal";
import Index from "./components/Index";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/proposalsBox" component={ProposalsBox} />
          <Route path="/acceptProposal" component={AcceptProposal} />
          <Route path="/verifyMember" component={VerifyMember} />
          <Route path="/proposals" component={ProposalsBox} />
          <Route path="/registerRealEstate" component={RegisterRealEstate} />
          <Route path="/sendProposal" component={SendProposal} />
        </Switch>
      </div>
    );
  }
}

export default App;
