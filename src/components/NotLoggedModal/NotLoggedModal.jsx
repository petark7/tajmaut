import React, { useState } from 'react';
import "./NotLoggedModal.css"
import LoginForm from "../../components/Login/Login"
import RegisterForm from '../Register/Register';
import PasswordForm from '../ForgotPass/Password';
import { toast } from 'react-toastify';
function NotLoggedModal(props) {

    const notify = (type, message) => {
        if (type === "success") {
          return (toast.success(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }))
        }
        if (type === "error") {
          return (toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }))
        }
      };

      const [modal, setModal] = useState("");

      const onSuccess = () => {
        props.setShowModal(false);
      }

    const openLoginModal = () => {
        setModal("login");
        //props.setShowModal(false);
    }

    const openRegisterModal = () => {
        setModal("register");
        //props.setShowModal(false);
    }

    console.log(modal);
    return (
      <>
        {modal === "login" && (
          <LoginForm
            notify={notify}
            onSignUpClick={() => setModal("register")}
            onPassClick={() => setModal("forgot-password")}
            onCloseClick={() => {
              setModal("");
              document.body.style.overflow = "unset";
            }}
            onSuccess={onSuccess}
          />
        )}

        {modal === "register" && (
          <RegisterForm
            onLoginClick={() => setModal("login")}
            onCloseClick={() => {
              setModal("");
              document.body.style.overflow = "unset";
            }}
          />
        )}

        {modal === "forgot-password" && (
           <PasswordForm
           onLoginClick={() => setModal("login")}
           onCloseClick={() => {setModal("")
             document.body.style.overflow = 'unset';
           }}
         />
        )}
        {modal == "" ? (
          <div
            className="notLoggedModal-mainContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="notLoggedModal-elements">
              <h1 className="notLoggedModal-header">
                Мора да си најавен/а за направиш резервација!
              </h1>
              <button
                className="notLoggedModal-createAccountbtn"
                onClick={openRegisterModal}
              >
                Отвори акаунт
              </button>
              <button
                className="notLoggedModal-loginbtn"
                onClick={openLoginModal}
              >
                Најави се
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
}

export default NotLoggedModal;