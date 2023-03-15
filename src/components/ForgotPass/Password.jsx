import "./Password.css";
import React, { useState } from "react";

export default function PasswordForm({ onLoginClick }) {
  return (
    <div className="forgot">
        
      <h1>Промена на Лозинка</h1>
      <p>Внеси ја твојата е-адреса и ќе добиеш линк за промена на лозинката.</p>

      <form>
        <section>
          <div className="user">
            <input type="text" required />
            <span></span>
            <label>E-пошта</label>
          </div>
        </section>

        <input type="submit" value="Испрати" />
        <div className="register">
          <a href="#" onClick={onLoginClick}>
            {" "}
            Назад до најава
          </a>
        </div>
      </form>
    </div>
  );
}
