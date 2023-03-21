import CreateEventForm from "../../components/CreateEvent/CreateEventForm"
import AuthenticateForm from "../../components/AuthenticateForm/AuthenticateForm"
import {useState} from "react"
import "./dashboard.css"

export default function Dashboard () {
    
    const [authCode, setAuthCode] = useState('')

    function handleAuthResults (results) {
        try {
            setAuthCode(results);
            alert("Logged in!");
        }
        catch (ex)
        {
            console.log(ex);
        }
    }
    console.log(authCode);

    return (
        <>
            {authCode !== '' ? <h3 className="authenticatedH3">Authenticated Successfully!</h3> : <h3 className="notAuthenticatedH3">Not Authenticated</h3>}
            <AuthenticateForm handleResults={handleAuthResults}/>
        </>
    )
}