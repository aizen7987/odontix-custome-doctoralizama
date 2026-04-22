import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Usuario } from "../models/Usuario";
import axiosInstance from "../api/axiosInstance";
//const [user, setUser] = useState<Usuario | null>(null);


interface AuthContextType {
    user: Usuario | null;
    loginUser: (user: Usuario) => void;
    logout: () => void;
    loading: boolean;
}


export const AuthContext = createContext<AuthContextType>({
    user: null,
    loginUser: () => { },
    logout: () => { },
    loading: false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Usuario | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const loginUser = (user: Usuario) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/logout"); // llamar backend
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }

        // limpiar frontend SIEMPRE
        setUser(null);
        localStorage.removeItem("user");
    };



    return (
        <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};