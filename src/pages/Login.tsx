import { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login(email, password);
            if (res.success) {
                loginUser(res.user);

                if (res.user.rol === "admin" || res.user.rol === "doctor") {
                    navigate("/dashboard", { replace: true });
                } else if (res.user.rol === "paciente") {
                    navigate("/paciente", { replace: true });
                }
            } else {
                alert(res.message);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">

            <div className="card shadow border-0 p-4" style={{ width: "360px", borderRadius: "16px" }}>

                {/* Header */}
                <div className="text-center mb-4">
                    <div style={{ fontSize: "38px" }}>🦷</div>
                    <h4 className="fw-bold text-primary mb-1">Clínica Dental</h4>
                    <small className="text-muted">Acceso al sistema</small>
                </div>

                {/* Inputs */}
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="ejemplo@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </button>

                {/* Footer */}
                <div className="text-center mt-4">
                    <small className="text-muted">
                        ¿No tienes cuenta?{" "}
                        <Link to="/register" className="fw-semibold text-decoration-none">
                            Registrarse
                        </Link>
                    </small>
                </div>

            </div>
        </div>
    );
}