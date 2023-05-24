import { createContext } from "react";
export const ValidationContext = createContext({});

export default function ValidationProvider({ children }) {

    const emailRegex = /^[a-zA-Z0-9._]{1,100}@[a-zA-Z0-9.-]{2,10}\.[a-zA-Z]{2,6}$/;
    const phoneNumberRegex = /^07\d{7}$/;

    const validationContext = {
        emailRegex,
        phoneNumberRegex,
    }

    return (
        <ValidationContext.Provider value={validationContext}>
            {children}
        </ValidationContext.Provider>
    )
}
