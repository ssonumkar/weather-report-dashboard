import React from "react";
import './App.css';
import { Login } from './Components/Auth/Login'
import { Register } from './Components/Auth/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthState from "./Context/AuthContext/AuthState";
import { WeatherSearch } from "./Components/Weather/WeatherSearch";
import { WeatherSearchHistory } from "./Components/Weather/WeatherSearchHistory";
function App() {
  return (
    <AuthState>
    <BrowserRouter>
    
          <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element = {<Register/>}/>
          <Route exact path="/weather-search" element={<WeatherSearch />}/>
          <Route exact path="/weather-search-history" element = {<WeatherSearchHistory />}/>
          </Routes>
  </BrowserRouter>
  </AuthState>
  );
}

export default App;
