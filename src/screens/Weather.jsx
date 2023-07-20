import axios from "axios";
import React from "react";


export const Weather = async (params)=>{
    const data ={
    
        "people" :[
          {
            "name":"John",
            "last_name":"Doe",
            "age":"25",
            "Occupation":"driver",
          },
          {
            "name":"Jack",
            "last_name":"Brown",
            "age":"24",
            "Occupation":"it"
          },
          {
            "name":"Oliver",
            "last_name":"Black",
    
            "age":"30",
            "Occupation":"cto"
          },
        ],
    
        "format":{"last_name":"Last Name"}
      }
      
      return (
        <tbody>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Occupation</th>
        </tr>
        {data.people.map((item, i) => (
          <tr key={i}>
            <td>{item.name}</td>
            <td>{item.last_name}</td>
            <td>{item.age}</td>
            <td>{item.Occupation}</td>
          </tr>
        ))}
  </tbody>
        
      );
}