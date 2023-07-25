import axios from 'axios';
import React, { useState } from "react";
import { useContext } from "react"
import AuthContext from '../../Context/AuthContext/AuthContext';
import { Link, useNavigate } from "react-router-dom"
import { handleError } from '../error';
import configData from "../../config.json";

// import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  // const [user, setUser] = useState({});
  const auth = useContext(AuthContext)
  const performLogin = async (e) => {
    
    
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password.');
      return;
    }
    configData.LOGIN.POST.body ={
      username: email,
      password: password,
    }
    try {
      await axios.post(configData.LOGIN.baseUrl, configData.LOGIN.POST.body)
        .then((response) => {
          auth.updateLoginInfo(true,response.data)
          navigate('/weather-search')
        });
    } catch (error) {
      var message = ""
      if(error.response.data.error.includes("User already has a session logged in"))
      alert("User already has a session logged in, Only one session at a time is possible")
      handleError(error, navigate, "Login Failed ", auth)
    }
  }
  return (
    <div >
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }} >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-5-strong" style={{ border: '1px solid black',borderRadius: '5px!important'}}>
                <div className="card-body p-5 text-center">

                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>

                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" onClick={() => performLogin()} type="button">Login</button>

                  <hr className="my-4" />
                  <Link className="nav-link active" aria-current="page" to="/register">Don't have account? Register</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

