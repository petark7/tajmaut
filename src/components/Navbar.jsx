import "./css/Navbar.css"

export default function Navbar () {
    return (
        <div className="navbar-container">
                <img className = "logo" src = {require('../data/images/logo.png')}/>
                <ul className="navbar_links">
                    <a href ="/">Насловна</a>
                    <a href ="/schedule">Распоред</a>
                    <a href ="/venues">Локали</a>
                </ul>
                <button className="navbar-button_login">Најава</button>
        </div>
    )
}