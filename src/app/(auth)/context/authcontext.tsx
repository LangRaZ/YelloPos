"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    email: string;
    username: string;
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [email, setEmailState] = useState<string>("");
    const [username, setUsernameState] = useState<string>("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmailState(storedEmail);
        }
    }, []);

    const setEmail = (email: string) => {
        setEmailState(email);
        if(email){
            localStorage.setItem("userEmail", email);
        }
    }

    const setUsername = (username: string) => {
        setUsernameState(username);
        if(username){
            localStorage.setItem("username", username);
        }
    }

    return (
        <AuthContext.Provider value={{ email, username, setEmail, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}