import React from "react";
import "./App.css";
import Home from "./Components/Home";
import OrderForm from "./Components/OrderForm";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/OrderForm" component={OrderForm} />
        </Switch>
      </header>
    </div>
  );
};
export default App;
