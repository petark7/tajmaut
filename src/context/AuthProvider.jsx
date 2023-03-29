import { createContext, useState } from "react";
import Cookies from 'universal-cookie';
import { redirect } from "react-router-dom";

const cookies = new Cookies();
const initialAuthState = {
  authToken: cookies.get('authToken') || null,
  isAuthenticated: cookies.get('authToken') || false,
};

export const AuthContext = createContext(initialAuthState);

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialAuthState);

  const login = (authToken) => {
    cookies.set('authToken', authToken, { path: '/' });
    setAuthState({
      authToken,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    cookies.remove('authToken', { path: '/' });
    setAuthState(initialAuthState);
  };

  const authContext = {
    authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>
  );
}
