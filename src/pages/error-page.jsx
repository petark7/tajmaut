import { useNavigate } from "react-router-dom";
import "./ErrorPage.css"


export default function ErrorPage() {

    const navigate = useNavigate();
    const redirectHome = () => {
        navigate('/');
    }

    return (
       <div className="errorPage-mainContainer">
         <div className="container--errorpage">
                <div className="errorPage-containerLeft">
                <h2 className="errorPage-errorCode">404</h2>
                <h1 className="errorPage-bigHeader">хмм, страната не беше најдена</h1>
                <h2 className="errorPage-smallerHeader">изгледа заминала на некој настан</h2> 
                <button className="bn1 errorPage-homeButton" onClick={redirectHome}>Врати се на почетна</button>
              </div>
              <div className="errorPage-containerRight">
                <img className="errorPage-image" src={require('../img/tryAgain.png')} height={300}></img>
              </div>
        </div>
       </div>
    );
  };
