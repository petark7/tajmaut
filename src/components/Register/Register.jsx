import "./Register.css";
import React, { useState } from 'react';

export default function RegisterForm({ onLoginClick }) {

    const [isShown, setIsSHown] = useState(false);
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
      };

      
    return (
        <div className="register-in">
        <h1>Регистрација</h1>

            <form method="post">

                <section>
                <div className="user">
                    <input  type="text" required />
                    <span></span>
                    <label>Име</label>
                </div>

                <div class="user">
                    <input type="text" required />
                    <span></span>
                    <label>Презиме</label>
                </div>
                </section>

                <section>
                <div className="user">
                    <input  type="text" required />
                    <span></span>
                    <label>E-пошта</label>
                </div>

                </section>

                <section>
                <div className="user">
                    <input  
                    type={isShown ? "text" : "password"} 
                    required />
                    <span></span>
                    <label>Лозинка</label>
                </div>

                <div class="user">
                    <input 
                     type={isShown ? "text" : "password"}
                     required 
                    />
                    <span></span>
                    <label>Потврди</label>
                </div>
                </section>
                <input 
                id="checkbox" 
                type="checkbox" 
                checked={isShown}
                onChange={togglePassword}
                
                 />

                <label for="checkbox">Прикажи лозинка</label>

                <input type="submit" value="Регистрирај се" />
                <div className="signup">
                    Веќе си зачленет?<a href="#" onClick={onLoginClick}> Најави се</a>
                </div>
            </form>

            
        </div>

        
    )



}
