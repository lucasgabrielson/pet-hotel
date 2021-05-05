import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, HashRouter, Link, Redirect} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Redirect exact from="/" to="/pets" />
        <Route
              exact
              path="/owners"
            >
        </Route>
        <Route
              exact
              path="/pets"
            >
        </Route>
      <header>
        <h1>Pet Hotel</h1>
      </header>
    </HashRouter>
  );
}

export default App;
