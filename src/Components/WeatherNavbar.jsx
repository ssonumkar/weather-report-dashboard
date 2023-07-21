import React, {useContext}from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../Context/AuthContext/AuthContext';
const WeatherNavbar = () => {
    const auth = useContext(AuthContext)
    
    const handleLogout = () => {
      auth.handleLogout()
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/weather-search">Weather Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/weather-search-history">Weather Search History</Link>
                        </li>

                    </ul>
                    <form className="d-flex">
                    <Link className="navbar-brand" to="/" onClick={handleLogout}>logout</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default WeatherNavbar