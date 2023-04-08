import "./Password.css";
import React, { useContext, useState } from "react";
import { ValidationContext } from "../../context/ValidationProvider";
import axios from "axios";
import { toast } from "react-toastify";
export default function PasswordForm({ onLoginClick, onCloseClick }) {

  const {emailRegex} = useContext(ValidationContext);
  const [emailInput, setEmailInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();  
    if (emailInput.match(emailRegex))
      {
        axios.post(`https://tajmautmk.azurewebsites.net/api/Users/ForgotPassword?email=${emailInput}`)
        .then((response) => {
          toast.success("Ти испративме линк на email за ресетирање на лозинката!");
          onCloseClick();
        })
        .catch(error => {
          toast.error(error.response.data)
        })
      }
  }

  return (
    <div className="overlay">
      <div className="forgot custom-modal">
        <h1>Промена на Лозинка <p className="X" onClick={onCloseClick} >X</p> </h1>
        <p>
          Внеси ја твојата е-адреса и ќе добиеш линк за промена на лозинката.
        </p>

        <form onSubmit={handleSubmit}>
          <section>
            <div className="user">
              <input 
              type="text" 
              value={emailInput}
              onChange={(event) => {setEmailInput(event.target.value)}}
              required />
              <span></span>
              <label>E-пошта</label>
            </div>
          </section>

          <input className="formButton" type="submit" value="Испрати" />
          <div className="register">
            <a href="#" onClick={onLoginClick}>
              Назад до најава
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
