import "./Navbar.css"
import {NavLink} from "react-router-dom"

const activeStyle = {
    color: "#4F3E94",
    fontWeight : "600",
    textDecoration: 'none',
    padding: "10px 20px",
    background: "#CAC5E7",
    borderRadius: "10px"
 }

 const inactiveStyle = {
    color: "#4F3E94",
    textDecoration: 'none',
    padding: "10px 20px"
 }

export default function Navbar () {

    return (
        <div className="navbar-container">
                <a href="/"><img className = "navbar-logo" href="/" src = {process.env.PUBLIC_URL + '/img/logo.png'}/></a>
                <ul className="navbar_links">
                    <li>
                        <NavLink to="/" style={({isActive}) => 
                                 isActive ? activeStyle : inactiveStyle
                                 }>
                                    Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/events" style={({isActive}) => 
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
                <button className="navbar-button_login button">Најава</button>
        </div>
    )
}