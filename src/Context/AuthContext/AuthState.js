import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const s1 = {
        "loggedIn": false,
        "user": {
            "id": -1,
            "username": "sadas",
            "jwt_token": ""
        }
    }
    const [state, setAuth] = useState(s1);

    return (
        <>
            <AuthContext.Provider value={{state, setAuth}}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState;