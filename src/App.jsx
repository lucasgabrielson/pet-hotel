import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, HashRouter, Link, Redirect} from 'react-router-dom';
import PetAdd from './PetAdd';

function App() {
  return (
    <HashRouter>
      <header>
        <h1>Pet Hotel</h1>
      </header>
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
            <PetAdd />
        </Route>
    </HashRouter>
  );
}

export default App;