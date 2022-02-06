import React from "react";
import "./App.css";
import { Table } from "./components/table";
import { UserInfo } from "./components/userInfo";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Table />
        </Route>
        <Route exact path={"/:id"}>
          <UserInfo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// http://151.248.112.110:3000/api/evergreen/
// http://151.248.112.110:3000/api/evergreen/tomcapital
