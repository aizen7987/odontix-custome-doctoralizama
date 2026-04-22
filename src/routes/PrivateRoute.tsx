import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Cargando...</div>;

    if (!user) return <Navigate to="/" />;

    return <>{children}</>;
}