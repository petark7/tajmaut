import React, {useContext} from "react"
import {UserContext} from "../../context/UserContext.jsx"

export default function Venues() {
    const msg = useContext(UserContext);
    return (
            <div className="container--venues">
                        <h1>HI</h1> 
            </div>

    );
  };
  