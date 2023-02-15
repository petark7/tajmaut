import "./Navbar.css"
import {NavLink} from "react-router-dom"

const activeStyle = {
    color: "#4F3E94",
    "font-weight" : "600",
    "text-decoration": 'none',
    padding: "10px 20px",
    background: "#CAC5E7",
    "border-radius": "10px"
 }

 const inactiveStyle = {
    color: "#4F3E94",
    "text-decoration": 'none',
    padding: "10px 20px"
 }

export default function Navbar () {

    return (
        <div className="navbar-container">
                <a href="/"><img className = "logo" href="/" src = {process.env.PUBLIC_URL + '/img/logo.png'}/></a>
                <ul className="navbar_links">
                    <li>
                        <NavLink to="/" style={({isActive}) => 
                                 isActive ? activeStyle : inactiveStyle
                                 }>
                                    Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/schedule" style={({isActive}) => 
                                 isActive ? activeStyle : inactiveStyle
                                 }>
                                    Распоред
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/venues" style={({isActive}) => 
                                 isActive ? activeStyle : inactiveStyle
                                 }>
                                    Локали
                        </NavLink>
                    </li>

                </ul>
                <button className="navbar-button_login">Најава</button>
        </div>
    )
}