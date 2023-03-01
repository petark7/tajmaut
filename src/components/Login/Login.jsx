import "./Login.css";
import React, { useState } from "react";

export default function LoginForm({ onSignUpClick }) {
  return (
    
      <div className="log-in">
        <h1>Најави се</h1>

        <div className="alt-login">
          <div className="google">
            <h2>Продолжи со google</h2>
          </div>
        </div>

        <h2 className="or">
          <span>или</span>
        </h2>

        <form method="post">
          <div className="user">
            <input type="text" required />
            <span></span>
            <label>Корисничко име/E-пошта</label>
          </div>

          <div class="user">
            <input type="password" required />
            <span></span>
            <label>Лозинка</label>
          </div>

          <input
            className="remember"
            type="checkbox"
            id="remember"
            name="vehicle1"
            value="Bike"
          />

          <label for="remember">Запамти ме</label>

          <div className="pass">Заборавена лозинка?</div>
          <input type="submit" value="Најави се" />
          <div className="signup">
            Немаш профил ?
            <a href="#" onClick={onSignUpClick}>
              Регистрирај се
            </a>
          </div>
        </form>
      </div>

  );
}
