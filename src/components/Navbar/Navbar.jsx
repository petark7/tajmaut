import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import UserProfile from "../UserProfile/UserProfile";

const activeStyle = {
  color: "#4F3E94",
  fontWeight: "600",
  textDecoration: "none",
  padding: "10px 20px",
  background: "#CAC5E7",
  borderRadius: "10px",
};

const inactiveStyle = {
  color: "#4F3E94",
  textDecoration: "none",
  padding: "10px 20px",
};

export default function Navbar({ onLoginClick }) {
  const authContext = useContext(AuthContext);

  const [showNavbar, setShowNavbar] = useState(false)

const handleShowNavbar = () => {
  setShowNavbar(!showNavbar)
}

  return (
    <div className="navbar-container">
      <NavLink to="/">
        <img
          className="navbar-logo"
          href="/"
          src={process.env.PUBLIC_URL + "/img/logo.png"}
        />
      </NavLink>

      <ul className={`navbar_links ${showNavbar && 'active'}`}>
        <li className="home">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Почетна
          </NavLink>
        </li>

        <li className="events">
          <NavLink
            to="/events"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Настани
          </NavLink>
        </li>

        <li className="venues">
          <NavLink
            to="/venues"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Локали
          </NavLink>
        </li>
      </ul>
      <div className="loginArea">
      <div className="hamburgerMenu">
            <i className="fas fa-bars" onClick={handleShowNavbar}></i>
          </div>
      {authContext.authState.authToken === null ? (
        <>
          
          <button className="button navbar-button_login" onClick={onLoginClick}>
            Најава
          </button>
        </>
      ) : (
        <>
          <UserProfile />
        </>
      )}
      </div>
    </div>
  );
}
