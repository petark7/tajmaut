import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);

    const logIn = (token) => {
        setAuthToken(token);
    };

    const logOut = () => {
        setAuthToken(null);
    };

    const authContext = {
        authToken,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
    )
}