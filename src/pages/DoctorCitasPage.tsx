import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { activarCita, cancelarCita, getCitasDoctor } from "../api/citasApi";
import type { CitaDoctorDTO } from "../models/dto/CitaDoctorDTO";

export default function DoctorCitasPage() {

    const [citas, setCitas] = useState<CitaDoctorDTO[]>([]);
    const [filtro, setFiltro] = useState("todas");
    const navigate = useNavigate();

    const load = async () => {
        const res = await getCitasDoctor();
        if (res.success) setCitas(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    // 🔍 filtro
    const citasFiltradas = citas.filter(c => {
        if (filtro === "todas") return true;
        return c.estado === filtro;
    });

    // 🎨 badge UX PRO
    const getBadge = (estado: string) => {
        switch (estado) {
            case "pendiente": return "badge bg-warning text-dark";
            case "atendido": return "badge bg-success";
            case "anulado": return "badge bg-danger";
            default: return "badge bg-secondary";
        }
    };

    // 🧠 VALIDACIONES
    const puedeCancelar = (c: CitaDoctorDTO) => {
        return c.estado === "pendiente";
    };

    const puedeReactivar = (c: CitaDoctorDTO) => {
        if (c.estado !== "anulado") return false;

        const fechaCita = new Date(`${c.fecha}T${c.hora}`);
        const ahora = new Date();

        // debug (puedes quitar después)
        console.log("Cita:", fechaCita);
        console.log("Ahora:", ahora);

        return fechaCita > ahora;
    };

    // 🔥 ACCIONES
    const handleCancelar = async (c: CitaDoctorDTO) => {
        if (!puedeCancelar(c)) {
            alert("No se puede cancelar esta cita");
            return;
        }

        if (!confirm("¿Cancelar cita?")) return;

        await cancelarCita(c.id);
        load();
    };

    const handleActivar = async (c: CitaDoctorDTO) => {
        if (!puedeReactivar(c)) {
            alert("No se puede reactivar esta cita");
            return;
        }

        await activarCita(c.id);
        load();
    };

    return (
        <div className="container-fluid">

            <h4 className="mb-3">
                <i className="bi bi-calendar-check me-2"></i>
                Citas del Doctor
            </h4>

            {/* FILTRO */}
            <div className="mb-3">
                <select
                    className="form-select w-auto"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >
                    <option value="todas">Todas</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="atendido">Atendidas</option>
                    <option value="anulado">Anuladas</option>
                </select>
            </div>

            {/* TABLA */}
            <div className="card shadow-sm">
                <div className="card-body">

                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                                <th>Atención</th>
                                <th>Gestión</th>
                            </tr>
                        </thead>

                        <tbody>
                            {citasFiltradas.map(c => (
                                <tr key={c.id}>
                                    <td>{c.paciente_nombre}</td>
                                    <td>{c.fecha}</td>
                                    <td>{c.hora}</td>

                                    <td>
                                        <span className={getBadge(c.estado)}>
                                            {c.estado}
                                        </span>
                                    </td>

                                    {/* ATENDER */}
                                    <td>
                                        {c.estado === "pendiente" ? (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    navigate(`/doctor/citas/${c.id}/atender`)
                                                }
                                            >
                                                Atender
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    navigate(`/doctor/citas/${c.id}/atender`)
                                                }
                                            >
                                                Editar
                                            </button>
                                        )}
                                    </td>

                                    {/* GESTIÓN */}
                                    <td className="d-flex gap-2">

                                        <button
                                            className="btn btn-danger btn-sm"
                                            disabled={!puedeCancelar(c)}
                                            title="Solo citas pendientes pueden anularse"
                                            onClick={() => handleCancelar(c)}
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            className="btn btn-success btn-sm"
                                            disabled={!puedeReactivar(c)}
                                            title="Solo citas anuladas y futuras pueden reactivarse"
                                            onClick={() => handleActivar(c)}
                                        >
                                            Reactivar
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {citasFiltradas.length === 0 && (
                        <p className="text-center text-muted">
                            No hay citas
                        </p>
                    )}

                </div>
            </div>

        </div>
    );
}