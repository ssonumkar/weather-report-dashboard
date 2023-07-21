import axios from 'axios';
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const baseUrl = "http://localhost:8082/api/login"

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [user, setUser] = useState({});

    const performLogin = async (e) => {
        e.preventDefault();
        console.log(email, " : ", password);
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password.');
            return;
          }
                
          try{
             await axios.post(baseUrl, {
                username: email,
                password: password,
              })
              .then((response) => {
                console.log(response)
                setUser(response.data)
                props.handleLogin(response.data, "weather")
              });            
          }catch(error){
            console.error("Login failed")
            alert('Invalid email or password. Please try again')
          }
    }
    
    return (
        <div className="auth-form-container">
       <form className="login-form" onSubmit={performLogin}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
        <button type="submit">Log In</button>
       </form>
       <button className="link-btn" onClick={() => props.handleLogin('','register')}>Don't have an account? Register here</button>
       {/* <Link className="nav-link active" aria-current="page" to="/register">Register</Link> */}

       </div>
    )
}

