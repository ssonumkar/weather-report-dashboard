export const WeatherSearchHistory = (props) => {
    return (
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
    )
}