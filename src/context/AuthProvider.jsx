import { createContext, useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initialAuthState = {
  authToken: cookies.get('accessToken') || null,
  isAuthenticated: cookies.get('accessToken') !== undefined || false,
};

export const AuthContext = createContext(initialAuthState);

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialAuthState);
  const [userId, setUserId] = useState(cookies.get('userID') || null)

  const setId = (id) => {
    setUserId(id);
    cookies.set('userID', id, { path: '/' });
  }

  const login = (authData) => {
    const tokenExpirationDate = new Date (authData.expires);
    cookies.set('accessToken', authData.accessToken, { path: '/', expires: tokenExpirationDate });
    setAuthState({
      authToken: authData.accessToken,
      tokenType: authData.tokenType,
      createdAt: authData.createdAt,
      expires: authData.expires,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('userID', { path: '/' });
    setAuthState({
      authToken: null,
      isAuthenticated: false,
    });
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
