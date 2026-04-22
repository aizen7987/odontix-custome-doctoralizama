import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column p-3 text-white"
            style={{
                width: "260px",
                height: "100vh",
                background: "linear-gradient(180deg, #0d6efd, #0a58ca)"
            }}
        >
            <h4 className="mb-4 text-center">
                <i className="bi bi-heart-pulse me-2"></i>
                Clínica Dental
            </h4>

            <hr />

            {/* ADMIN */}
            {user?.rol === "admin" && (
                <>
                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/usuarios")}>
                        Usuarios
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/doctor/citas")}>
                        Ver Citas
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/doctor/pacientes")}>
                        Pacientes
                    </button>
                </>
            )}

            {/* DOCTOR */}
            {user?.rol === "doctor" && (
                <>
                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/doctor/citas")}>
                        Citas
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/doctor/pacientes")}>
                        Pacientes
                    </button>
                </>
            )}

            {/* PACIENTE */}
            {user?.rol === "paciente" && (
                <>
                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/paciente")}
                    >
                        <i className="bi bi-house me-2"></i>
                        Inicio
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/perfil")}
                    >
                        <i className="bi bi-person me-2"></i>
                        Perfil
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/citas")}
                    >
                        <i className="bi bi-calendar-check me-2"></i>
                        Citas
                    </button>

                    <button
                        className="btn btn-outline-light mb-2 text-start"
                        onClick={() => navigate("/seguimiento")}
                    >
                        <i className="bi bi-file-medical me-2"></i>
                        Seguimiento
                    </button>
                </>
            )}

            <div className="mt-auto">
                <button
                    className="btn btn-danger w-100"
                    onClick={async () => {
                        await logout();
                        navigate("/", { replace: true });
                    }}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}