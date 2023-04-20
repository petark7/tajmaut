import "./Register.css";
import axios from "axios";
import React, { useState, useContext } from "react";
import {toast} from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { ValidationContext } from "../../context/ValidationProvider";

export default function RegisterForm({ onLoginClick, onCloseClick, notify }) {
  const validationContext = useContext(ValidationContext)
  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  const [showSpinner, setShowSpinner] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const onInputChange = (event) => {
    // console.log(`${event.target.name}, value = ${event.target.value}, ${JSON.stringify(formData)}`)
    setFormData({
      ...formData,
      [event.target.name] : event.target.value,
    })
  }

  const validateData = () => {
      if (formData.email.match(validationContext.emailRegex))
      {
        // valid email, check passwords
        // passwords should be at least 6 chars long and should match 
        if (formData.password.length >= 6)
        {
          if (formData.password === formData.confirmPassword) {
            // executes if everything is OK
            return true;
          }
          else {
            toast.error("Лозинките не ти се совпаѓаат.", {
              position: "top-center",
              autoClose: 5000
            })
          }
        }
        else {
          toast.error("Лозинката мора да долга барем 6 карактери!", {
            position: "top-center",
            autoClose: 5000
          })
        }
      }
      else {
        toast.error("Упс. Внесе невалидна е-пошта 🙁", {
          position: "top-center",
          autoClose: 5000
        })
      }
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    // show spinner on button click

    let dataToSend = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
    }
    // send formData to API
    if (validateData() === true) {
      setShowSpinner(true);
      axios.post('https://tajmautmk.azurewebsites.net/api/Users', dataToSend)
    .then(response => {
      // on success
      setShowSpinner(false);
      toast.success("Профилот беше успешно креиран! Добредојде 👋❤️", {
        position: "bottom-center",
        autoClose: 5000
      })
      // open login form after registration
      onLoginClick();
    })
    .catch(error => {
      // on failure
      setShowSpinner(false);
      console.log(error.response.status)
      if (error.response.status === 409) {
        toast.error("Корисник со таа е-пошта веќе постои.", {
          position: "top-center",
          autoClose: 5000
        })
      }
      else {
        toast.error("Настана некоја грешка. Пробај повторно?", {
          position: "top-center",
          autoClose: 5000
        })
      }
    })
    }
  }

  return (


   <>
    <div className="overlay" onClick={onCloseClick}/>
      <div className="register-in custom-modal" onClick={(e) => e.stopPropagation()}>
        <h1>
          Регистрација{" "}
          <p className="X" onClick={onCloseClick}>
          <svg className="close" width="22" height="22" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
              <path className="close" d="M0.82153 0.821407C1.4724 0.170533 2.52768 0.170533 3.17855 0.821407L12 9.6429L20.8215 0.821407C21.4724 0.170533 22.5277 0.170533 23.1786 0.821407C23.8294 1.47228 23.8294 2.52756 23.1786 3.17843L14.3571 11.9999L23.1786 20.8214C23.8294 21.4723 23.8294 22.5276 23.1786 23.1784C22.5277 23.8293 21.4724 23.8293 20.8215 23.1784L12 14.3569L3.17855 23.1784C2.52768 23.8293 1.4724 23.8293 0.82153 23.1784C0.170655 22.5276 0.170655 21.4723 0.82153 20.8214L9.64302 11.9999L0.82153 3.17843C0.170655 2.52756 0.170655 1.47228 0.82153 0.821407Z" fill="white" />
            </svg>
          </p>
        </h1>

        <form onSubmit={onFormSubmit}>
          <section className="registerForm--names">
            <div className="user">
              <input 
              type="text" 
              name="firstName"
              onChange={onInputChange}
              value={formData.firstName}
              required 
              />
              <span></span>
              <label>Име</label>
            </div>

            <div className="user">
              <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              required 
              />
              <span></span>
              <label>Презиме</label>
            </div>
          </section>

          <section>
            <div className="user">
              <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required 
              />
              <span></span>
              <label>E-пошта</label>
            </div>
          </section>

          <section className="registerForm-passwords">
            <div className="user">
              <input 
              type={isShown ? "text" : "password"} 
              name="password"
              value={formData.password}
              onChange={onInputChange}
              required 
              />
              <span></span>
              <label>Лозинка</label>
            </div>

            <div className="user">
              <input 
              type={isShown ? "text" : "password"} 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              required />
              <span></span>
              <label>Потврди</label>
            </div>
          </section>
          

          <label className="showPassword">Прикажи лозинка
          <input
            id="checkbox"
            type="checkbox"
            checked={isShown}
            onChange={togglePassword}
          />
            <span className="checkmark"></span>
          </label>

          <button 
            className="formButton" 
            type="submit"
            >
             {showSpinner ? <LoadingSpinner style="button"/> : "Регистрирај се" }
          </button>

          
          <div className="register">
            Веќе си зачленет?
            <a href="#" onClick={onLoginClick}>
              Најави се
            </a>
          </div>
        </form>
      </div>
   </>
  );
}
