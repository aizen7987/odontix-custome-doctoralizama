import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetalleCita, atenderCita } from "../api/citasApi";
import Odontograma from "../components/Odontograma";

export default function AtenderCitaPage() {

    const { id } = useParams();

    const [paciente, setPaciente] = useState<any>(null);

    const [historia, setHistoria] = useState({
        antecedentes_medicos: "",
        alergias: "",
        medicamentos_actuales: "",
        habitos: ""
    });

    const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
    const [diagnostico, setDiagnostico] = useState("");

    // control flujo
    const [diagnosticoGuardado, setDiagnosticoGuardado] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [diagnosticoId, setDiagnosticoId] = useState<number | null>(null);

    useEffect(() => {
        loadDetalle();
    }, []);

    const loadDetalle = async () => {
        const res = await getDetalleCita(Number(id));

        if (res.success) {
            const data = res.data;

            setPaciente(data.cita);

            setHistoria(data.historia || {
                antecedentes_medicos: "",
                alergias: "",
                medicamentos_actuales: "",
                habitos: ""
            });

            setDiagnosticos(data.diagnosticos || []);

            setDiagnostico(data.diagnostico?.descripcion || "");
            setDiagnosticoId(data.diagnostico?.id || null);
        }
    };

    // GUARDAR DIAGNÓSTICO
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!diagnostico) {
            setError("El diagnóstico es obligatorio");
            return;
        }

        setLoading(true);

        const res = await atenderCita(Number(id), {
            historia,
            diagnostico
        });

        if (res.success) {
            alert("Diagnóstico guardado");

            // clave del flujo
            console.log(res);

            setDiagnosticoGuardado(res.data.diagnostico_id);

        } else {
            setError(res.message || "Error al guardar");
        }

        setLoading(false);
    };

    return (
        <div className="container-fluid">

            <h4 className="mb-3">🩺 Atender Cita</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* 👤 PACIENTE */}
            <div className="card mb-3 shadow-sm">
                <div className="card-body">
                    <h5>{paciente?.paciente_nombre}</h5>
                    <p>
                        {paciente?.fecha} - {paciente?.hora}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>

                {/* 📘 HISTORIA */}
                <div className="card mb-3">
                    <div className="card-body">
                        <h6>Historia Clínica</h6>

                        <textarea
                            className="form-control mb-2"
                            placeholder="Antecedentes médicos"
                            value={historia.antecedentes_medicos}
                            onChange={e =>
                                setHistoria({ ...historia, antecedentes_medicos: e.target.value })
                            }
                        />

                        <textarea
                            className="form-control mb-2"
                            placeholder="Alergias"
                            value={historia.alergias}
                            onChange={e =>
                                setHistoria({ ...historia, alergias: e.target.value })
                            }
                        />

                        <textarea
                            className="form-control mb-2"
                            placeholder="Medicamentos actuales"
                            value={historia.medicamentos_actuales}
                            onChange={e =>
                                setHistoria({ ...historia, medicamentos_actuales: e.target.value })
                            }
                        />

                        <textarea
                            className="form-control"
                            placeholder="Hábitos"
                            value={historia.habitos}
                            onChange={e =>
                                setHistoria({ ...historia, habitos: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* HISTORIAL */}
                <div className="card mb-3">
                    <div className="card-body">
                        <h6>Historial de Diagnósticos</h6>

                        {diagnosticos.length === 0 ? (
                            <p className="text-muted">Sin historial</p>
                        ) : (
                            diagnosticos.map((d, i) => (
                                <div key={i} className="border-bottom mb-2 pb-2">
                                    <strong>{d.fecha}</strong>
                                    <p className="mb-0">{d.descripcion}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ✍️ DIAGNÓSTICO */}
                <div className="card mb-3">
                    <div className="card-body">
                        <h6>Nuevo Diagnóstico</h6>

                        <textarea
                            className="form-control"
                            placeholder="Escribe el diagnóstico..."
                            value={diagnostico}
                            onChange={e => setDiagnostico(e.target.value)}
                        />
                    </div>
                </div>

                {/* BOTÓN DIAGNÓSTICO */}
                <button className="btn btn-primary mb-3" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Diagnóstico"}
                </button>

            </form>

            {/* ODONTOGRAMA BLOQUEADO */}
            <div className="card mb-3">
                <div className="card-body">
                    <h6>Odontograma</h6>
                    <Odontograma
                        paciente_id={paciente?.paciente_id || paciente?.id}
                        diagnosticoId={diagnosticoGuardado ?? undefined}
                    />
                </div>
            </div>

        </div>
    );
}