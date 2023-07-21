import React, {useContext}from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../Context/AuthContext/AuthContext';
const Navbar = () => {
    const auth = useContext(AuthContext)
    const handleLogout = () => {
      auth.setState({
        "loggedIn": false,
        "user": {}
      })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
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
                    <Link className="navbar-brand" to="/login" onClick={handleLogout}>logout</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar