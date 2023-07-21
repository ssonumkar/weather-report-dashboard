import axios from "axios";
import React, { useState } from "react"
export const Register = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [dob, setDOB] = useState(new Date());
    const baseUrl = "http://localhost:8082/api/register"
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, ", ", password, ", ", dob);
        if(email == "" || password == "" || dob == null){
            alert("Please provide valid inputs")
            return
        }
        try{
            await axios.post(baseUrl, 
                {
                    username: email,
                    password: password,
                    dob: dob
                }).then((response) => {
                    console.log(response)
                })
            props.onFormSwitch('login')
        }catch (error){
            console.log("User registration failed")
            alert("User registration failed, please provide valid inputs.")
        }
    }
    return (
        <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
         <label htmlFor="email">Email</label>
         <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
         <label htmlFor="password">Password</label>
         <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
         <label htmlFor="dob">Birth Date</label>
         <input value={dob} onChange={(e) => setDOB(e.target.value)} type="date" placeholder="" id="dob" name="dob"/>
         
         <button type="submit">Register</button>
        </form>
         <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
        </div>
    )
}