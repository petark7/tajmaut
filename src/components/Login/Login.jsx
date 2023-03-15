import "./Login.css";
import React, { useState } from "react";

export default function LoginForm({ onSignUpClick, onPassClick }) {
  return (
    <div className="overlay">
      <div className="log-in">
        <h1>Најава</h1>

        <div className="alt-login">
          <div className="google">
            <h2>Продолжи со google</h2>
          </div>
        </div>

        <h2 className="or">
          <span>или</span>
        </h2>

        <form>
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

          <input className="remember" type="checkbox" id="remember" />

          <label for="remember">Запамти ме</label>

          <div className="pass" onClick={onPassClick}>
            Заборавена лозинка?
          </div>
          <input type="submit" value="Најави се" />
          <div className="signup">
            Немаш профил ?
            <a href="#" onClick={onSignUpClick}>
              Регистрирај се
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
