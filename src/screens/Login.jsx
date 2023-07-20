import axios from 'axios';
import React, { useState } from "react";

const baseUrl = "http://localhost:8082/api/login"
export const Login = (params) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [jwtToken, setJwtToken] = useState('');

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
                setJwtToken(response.data.token.toString())
                console.log("Response: ",response.data.token)
                params.handleLogin(response.data.token, "login")
                console.log("jwtToken: ", jwtToken)
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
       <button className="link-btn" onClick={() => params.handleLogin('','register')}>Don't have an account? Register here</button>
       </div>
    )
}