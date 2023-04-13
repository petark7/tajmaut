import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Home from "../../pages/Home/home.jsx";
import Events from "../../pages/Events/events.jsx";
import NotFound from "../../pages/error-page.jsx";
import Venues from "../../pages/Venues/venues.jsx";
import MakeReservation from "../../pages/MakeReservation";

import LoginForm from "../../components/Login/Login.jsx";
import RegisterForm from "../../components/Register/Register.jsx";
import PasswordForm from "../../components/ForgotPass/Password.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppRoutes() {

  const [notification, setNotification] = useState(null);

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

  const [modal, setModal] = useState(false);

  const handleLoginClick = () => {
    if (!modal) {
      document.body.style.overflow = 'hidden';
      setModal("Login");
    } else {
      setModal(undefined);
    }
  };

  return (
    <AuthProvider>
      <ToastContainer/>
      <Router>
        <Navbar onLoginClick={handleLoginClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/venues" element={<Venues />} />
          <Route
            path="/make-reservation/:eventID"
            element={<MakeReservation />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {modal === "Login" && (
          <LoginForm
            notify={notify}
            onSignUpClick={() => setModal("Register")}
            onPassClick={() => setModal("Password")}
            onCloseClick={() => {setModal(false)
              document.body.style.overflow = 'unset';
            }}
          />
        )}
        {modal === "Register" && (
          <RegisterForm
            onLoginClick={() => setModal("Login")}
            onCloseClick={() => {setModal(false)
              document.body.style.overflow = 'unset';
            }}
          />
        )}
        {modal === "Password" && (
          <PasswordForm
            onLoginClick={() => setModal("Login")}
            onCloseClick={() => {setModal(false)
              document.body.style.overflow = 'unset';
            }}
          />
        )}
      </Router>
    </AuthProvider>
  );
}
