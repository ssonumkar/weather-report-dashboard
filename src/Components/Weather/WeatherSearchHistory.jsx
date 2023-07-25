import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useContext } from "react"
import WeatherNavbar from "../WeatherNavbar";
import { handleError } from "../error.js"
import { useNavigate } from "react-router-dom";
import configData from "../../config.json";

export const WeatherSearchHistory = (props) => {
  const auth = useContext(AuthContext)
  const [historyIds, setHistoryId] = useState(new Set([]))
  const baseURL = 'http://localhost:8082/api/weather/history'
  const [history, setHistory] = useState([]);
  const navigate = useNavigate()
  var weatherGetSearchHistory = ""
  useEffect(() => {
    loadWeatherHistory();
  }, []);
  const updateGetWeatherSearchCongif = () => {
    weatherGetSearchHistory = configData.WEATHER_SEARCH_HISTORY.baseUrl + "/" + auth.loginInfo.user.id
    configData.WEATHER_SEARCH_HISTORY.GET.headers.Authorization = auth.loginInfo.user.jwt_token
  }
  const loadWeatherHistory = async () => {
    try {
      console.log(auth.loginInfo.user)
      updateGetWeatherSearchCongif()
      await axios.get(
        weatherGetSearchHistory,
        configData.WEATHER_SEARCH_HISTORY.GET
      ).then((response) => {
        if (response.data.length > 0)
          setHistory(response.data)
      });
    } catch (error) {
      handleError(error, navigate, "Could not fetch weather search history", auth)
    }
  }
  const handleCheck = (e) => {
    let id = parseInt(e.target.id)
    if (e.target.checked)
      historyIds.add(id)
    else
      historyIds.delete(id)
  }

  const resetAllCheckboxes = () => {
    var x = document.getElementsByName("historyCheckBox")
    for (let i = 0; i < x.length; i++) {
      x[i].checked = false;
    }
  }
  const updateDeleteWeatherSearchConfig = () => {
    configData.WEATHER_SEARCH_HISTORY.PATCH.body.ids = Array.from(historyIds);
    configData.WEATHER_SEARCH_HISTORY.PATCH.headers.headers.Authorization = auth.loginInfo.user.jwt_token;
  }
  const deleteSelected = async () => {
    console.log(historyIds)
    updateDeleteWeatherSearchConfig()
    try {
      await axios.patch(
        configData.WEATHER_SEARCH_HISTORY.baseUrl,
        configData.WEATHER_SEARCH_HISTORY.PATCH.body,
        configData.WEATHER_SEARCH_HISTORY.PATCH.headers
      ).then((response) => {
        loadWeatherHistory()
        resetAllCheckboxes()
        historyIds.clear()
      });
    } catch (error) {
      handleError(error, navigate, "Could not delete weather search history", auth)
    }
  }
  return (
    <div >

      <WeatherNavbar />
      <h3>Weather Search History:</h3>
      <table className="table table-sm table-hover">
        <thead>
          <tr>
          <th>City</th>
          <th>Temperature Minimum</th>
          <th>Temperature Maximum</th>
          <th>Feels Like</th>
          </tr>
        </thead>
        <tbody>
          {
            history.map((data, index) => {
              return (

                <tr key={index}>
                  <td><input name="historyCheckBox" type="Checkbox" id={data.id} onChange={handleCheck}></input></td>
                  <td>{data.city}</td>
                  <td>{data.temp_min}</td>
                  <td>{data.temp_min}</td>
                  <td>{data.feels_like}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <button className="link-btn" onClick={() => deleteSelected()}>Delete Selected</button>

    </div>
  )
}