import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
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

  return (
    <div className="navbar-container">
      <NavLink
        to="/"
      >
        <img
        className="navbar-logo"
        href="/"
        src={process.env.PUBLIC_URL + "/img/logo.png"}
      />
      </NavLink>
      
      <ul className="navbar_links">
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/events"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Распоред
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/venues"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Локали
          </NavLink>
        </li>
      </ul>
      {authContext.authToken === null ? (
        <div className="loginArea">
          <button className="button navbar-button_login" onClick={onLoginClick}>
            Најава
          </button>
        </div>
      ) : (
        <div className="loginArea">
          <UserProfile />
        </div>
      )}
    </div>
  );
}
