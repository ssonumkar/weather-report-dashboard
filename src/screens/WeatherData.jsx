export const WeatherData = (props) => {
    return (
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
    )
}