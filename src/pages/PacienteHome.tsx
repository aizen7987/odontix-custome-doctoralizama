import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PacienteHome() {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-4">
            <h3 className="fw-bold text-primary">
                Bienvenido, {user?.nombre}
            </h3>

            <p className="text-muted">
                Desde aquí podrás gestionar tu perfil, citas y dar seguimiento a tus tratamientos.
            </p>

            <div className="alert alert-info mt-4">
                Selecciona una opción en el menú lateral para comenzar.
            </div>
        </div>
    );
}