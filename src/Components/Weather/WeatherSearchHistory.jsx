import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useContext } from "react"
import WeatherNavbar from "../WeatherNavbar";

export const WeatherSearchHistory = (props) => {
  const auth = useContext(AuthContext)
  const [historyIds, setHistoryId] = useState(new Set([]))
  const baseURL = 'http://localhost:8082/api/weather/history'
  const weatherHistoryGetUrl = baseURL+"/"+auth.loginInfo.user.id
  const [history, setHistory] = useState([]);

  const weatherHistoryconfig = {
    headers:{
      Authorization: auth.loginInfo.user.jwt_token,
    }
  };
  useEffect(() => {
    loadWeatherHistory();
 }, []);
  const loadWeatherHistory = async () => {
    try{
      await axios.get(weatherHistoryGetUrl, weatherHistoryconfig)
          .then((response) => {
            if(response.data.length > 0)
            setHistory(response.data)
         });
        }catch(error){
          console.error(error)
          // if(error.response.status == 401){
          //   props.switchForm("login")
          //   return
          // }
        }
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
          baseURL,
          {"ids": Array.from(historyIds)}, 
          {
            headers:{
              Authorization: auth.loginInfo.user.jwt_token,
            }
          }
         ).then((response)=>{
          console.log(response)
          if(response.status == 200)
          {
            loadWeatherHistory()
            resetAllCheckboxes()
            historyIds.clear()
          }
        });
      }catch(error){
        console.log(error)
        if(error.response && error.response.status == 401){
          auth.handleLogout()
          return
        }
      }
  }
    // getWeatherHistory()
    return (
        <div >

           <WeatherNavbar/>
          <h3>Weather Search History:</h3>
          <table className="table table-sm table-hover">
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
          <button className="link-btn" onClick={() => deleteSelected()}>Delete Selected</button>

        </div>
    )
}