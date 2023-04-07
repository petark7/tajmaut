import "./Login.css";
import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx"

export default function LoginForm({
  notify,
  onSignUpClick,
  onPassClick,
  onCloseClick,
}) {

  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const {authState, login, setId} = useContext(AuthContext);
  
  //CHECK IF CODE OKAY (receive token directly, instead of using the token (state) that should be set after login)
  // function sets user ID to context after login
  const setUserID = (token) => {
    console.log(`${token} this is the token that's sent`)
    axios.get('https://tajmautmk.azurewebsites.net/api/Users/GetCurrentUserID', 
    {
      headers: {
        'Authorization' : `bearer ${token}`,
      }
    })
    .then(function (response) {
      // handle success
      setId(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  
  function handleSubmit (event) {
    setShowSpinner(true);
    event.preventDefault();
    const userData = {
      email: emailField,
      password: passwordField,
    }

    axios.post('https://tajmautmk.azurewebsites.net/api/Auth/login', userData)
    .then(response => {
      // handle successful login response
      setShowSpinner(false);
      console.log(response.data);
      login(response.data);
      setUserID(response.data.accessToken)
      notify("success", "Добредојде! Каде вечер? 😁");
      onCloseClick();
    })
    .catch(error => {
      // handle login error
      setShowSpinner(false);
      notify("error", "Имаш грешка со податоците. Провери ги?");
    });
  }

 
  return (
    <>
    <ToastContainer
    position="top-center"
    />
      <div className="overlay" onClick={onCloseClick} />

      <div className="log-in custom-modal">
        <h1>
          Најава
          <p className="closeButton" onClick={onCloseClick}>
            <svg
              className="close"
              width="22"
              height="22"
              viewBox="0 0 29 29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="close"
                d="M0.82153 0.821407C1.4724 0.170533 2.52768 0.170533 3.17855 0.821407L12 9.6429L20.8215 0.821407C21.4724 0.170533 22.5277 0.170533 23.1786 0.821407C23.8294 1.47228 23.8294 2.52756 23.1786 3.17843L14.3571 11.9999L23.1786 20.8214C23.8294 21.4723 23.8294 22.5276 23.1786 23.1784C22.5277 23.8293 21.4724 23.8293 20.8215 23.1784L12 14.3569L3.17855 23.1784C2.52768 23.8293 1.4724 23.8293 0.82153 23.1784C0.170655 22.5276 0.170655 21.4723 0.82153 20.8214L9.64302 11.9999L0.82153 3.17843C0.170655 2.52756 0.170655 1.47228 0.82153 0.821407Z"
                fill="white"
              />
            </svg>
          </p>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="user">
            <input 
              type="text"
              id="email"
              value={emailField}
              onChange= {((event) => {
                setEmailField(event.target.value)
              })}
              required 
            />
            <span></span>
            <label>Корисничко име/E-пошта</label>
          </div>

          <div className="user">
            <input 
              type="password" 
              required 
              id="password"
              value={passwordField}
              onChange= {((event) => {
                setPasswordField(event.target.value)
              })}
            />
            <span></span>
            <label>Лозинка</label>
          </div>

          <div className="loginContainer">
            <label className="rememberMe">
              Запамти ме
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <div className="forgotPassword" onClick={onPassClick}>
              Заборавена лозинка?
            </div>
          </div>

          <button 
            className="formButton" 
            type="submit"
            >
             {showSpinner ? <LoadingSpinner style="button"/> : "Најави се" }
          </button>

          <div className="signup">
            Немаш профил?
            <a href="#" onClick={onSignUpClick}>
              <span> </span>Регистрирај се
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
