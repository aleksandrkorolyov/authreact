import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Prefecences';
import Login from './components/Login/Login'

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken))
}

function getToken() {

  const tokenSring = sessionStorage.getItem('token')
  const userToken = JSON.parse(tokenSring)
  return userToken
}

function App() {
  const token = getToken();
  console.log(token)

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
      <h2>My app</h2>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/preferences" element={<Preferences/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
