import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from './screens/Login'
import { Register } from './screens/Register'
import { Weather } from './screens/Weather'
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [userToken, setUserToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) =>{
    setCurrentForm(formName)
  }
 
  const handleLogin = (token, formName) => {
    setIsLoggedIn(true);
    setUserToken(token);
    toggleForm(formName)
    console.log("--",token)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserToken('');
  };

  const project = () => {
    switch(currentForm) {

      case "login":   return <Login handleLogin={handleLogin}/>;
      case "register":   return <Register onFormSwitch={toggleForm}/>;
      case "weather": return <Weather token={userToken} onFormSwitch={toggleForm}/>;

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
