import React, {useContext, useState} from "react";
import './App.css';
import { Login } from './Components/Auth/Login'
import { Register } from './Components/Auth/Register'
import { Weather } from './Components/Weather/Weather'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthState from "./Context/AuthContext/AuthState";
import { WeatherSearch } from "./Components/Weather/WeatherSearch";
import { WeatherSearchHistory } from "./Components/Weather/WeatherSearchHistory";
import AuthContext from "./Context/AuthContext/AuthContext";
function App() {
  const auth = useContext(AuthContext)

  // const isLoggedIn = false
  // const setCurrentForm = (currentForm, isLoggedIn) => {
  //   isLoggedIn = isLoggedIn
  //   switch(currentForm) {

  //     case "login":   return <Login />;
  //     case "register":   return <Register/>;
  //     case "weather": 
  //           if(isLoggedIn) 
  //                 return <Weather/>;
  //           else
  //                 return <Login />;

  //     default:      return <h1>No project match</h1>
  //   }
  // }
  return (
    <AuthState>
    <BrowserRouter>
    
          <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element = {<Register/>}/>
          <Route exact path="/weather" element = {<Weather/>}/>
          <Route exact path="/weather-search" element={<WeatherSearch />}/>
          <Route exact path="/weather-search-history" element = {<WeatherSearchHistory />}/>
          </Routes>
  </BrowserRouter>
  </AuthState>
  );
}

export default App;
