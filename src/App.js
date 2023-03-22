import { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/home.jsx";
import Events from "./pages/Events/events.jsx";
import NotFound from "./pages/error-page.jsx";
import Venues from "./pages/Venues/venues.jsx";
import MakeReservation from "./pages/MakeReservation/";
import LoginForm from "./components/Login/Login.jsx";
import RegisterForm from "./components/Register/Register.jsx";
import PasswordForm from "./components/ForgotPass/Password.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  const [modal, setModal] = useState(false);

  const handleLoginClick = () => {
    if (!modal) {
      setModal("Login");
    } else {
      setModal(undefined);
    }
  };

  return (
    <Router>
      <Navbar onLoginClick={handleLoginClick} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/make-reservation/:eventID" element={<MakeReservation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {modal == "Login" && (
        <LoginForm onSignUpClick={() => setModal("Register")} onPassClick={() => setModal("Password")}  onCloseClick={() => setModal(false)}/>
      )}
      {modal == "Register" && (
        <RegisterForm onLoginClick={() => setModal("Login")} onCloseClick={() => setModal(false)}/>
      )}
      {modal == "Password" && (
        <PasswordForm onLoginClick={() => setModal("Login")} onCloseClick={() => setModal(false)}/>
      )}
    </Router>
  );
}
