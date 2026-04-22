import { useEffect, useState } from "react";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../api/usuarioApi";
import type { Usuario } from "../models/Usuario";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("doctor");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [error, setError] = useState("");

    const loadUsuarios = async () => {
        const res = await getUsuarios();
        if (res.success) {
            setUsuarios(res.data);
        }
    };

    useEffect(() => {
        loadUsuarios();
    }, []);

    const selectUsuario = (u: Usuario) => {
        setSelectedId(u.id);
        setNombre(u.nombre ?? "");
        setEmail(u.email);
        setRol(u.rol);
    };

    const handleNuevo = () => {
        setSelectedId(null);
        setNombre("");
        setEmail("");
        setPassword("");
        setRol("doctor");
    };

    const handleSave = async () => {
        let res;

        if (!nombre || !email) {
            setError("Nombre y correo son obligatorios");
            return;
        }

        // Solo validar password si es NUEVO
        if (!selectedId && !password) {
            setError("La contraseña es obligatoria");
            return;
        }

        if (selectedId) {
            res = await updateUsuario(selectedId, {
                nombre,
                email,
                password: password || undefined
            });
        } else {
            res = await createUsuario({
                nombre,
                email,
                password,
                rol
            });
        }

        if (res.success) {
            loadUsuarios();
            handleNuevo();
            setError("");
        } else {
            alert(res.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedId) return;

        if (!confirm("¿Eliminar usuario?")) return;

        const res = await deleteUsuario(selectedId);

        if (res.success) {
            loadUsuarios();
            handleNuevo();
        }
    };

    return (
        <div className="container-fluid">

            {/* FORMULARIO */}
            <div className="card border-0 shadow-lg rounded-4 mb-4">
                <div className="card-body">

                    <h5 className="mb-3">
                        <i className="bi bi-person-plus me-2"></i>
                        Mantenimiento Usuario
                    </h5>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <input
                        className="form-control form-control-lg mb-2"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={e => {
                            setNombre(e.target.value);
                            setError("");
                        }}
                    />

                    <input
                        className="form-control form-control-lg mb-2"
                        placeholder="Email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value),
                                setError("");
                        }}
                    />

                    <input
                        type="password"
                        className="form-control form-control-lg mb-2"
                        placeholder="Password (solo si cambia)"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value),
                                setError("");
                        }}
                    />

                    <select
                        className="form-select form-select-lg mb-3"
                        value={rol}
                        onChange={e => setRol(e.target.value)}
                    >
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-primary px-4" onClick={handleSave}>
                            <i className="bi bi-save me-2"></i>
                            {selectedId ? "Actualizar" : "Guardar"}
                        </button>

                        <button className="btn btn-secondary px-4" onClick={handleNuevo}>
                            <i className="bi bi-plus-circle me-2"></i>
                            Nuevo
                        </button>

                        <button
                            className="btn btn-danger px-4"
                            onClick={handleDelete}
                            disabled={!selectedId}
                        >
                            <i className="bi bi-trash me-2"></i>
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>

            {/* TABLA */}
            <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body">

                    <h5 className="mb-3">
                        <i className="bi bi-table me-2"></i>
                        Listado de Usuarios
                    </h5>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map(u => (
                                    <tr
                                        key={u.id}
                                        onClick={() => selectUsuario(u)}
                                        style={{
                                            cursor: "pointer",
                                            transition: "0.2s",
                                            backgroundColor: selectedId === u.id ? "#e7f1ff" : ""
                                        }}
                                    >
                                        <td>{u.nombre || "-"}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span
                                                className={`badge ${u.rol === "admin"
                                                    ? "bg-primary"
                                                    : "bg-secondary"
                                                    }`}
                                            >
                                                {u.rol}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </div>

    );
}