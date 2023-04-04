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
    </div>
  );
}
