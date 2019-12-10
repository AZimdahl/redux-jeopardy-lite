import React from 'react';
import './App.css';
import Welcome from './components/welcome/Welcome'
import Clock from './components/clock/Clock'
import Contact from './components/contact/Contact'
import Navigation from './components/navigation/Navigation'
import Error404 from './components/error404/Error404'
import Jeopardy from './components/jeopardy/Jeopardy'

//Import the Route component
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <Navigation />
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Welcome {...props} name="Alexander" />} />
        <Route path="/welcome/:name" component={Welcome} />
        <Route path="/clock" component={Clock} />
        <Route path="/contact" component={Contact} />
        <Route path="/jeopardy" component={Jeopardy} />
        <Route><Error404 /></Route>
      </Switch>
    </div>
  );
}

export default App;