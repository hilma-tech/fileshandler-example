import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Home';
import Login from './Login';
import NewCat from './NewCat';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route path="/" component={Home} />

        </Switch>
      </header>
    </div>
  );
}

export default App;
