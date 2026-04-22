import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPerfil, updatePerfil } from "../api/perfilApi";

export default function Perfil() {
    const { user, loginUser } = useContext(AuthContext);

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

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (!user) {
        return <div className="p-4">Cargando...</div>;
    }

    useEffect(() => {
        const loadPerfil = async () => {
            const res = await getPerfil(user!.id);

            if (res.success) {
                setForm({
                    ...res.data,
                    password: ""
                });
            }
        };

        loadPerfil();
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (
            !form.nombres ||
            !form.apellidos ||
            !form.email ||
            !form.telefono ||
            !form.direccion ||
            !form.fecha_nacimiento ||
            !form.genero
        ) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (!form.email.includes("@")) {
            setError("Correo inválido");
            return;
        }

        const res = await updatePerfil(user!.id, form);

        if (res.success) {
            // ACTUALIZAR CONTEXTO
            loginUser({
                ...user,
                email: form.email,
                nombre: form.nombres + " " + form.apellidos
            });

            setSuccess("Perfil actualizado correctamente");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } else {
            setError(res.message);
        }


    };

    return (
        <div className="container p-4">

            <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: "600px", borderRadius: "16px" }}>

                <h4 className="mb-3 text-primary fw-bold">Mi Perfil</h4>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>

                    <input name="nombres" value={form.nombres} onChange={handleChange} className="form-control mb-2" placeholder="Nombres" />

                    <input name="apellidos" value={form.apellidos} onChange={handleChange} className="form-control mb-2" placeholder="Apellidos" />

                    <input name="email" value={form.email} onChange={handleChange} className="form-control mb-2" />

                    <input name="password" type="password" onChange={handleChange} className="form-control mb-2" placeholder="Nueva contraseña (opcional)" />

                    <input name="telefono" value={form.telefono} onChange={handleChange} className="form-control mb-2" placeholder="Teléfono" />

                    <input name="direccion" value={form.direccion} onChange={handleChange} className="form-control mb-2" placeholder="Dirección" />

                    <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} className="form-control mb-2" />

                    <select name="genero" value={form.genero} onChange={handleChange} className="form-select mb-3">
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>

                    <button className="btn btn-primary w-100">
                        Guardar cambios
                    </button>

                </form>
            </div>
        </div>
    );
}