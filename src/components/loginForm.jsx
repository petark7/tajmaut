import React from "react";
import "./loginForm.css";

const LoginForm = () => {
    
    return(

       <div className="cover">

        <h1 className="log-in">Log in</h1>
            <input type="text" placeholder="usrname" />
            <input type="password" placeholder="password" />

            <div className="login-btn">Login</div>

            <p className="text">Another acount</p> 
            
            <div className="alt-login">
                <div className="facebook"></div>
                <div className="google"></div>
            </div>

       </div>

    )
}

export default LoginForm