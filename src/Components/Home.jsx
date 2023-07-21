import React, {useContext, useState} from "react";
import AuthState from "../Context/AuthContext/AuthState";
import AuthContext from "../Context/AuthContext/AuthContext";
const Home = (props) => {
    const auth = useContext(AuthContext)
    
    
    return (
      <AuthState>
      <div >
        {
          props.setCurrentForm(auth.currentForm, auth.loginInfo.isLoggedIn)
        }
      </div>
      </AuthState>
    );
}

export default Home