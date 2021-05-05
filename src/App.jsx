import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, HashRouter, Link, Redirect} from 'react-router-dom';
import Owners from './Owners';

function App() {
  return (
    <>
      <header>
          <h1>Pet Hotel</h1>
      </header>
      <HashRouter>
        <Redirect exact from="/" to="/pets" />
          <Route
                exact
                path="/owners"
              >
              <Owners/>
          </Route>
          <Route
                exact
                path="/pets"
              >

          </Route>
      </HashRouter>
    </>
  );
}

export default App;
