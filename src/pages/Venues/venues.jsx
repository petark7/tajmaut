import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Venues() {
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    console.log(authContext.authState);
  };
  return (
    <div className="container--venues">
      <button onClick={handleLogin}>Login</button>
      <h1>{authContext.authState.authToken}</h1>
      <h1>{authContext.authState.tokenType}</h1>
      <h1>{authContext.authState.createdAt}</h1>
      <h1>{authContext.authState.isAuthenticated}</h1>
    </div>
  );
}
