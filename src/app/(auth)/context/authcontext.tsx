"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    email: string;
    setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [email, setEmailState] = useState<string>("");

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

    return (
        <AuthContext.Provider value={{ email, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}