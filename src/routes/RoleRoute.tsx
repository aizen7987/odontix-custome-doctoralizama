import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    role: string | string[];
}

export default function RoleRoute({ children, role }: Props) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Cargando...</div>;

    if (!user) return <Navigate to="/" />;

    if (Array.isArray(role)) {
        if (!role.includes(user.rol)) {
            return <Navigate to="/dashboard" />;
        }
    } else {
        if (user.rol !== role) {
            return <Navigate to="/dashboard" />;
        }
    }

    return <>{children}</>;
}