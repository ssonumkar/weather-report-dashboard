import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
const AuthState = (props) => {
    const logState = useState(false)
    const userState = useState({
      id: -1,
      username: "",
      jwt_token: ""
    })
    const loginInfo = {isLoggedIn: logState, user: userState}
    const updateLoginInfo = (loginStatus, userInfo) =>{
      console.log("userInfo: ", userInfo)
      loginInfo.isLoggedIn= loginStatus
      loginInfo.user = userInfo
      console.log("called--", loginInfo)
    }
    const [currentForm, setCurrentForm] = useState('login');

    const logOutURL = "http://localhost:8082/api/logout"
    const handleLogout = async () => {
        console.log("handling logout for user: ", loginInfo.user)
        const logoutConfig = {
          headers:{
            "Authorization": loginInfo.user.jwt_token,
          }
        }
        try{
    
          const response = await axios.post(logOutURL,"" , logoutConfig)
          console.log(response)
          if(response.status == "200"){
           updateLoginInfo(false, {})
          }
          else
          {
            console.error("Error logging out, ")
            alert("Error logging out ")
          }
          
        }catch(error){
          console.error(error)
        }
      };
    return (
        <>
            <AuthContext.Provider value={{loginInfo, updateLoginInfo, currentForm, setCurrentForm, handleLogout}}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState;