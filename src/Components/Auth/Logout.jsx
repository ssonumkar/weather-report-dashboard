import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../../Context/AuthContext/AuthContext';

const Logout = () => {
  const auth = useContext(AuthContext)
  const handleLogout = () => {
    auth.loggedIn= false;
    auth.user={  };   
  }
  return (
    <div>
      <Link className="navbar-brand" to="/login" onClick={handleLogout}>logout</Link>
    </div>
  )
}

export default Logout