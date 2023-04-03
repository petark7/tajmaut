import { createContext, useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initialAuthState = {
  authToken: cookies.get('authToken') || null,
  isAuthenticated: cookies.get('authToken') || false,
};

export const AuthContext = createContext(initialAuthState);

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialAuthState);
  const [userId, setUserId] = useState(null)

  const setId = (id) => {
    setUserId(id);
  }

  const login = (authData) => {
    cookies.set('accessToken', authData.accessToken, { path: '/' });
    setAuthState({
      authToken: authData.accessToken,
      tokenType: authData.tokenType,
      createdAt: authData.createdAt,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    cookies.remove('authToken', { path: '/' });
    setAuthState(initialAuthState);
  };

  const authContext = {
    userId,
    setId,
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
