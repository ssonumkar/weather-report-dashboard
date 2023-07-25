import axios from "axios";
import React, { useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useContext } from "react"
import WeatherNavbar from "../WeatherNavbar";
import { useNavigate } from "react-router-dom";
import { handleError } from "../error.js"
import configData from "../../config.json";

export const WeatherSearch = (props) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeatherData] = useState({
    city: "",
    main: {
      temp_min: 0.0,
      temp_max: 0.0,
      feels_like: 0.0
    }
  });
  const setWeatherApiParams = () => {
    configData.WEATHER_SEARCH.GET.params.city = suggestions[0].name
    configData.WEATHER_SEARCH.GET.params.lat = suggestions[0].lat
    configData.WEATHER_SEARCH.GET.params.lon = suggestions[0].lon
    configData.WEATHER_SEARCH.GET.headers.Authorization = auth.loginInfo.user.jwt_token
  }
  const setWeatherSearchHistoryBody = (response) => {
    configData.WEATHER_SEARCH_HISTORY.POST.body.user_id = auth.loginInfo.user.id
    configData.WEATHER_SEARCH_HISTORY.POST.body.city = response.data.city;
    configData.WEATHER_SEARCH_HISTORY.POST.body.feels_like = parseFloat(response.data.main.feels_like);
    configData.WEATHER_SEARCH_HISTORY.POST.body.temp_max = parseFloat(response.data.main.temp_max);
    configData.WEATHER_SEARCH_HISTORY.POST.body.temp_min = parseFloat(response.data.main.temp_min);
    configData.WEATHER_SEARCH_HISTORY.POST.headers.headers.Authorization = auth.loginInfo.user.jwt_token
  }
  const handleSearchWeather = async () => {
    console.log("suggestions: ", suggestions)
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    setWeatherApiParams();
    console.log(configData)
    try {
      await axios.get(
        configData.WEATHER_SEARCH.baseUrl,
        configData.WEATHER_SEARCH.GET
      ).then((response) => {
        setWeatherData({
          city: response.data.city,
          main: {
            temp_min: response.data.main.temp_min,
            temp_max: response.data.main.temp_max,
            feels_like: response.data.main.feels_like
          }
        });
        setWeatherSearchHistoryBody(response)
      });
    } catch (error) {
      handleError(error, navigate, "Could not fetch weather data", auth)
    }
    try {
      await axios.post(
        configData.WEATHER_SEARCH_HISTORY.baseUrl,
        configData.WEATHER_SEARCH_HISTORY.POST.body,
        configData.WEATHER_SEARCH_HISTORY.POST.headers
      ).then((response) => {
        console.log("Inserted successfully")
      })
    } catch (error) {
      handleError(error, navigate, "Could not insert weather search data", auth)
    }
  };
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(geoURL, {
        params: {
          q: query,
          appid: "2953f7129ef8359cd1502a8bdf4995c1",
          limit: 5,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error, navigate, 'Error fetching city suggestions', auth);
      return [];
    }
  };

  //handleCityChange
  const handleCityChange = async (e) => {
    setCity(e.target.value);

    if (e.target.value.trim() !== '') {
      const suggestions = await fetchSuggestions(e.target.value);
      console.log(suggestions)
      setSuggestions(suggestions);
    } else {
      setSuggestions([]); // Clear suggestions when the input is empty
    }
  };
  return (
    <div>
      <WeatherNavbar />

      <section className="vh-100">
        <div className="container py-5 h-100">

          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">

              <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

              <div className="input-group rounded mb-3">
                <input type="search" className="form-control rounded" placeholder="City" aria-label="Search"
                  aria-describedby="search-addon" list="suggestions" value={city} onChange={handleCityChange} />
                <datalist id="suggestions">
                  {suggestions.map((suggestion) => (
                    <option>
                      {suggestion.name}, {suggestion.state}, {suggestion.country}
                    </option>
                  ))}
                </datalist>
                <a href="#!" type="button">
                  <span className="input-group-text border-0 fw-bold" id="search-addon" onClick={() => handleSearchWeather()}>
                    Search
                  </span>
                </a>
              </div>

              <div className="card shadow-0 border">
                <div className="card-body p-4">

                  <h4 className="mb-1 sfw-normal">{weather.city}</h4>
                  <p>Feels like: <strong>{weather.main.feels_like}°C</strong></p>
                  <p>Max: <strong>{weather.main.temp_max}°C</strong>, Min: <strong>{weather.main.temp_min}°C</strong></p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}