import axios from "axios";
import React, { useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useContext } from "react"
import WeatherNavbar from "../WeatherNavbar";
import { useNavigate } from "react-router-dom";
import { handleError } from "../error.js"
export const WeatherSearch = (props) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const weatherURL = 'http://localhost:8082/api/weather'
  const geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
  const baseURL = 'http://localhost:8082/api/weather/history'
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
  var weatherHistoryBody = {
    user_id: auth.loginInfo.user.id,
    city: "",
    temp_min: 0.0,
    temp_max: 0.0,
    feels_like: 0.0
  }
  const weatherDataConfig = {
    headers: {
      Authorization: "",
    },
    params: {
      city: "",
      apiKey: "2953f7129ef8359cd1502a8bdf4995c1",
      lat: 0.0,
      lon: 0.0
    }
  };
  const handleSearchWeather = async () => {

    console.log("suggestions: ", suggestions)

    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    weatherDataConfig.params.city = suggestions[0].name
    weatherDataConfig.params.lat = suggestions[0].lat
    weatherDataConfig.params.lon = suggestions[0].lon
    weatherDataConfig.headers.Authorization = auth.loginInfo.user.jwt_token
    try {
      await axios.get(weatherURL,
        weatherDataConfig).then((response) => {
         
          setWeatherData({
            city: response.data.city,
            main: {
              temp_min: response.data.main.temp_min,
              temp_max: response.data.main.temp_max,
              feels_like: response.data.main.feels_like
            }
          });
          weatherHistoryBody.city = response.data.city;
          weatherHistoryBody.feels_like = parseFloat(response.data.main.feels_like);
          weatherHistoryBody.temp_max = parseFloat(response.data.main.temp_max);
          weatherHistoryBody.temp_min = parseFloat(response.data.main.temp_min);
          
        });
    } catch (error) {
      handleError(error, navigate, "Could not fetch weather data")
    }
    try {
      await axios.post(
        baseURL,
       weatherHistoryBody,
        {
          headers: {
            Authorization: auth.loginInfo.user.jwt_token,
          }
        }
      ).then((response) => {
        console.log("Inserted successfully")
        
      })
    } catch (error) {
      handleError(error, navigate, "Could not insert weather search data")
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
      handleError(error, navigate, 'Error fetching city suggestions');
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
                    <option key={suggestion.id} >
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