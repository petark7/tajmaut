import React, { useState } from 'react';
import "./NotLoggedModal.css"
import LoginForm from "../../components/Login/Login"
import RegisterForm from '../Register/Register';
import PasswordForm from '../ForgotPass/Password';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            onCloseClick={() => {
              setModal("");
              document.body.style.overflow = "unset";
            }}
          />
        )}
        {modal == "" ? (
          <div
            className="notLoggedModal-mainContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon
              onClick={() => {
                props.setShowModal(false);
                document.body.style.overflow = "unset";
              }}
              sx={{
                fontSize: 35,
                position: "relative",
                top: 7,
                right: -200,
                color: "#515151",
                cursor: "pointer",
              }}
            />
            <div className="notLoggedModal-elements">
              <AccountCircleIcon
               sx={{
                fontSize: 100,
                color: "#515151",
              }}/>
              <h1 className="notLoggedModal-header">
                {props.customHeader != undefined
                  ? props.customHeader
                  : "Мора да си најавен/а за да ја извршиш таа акција!"}
              </h1>
              <button
                className="notLoggedModal-createAccountbtn"
                onClick={openLoginModal}
              >
                Најави се
              </button>
              <button
                className="notLoggedModal-loginbtn"
                onClick={openRegisterModal}
              >
                Креирај акаунт
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
}

export default NotLoggedModal;