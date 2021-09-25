import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/common/navbar";
import HomePage from "./pages/homepage";
import DayView from "./pages/days";
import MonthView from "./pages/month";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/day_view" exact component={DayView} />
          <Route path="/month_view" exact component={MonthView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
