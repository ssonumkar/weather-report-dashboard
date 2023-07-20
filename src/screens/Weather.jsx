import axios from "axios";
import React, { useState } from "react";

export const Weather =  (props)=>{
      const baseURL = 'http://localhost:8082/api/weather/history'
      const weatherURL = 'http://localhost:8082/api/weather'
      const weatherHistoryDeleteURL = "http://localhost:8082/api/weather/history"
      const geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
      const [history, setHistory] = useState([]);
      const [historyIds, setHistoryId] = useState(new Set([]))
      const weatherHistoryconfig = {
        headers:{
          Authorization: props.user.jwt_token,
        }
      };
      const weatherDataConfig = {
        headers:{
          Authorization: props.user.jwt_token,
        },
        params:{
          city: "",
          apiKey: "2953f7129ef8359cd1502a8bdf4995c1",
          lat: 0.0,
          lon: 0.0
        }
      };
      const [city, setCity] = useState('');
      const [suggestions, setSuggestions] = useState([]);
      const [weather, setWeatherData] = useState({
        city: "",
        main:{
          temp_min: 0.0,
          temp_max: 0.0,
          feels_like: 0.0
        }
      });
      
      const handleSearchWeather = async () => {
        console.log("suggestions: ",suggestions)
        
        if (city.trim() === '') {
          alert('Please enter a city name.');
          return;
        }
        weatherDataConfig.params.city=suggestions[0].name
        weatherDataConfig.params.lat=suggestions[0].lat
        weatherDataConfig.params.lon=suggestions[0].lon
        weatherDataConfig.headers.Authorization=props.user.jwt_token
        console.log(props.user.jwt_token)
        console.log(weatherDataConfig)
        // API call to get weather data for the specified city
        try {
          const response = await axios.get(weatherURL,
            weatherDataConfig).then((response) => {
              setWeatherData({
                city: response.data.city,
                main:{
                    temp_min: response.data.main.temp_min,
                    temp_max: response.data.main.temp_max,
                    feels_like: response.data.main.feels_like
                  }
              });
            });
            // weather.city= response.data.city;
            // weather.main={
            //   temp_min: response.data.main.temp_min,
            //   temp_max: response.data.main.temp_max,
            //   feels_like: response.data.main.feels_like
            // }
            
        }catch(error){
          if(error.response.status == 401){
            props.switchForm("login")
            return
          }
        }
          // Update the weatherData state with the response from the backend
         
          console.log("weather: ", weather)
          
          console.log(props.user)
       try{
           await axios.post(
            baseURL, 
            {
              "user_id": props.user.id,
              "city": weather.city,
              "temp_min": weather.main.temp_min,
              "temp_max": weather.main.temp_max,
              "feels_like": weather.main.feels_like
            } , 
            {
              headers:{
                Authorization: props.user.jwt_token,
              }
           }
          ).then((response) => { 
            console.log(response)
            if(response.status == 401){
              props.switchForm("login")
              return
            }
          })
        } catch (error) {

          console.error('Error fetching weather data:', error);
          alert('Error fetching weather data. Please try again later.');
          // props.logout()
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
          console.error('Error fetching city suggestions:', error);
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
      
      
      
      
      const getWeatherHistory = async () => {
        const weatherHistoryGetUrl = baseURL+"/"+props.user.id
        try{
          await axios.get(weatherHistoryGetUrl, weatherHistoryconfig)
              .then((response) => {
                if(response.data.length > 0)
                setHistory(response.data)
             });
            }catch(error){
              console.error(error)
              if(error.response.status == 401){
                props.switchForm("login")
                return
              }
            }
      }

      const handleLogout = () => {
        props.logout()
      }

      const handleCheck = (e) => {
        let id = parseInt(e.target.id)
        if(e.target.checked)
          historyIds.add(id)
        else
          historyIds.delete(id)
      }

      const resetAllCheckboxes = () => {
        var x = document.getElementsByName("historyCheckBox")
        for(let i=0; i<x.length; i++) {
          x[i].checked = false;
        } 
      }
      const deleteSelected = async () =>{
        console.log(historyIds)
          try{
            await axios.patch(
              weatherHistoryDeleteURL,
              {"ids": Array.from(historyIds)}, 
              {
                headers:{
                  Authorization: props.user.jwt_token,
                }
              }
             ).then((response)=>{
              console.log(response)
              if(response.status == 200)
              {
                getWeatherHistory()
                resetAllCheckboxes()
                historyIds.clear()
              }
            });
          }catch(error){
            console.log(error)
            if(error.response && error.response.status == 401){
              props.switchForm("login")
              return
            }
          }
      }
      return (
        <div>
            
                <div>
                  <h2>Welcome, {props.user.username}!</h2> 
                  <button className="link-btn" onClick={() => handleLogout()}>Logout</button>
                </div>
                <div>
                  <label>Enter City Name: </label>
                  <input type="text" list="suggestions" placeholder="City" value={city} onChange={handleCityChange} />
                  <datalist id="suggestions">
                    {suggestions.map((suggestion) => (
                      <option key={suggestion.id} >
                        {suggestion.name}, {suggestion.state}, {suggestion.country}
                      </option>
                    ))}
                  </datalist>
                  <button onClick={() => handleSearchWeather()}>Search</button>
                
                  <h3>Weather Data:</h3>
                  <table>
                    <thead>
                      <th>City</th>
                      <th>Temperature Minimum</th>
                      <th>Temperature Maximum</th>
                      <th>Feels Like</th>
                    </thead>
                    <tbody>
                      {
                      
                              <tr >
                                  <td>{weather.city}</td>
                                  <td>{weather.main.temp_min}</td>
                                  <td>{weather.main.temp_max}</td>
                                  <td>{weather.main.feels_like}</td>
                              </tr>
                        
                      }
                    </tbody>
                  </table>
                </div>
          <button className="link-btn" onClick={() => getWeatherHistory()}>Fetch Weather search history</button>
        <div>
          <h3>Weather Search History:</h3>
          <button className="link-btn" onClick={() => deleteSelected()}><h4>Delete Selected</h4></button>
          <table>
            <thead>
              <th>City</th>
              <th>Temperature Minimum</th>
              <th>Temperature Maximum</th>
              <th>Feels Like</th>
            </thead>
            <tbody>
              {
                history.map((data, index)=>{
                  return(
                      
                      <tr key={index}>
                          <input name="historyCheckBox" type="Checkbox" id={data.id} onChange={handleCheck}></input>
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
        </div>
        </div>
      );
}