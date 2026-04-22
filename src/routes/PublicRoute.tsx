import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }: any) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si ya está logueado → fuera del login
    if (user) {
        if (user.rol === "admin" || user.rol === "doctor") {
            return <Navigate to="/dashboard" replace />;
        }

        if (user.rol === "paciente") {
            return <Navigate to="/paciente" replace />;
        }
    }

    return children;
}