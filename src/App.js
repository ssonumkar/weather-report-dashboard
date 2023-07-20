import axios from "axios";
import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from './screens/Login'
import { Register } from './screens/Register'
import { Weather } from './screens/Weather'
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logOutURL = "http://localhost:8082/api/logout"
  
  const toggleForm = (formName) =>{
    setCurrentForm(formName)
  }
 
  const handleLogin = (user, formName) => {
    setIsLoggedIn(true);
    setUser(user);
    toggleForm(formName)
    console.log(user)
  };

  const handleLogout = async () => {
    console.log("handling logout for user: ", user)
    const logoutConfig = {
      headers:{
        "Authorization": user.jwt_token.toString(),
      }
    }
    try{

      console.log(logoutConfig.headers.Authorization = user.jwt_token )
      const response = await axios.post(logOutURL,"" , {
        headers:{
          "Authorization": user.jwt_token.toString(),
        }})
      console.log(response)
      if(response.status == "200"){
        setIsLoggedIn(false);
        setUser({});
        setCurrentForm("login");
      }
      else
      {
        alert("Error logging out, try logging again")
        setCurrentForm("login");
      }
      
    }catch(error){
      console.error(error)
    }
   
  };

  const project = () => {
    console.log("inside project: ", user.jwt_token)
    switch(currentForm) {

      case "login":   return <Login handleLogin={handleLogin}/>;
      case "register":   return <Register onFormSwitch={toggleForm}/>;
      case "weather": 
            if(isLoggedIn) 
                  return <Weather user={user}  logout={handleLogout} switchForm={toggleForm}/>;
            else
                  return <Login handleLogin={handleLogin}/>;

      default:      return <h1>No project match</h1>
    }
  }
  return (
    
    <div className="App">
      {
        project()
        // currentForm == "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
      {/* <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/weather" element={isLoggedIn ? <Weather username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes> */}
    </div>
    
  );
}

export default App;
