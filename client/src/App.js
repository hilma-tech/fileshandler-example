import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthProvider, PrivateRoute, PublicOnlyRoute, useKlskDhp } from '@hilma/auth';
import { provide } from '@hilma/tools';

import './App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Cats from './Cats';
import NewCat from './NewCat';
import UpdateCat from './UpdateCat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>

          <PublicOnlyRoute path="/login" component={Login} componentName="login" redirectPath="/cats" />
          <PublicOnlyRoute path="/sign-up" component={SignUp} componentName="sign-up" redirectPath="/cats" />

          <PrivateRoute path="/cats" component={Cats} componentName="cats" redirectPath="/login" />
          <PrivateRoute path="/new-cat" component={NewCat} componentName="new-cat" redirectPath="/login" />
          <PrivateRoute path="/update-cat/:id" component={UpdateCat} componentName="update-cat" redirectPath="/login" />
          <PrivateRoute path="/" component={Cats} componentName="cats" redirectPath="/login" />

        </Switch>
      </header>
    </div>
  );
}

export default provide([AuthProvider, { accessTokenCookie: "actlt", }])(App);
