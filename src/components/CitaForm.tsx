import { useEffect, useState } from "react";
import { crearCita, getDisponibilidad, tieneCitaActiva } from "../api/citasApi";
import { getDoctores } from "../api/usuarioApi";
import type { CrearCitaDTO } from "../models/dto/CitaDTO";

interface Doctor {
    id: number;
    nombre: string;
}

interface Props {
    onSuccess: () => void;
}

export default function CitaForm({ onSuccess }: Props) {
    const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [doctores, setDoctores] = useState<Doctor[]>([]);
    const [error, setError] = useState("");
    const [tieneCita, setTieneCita] = useState(false);

    const [form, setForm] = useState<CrearCitaDTO>({
        doctor_id: 0,
        fecha: "",
        hora: "",
        motivo: ""
    });

    // 🔥 Cargar doctores
    useEffect(() => {
        loadDoctores();
        checkCitaActiva();
    }, []);

    const loadDoctores = async () => {
        const res = await getDoctores();
        if (res.success) setDoctores(res.data);
    };

    // 🔥 Revisar si paciente ya tiene cita activa
    const checkCitaActiva = async () => {
        const res = await tieneCitaActiva();
        if (res.success && res.data.tieneCita) {
            setTieneCita(true);
            setError("Ya tienes una cita activa. No puedes agendar otra.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (tieneCita) return;

        if (!form.doctor_id) {
            setError("Debe seleccionar un doctor");
            return;
        }

        if (!form.fecha || !form.hora) {
            setError("Fecha y hora son requeridas");
            return;
        }

        if (!form.motivo) {
            setError("El motivo de la consulta es obligatorio");
            return;
        }

        setError("");

        const res = await crearCita(form);
        if (res.success) {
            alert("Cita creada correctamente");
            setForm({ doctor_id: 0, fecha: "", hora: "", motivo: "" });
            setHoraSeleccionada("");
            setHorasOcupadas([]);
            onSuccess();
            checkCitaActiva();
        } else {
            setError(res.message || "Error al crear cita");
        }
    };

    // Generar horas de 30 en 30 minutos entre 08:00 y 17:00
    const generarHoras = () => {
        if (!form.doctor_id || !form.fecha) return [];
        const inicio = 8;
        const fin = 17;
        const horas: string[] = [];

        for (let h = inicio; h < fin; h++) {
            horas.push(`${h.toString().padStart(2, "0")}:00`);
            horas.push(`${h.toString().padStart(2, "0")}:30`);
        }

        // Bloquear horas pasadas si fecha es hoy
        const hoy = new Date().toISOString().split("T")[0];
        if (form.fecha === hoy) {
            const ahora = new Date();
            return horas.filter(h => {
                const [hor, min] = h.split(":").map(Number);
                return hor > ahora.getHours() || (hor === ahora.getHours() && min > ahora.getMinutes());
            });
        }

        return horas;
    };

    // 🔥 Cargar disponibilidad cuando cambian doctor o fecha
    useEffect(() => {
        if (form.doctor_id && form.fecha) {
            setHoraSeleccionada("");
            setForm(prev => ({ ...prev, hora: "" }));
            loadDisponibilidad();
        }
    }, [form.doctor_id, form.fecha]);

    const loadDisponibilidad = async () => {
        const res = await getDisponibilidad(form.doctor_id, form.fecha);
        if (res.success) {
            const ocupadas = res.data.map((h: string) => h.substring(0, 5));
            setHorasOcupadas(ocupadas);
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">

                <h5 className="mb-3">
                    <i className="bi bi-calendar-plus me-2"></i>
                    Agendar Cita
                </h5>

                {error && <div className="alert alert-danger">{error}</div>}

                {tieneCita ? (
                    <p className="text-warning">No puedes agendar otra cita mientras tengas una activa.</p>
                ) : (
                    <form onSubmit={handleSubmit}>

                        {/* DOCTORES */}
                        <select
                            className="form-select mb-2"
                            value={form.doctor_id}
                            onChange={e => setForm({ ...form, doctor_id: Number(e.target.value) })}
                        >
                            <option value={0}>Seleccione un doctor</option>
                            {doctores.map(d => (
                                <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                        </select>

                        {/* FECHA */}
                        <input
                            type="date"
                            className="form-control mb-2"
                            min={new Date().toISOString().split("T")[0]}
                            value={form.fecha}
                            onChange={e => setForm({ ...form, fecha: e.target.value })}
                        />

                        {/* LEYENDA HORAS */}
                        <div className="mb-2">
                            <span className="badge bg-success me-2">Disponible</span>
                            <span className="badge bg-danger me-2">Ocupado</span>
                            <span className="badge bg-primary">Seleccionado</span>
                        </div>

                        {/* HORAS */}
                        <div className="mb-3">
                            <label className="form-label">Seleccionar Hora</label>
                            <div className="d-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                                {generarHoras().map(hora => {
                                    const isOcupada = horasOcupadas.includes(hora);
                                    const isSelected = horaSeleccionada === hora;
                                    return (
                                        <button
                                            key={hora}
                                            type="button"
                                            className={`btn ${isOcupada ? "btn-danger" : isSelected ? "btn-primary" : "btn-outline-success"}`}
                                            disabled={isOcupada}
                                            onClick={() => {
                                                if (!isOcupada) {
                                                    setHoraSeleccionada(hora);
                                                    setForm({ ...form, hora });
                                                }
                                            }}
                                        >
                                            {hora}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* MOTIVO */}
                        <textarea
                            className="form-control mb-3"
                            placeholder="Motivo de la consulta"
                            value={form.motivo}
                            onChange={e => setForm({ ...form, motivo: e.target.value })}
                        />

                        <button className="btn btn-primary w-100">
                            <i className="bi bi-save me-2"></i> Agendar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}