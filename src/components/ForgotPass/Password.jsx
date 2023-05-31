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
        axios.post(`https://tajmaut.azurewebsites.net/api/Users/ForgotPassword?email=${emailInput}`)
        .then((response) => {
          toast.success("Ти испративме линк на email за ресетирање на лозинката!");
          onCloseClick();
        })
        .catch(error => {
          toast.error(error.response.data)
        })
      }
      else {
        toast.error("Е-адресата која ја внесе не е валидна")
      }
  }

  return (
   <>
     <div className="overlay" onClick={onCloseClick}/>
      <div className="forgot custom-modal" onClick={(e) => e.stopPropagation()}>
        
        <h1>Промена на лозинка  <p className="X" onClick={onCloseClick}>
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
          </p> </h1>
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
   </>
  );
}
