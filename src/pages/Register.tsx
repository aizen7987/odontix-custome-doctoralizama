import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        password: "",
        telefono: "",
        direccion: "",
        fecha_nacimiento: "",
        genero: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const { loginUser } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación
        if (
            !form.nombres ||
            !form.apellidos ||
            !form.email ||
            !form.password ||
            !form.telefono ||
            !form.direccion ||
            !form.fecha_nacimiento ||
            !form.genero
        ) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const res = await register(form);

            if (res.success) {

                loginUser(res.data);
                alert("Registro exitoso");
                navigate("/pacienteHome", { replace: true });
            } else {
                alert(res.message);
            }
        } catch (error) {
            alert("Error al registrar");
        }
    };


    return (
        <div className="container py-5 bg-light min-vh-100">
            <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: "700px", borderRadius: "16px" }}>

                <div className="text-center mb-4">
                    <h4 className="text-primary fw-bold">Registro de Paciente</h4>
                    <small className="text-muted">Completa tus datos</small>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Nombres</label>
                            <input name="nombres" className="form-control" onChange={handleChange} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Apellidos</label>
                            <input name="apellidos" className="form-control" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input name="email" type="email" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input name="password" type="password" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Teléfono</label>
                            <input name="telefono" className="form-control" onChange={handleChange} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Género</label>
                            <select name="genero" className="form-select" onChange={handleChange}>
                                <option value="">Seleccionar</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Dirección</label>
                        <input name="direccion" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Fecha de nacimiento</label>
                        <input name="fecha_nacimiento" type="date" className="form-control" onChange={handleChange} />
                    </div>

                    <button className="btn btn-success w-100">
                        Registrarse
                    </button>
                </form>

                <div className="text-center mt-4">
                    <small>
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login">Iniciar sesión</Link>
                    </small>
                </div>

            </div>
        </div>
    );
}