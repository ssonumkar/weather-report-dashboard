import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "../Navbar";
import { WeatherSearch } from "./WeatherSearch";
import { WeatherSearchHistory } from "./WeatherSearchHistory";
import Logout from "../Auth/Logout";
export const Weather = (props) => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/weather-search" element={<WeatherSearch />}/>
          <Route exact path="/weather-search-history" element = {<WeatherSearchHistory />}/>
          <Route exact path="/logout" element={ <Logout />}/>
        </Routes>
      </Router>
    </>
  );
}