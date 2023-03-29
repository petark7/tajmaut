import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Venues() {
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    authContext.login("LOGIN TOKEN SET");
  };
  return (
    <div className="container--venues">
      <button onClick={handleLogin}>Login</button>
      <h1>{authContext.authState.authToken}</h1>
    </div>
  );
}
