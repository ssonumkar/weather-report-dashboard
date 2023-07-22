import axios from "axios";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import configData from "../../config.json";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [dob, setDOB] = useState(new Date());
    const navigate = useNavigate()

    const registerUser = async () => {
        console.log(email, ", ", password, ", ", dob);
        if (email == "" || password == "" || dob == null) {
            alert("Please provide valid inputs")
            return
        }
        configData.REGISTER.POST.body.username = email
        configData.REGISTER.POST.body.password = password
        configData.REGISTER.POST.body.dob = dob
        
        console.log("----",configData.REGISTER.POST.body)
        console.log("URL: ", configData.REGISTER.POST.baseUrl)
        try {
            await axios.post(
                configData.REGISTER.baseUrl,
                configData.REGISTER.POST
                ).then((response) => {
                    console.log(response)
                })
            alert("User registration successful")
            navigate("/")
        } catch (error) {
            console.log("User registration failed, ", error)
            alert("User registration failed, please provide valid inputs.")
        }
    }
    return (

        <div>
            <section className="vh-100" style={{ "background-color": "#508bfc;" }} >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-5-strong" style={{ "border-radius": "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Sign up</h3>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="email">Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="date">Birth Date</label>

                                        <input type="date" id="date" value={dob} onChange={(e) => setDOB(e.target.value)} className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="password">Password</label>

                                        <input type="password" value={password} onChange={(e) => setPass(e.target.value)} id="password" className="form-control form-control-lg" />
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" onClick={() => registerUser()}>Register</button>

                                    <hr className="my-4" />
                                    <Link className="nav-link active" aria-current="page" to="/">Already have account? Login</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}