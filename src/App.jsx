import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {Route, HashRouter, Link, Redirect} from 'react-router-dom';
import PetAdd from './PetAdd';
import Owners from './Owners';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
        dispatch({ type: 'GET_OWNERS'});
        dispatch({type: 'GET_PETS'});
    }, [])

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
          <Owners />
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
